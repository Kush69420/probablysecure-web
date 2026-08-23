#!/usr/bin/env python3
"""Collect homelab metrics into a JSON file for the public status page.

Runs on a systemd timer. Deliberately publishes no internal addresses,
hostnames or share names -- this file is served to the open internet.
"""
import json, os, re, shutil, subprocess, tempfile, time

OUT = "/srv/dev-disk-by-uuid-4ffa1336-6f12-4ff5-9c34-4838e4d865c3/blue/appdata/probablysecure-web/api/status.json"
STATE = "/run/homelab-status.state"
MEDIA = "/srv/dev-disk-by-uuid-4ffa1336-6f12-4ff5-9c34-4838e4d865c3/blue"
NIC = "enp2s0"


def sh(cmd, timeout=8):
    try:
        return subprocess.run(cmd, shell=True, capture_output=True, text=True,
                              timeout=timeout).stdout.strip()
    except Exception:
        return ""


def cpu_sample():
    with open("/proc/stat") as f:
        p = f.readline().split()[1:]
    v = [int(x) for x in p]
    return sum(v), v[3] + v[4]  # total, idle+iowait


def cpu_percent():
    t1, i1 = cpu_sample()
    time.sleep(0.5)
    t2, i2 = cpu_sample()
    dt, di = t2 - t1, i2 - i1
    return round(100 * (1 - di / dt), 1) if dt > 0 else 0.0


def meminfo():
    m = {}
    with open("/proc/meminfo") as f:
        for line in f:
            k, _, v = line.partition(":")
            m[k] = int(v.split()[0]) * 1024
    total = m.get("MemTotal", 0)
    avail = m.get("MemAvailable", 0)
    return total, total - avail


def net_rate():
    """Bytes/sec since the previous run, via a state file in tmpfs."""
    now = time.time()
    rx = tx = 0
    try:
        with open("/proc/net/dev") as f:
            for line in f:
                if line.strip().startswith(NIC + ":"):
                    parts = line.split(":")[1].split()
                    rx, tx = int(parts[0]), int(parts[8])
    except Exception:
        pass
    prev = {}
    if os.path.exists(STATE):
        try:
            prev = json.load(open(STATE))
        except Exception:
            prev = {}
    rate_rx = rate_tx = 0.0
    if prev:
        dt = now - prev.get("t", now)
        if dt > 0.5:
            rate_rx = max(0, (rx - prev.get("rx", rx)) / dt)
            rate_tx = max(0, (tx - prev.get("tx", tx)) / dt)
    try:
        json.dump({"t": now, "rx": rx, "tx": tx}, open(STATE, "w"))
    except Exception:
        pass
    return round(rate_rx), round(rate_tx), rx, tx


def http_ok(url):
    code = sh(f"curl -s -o /dev/null -m 4 -w '%{{http_code}}' {url}")
    return code.isdigit() and int(code) < 500 and code != "000"


def container(name):
    st = sh(f"docker inspect -f '{{{{.State.Status}}}}|{{{{.State.StartedAt}}}}' {name}")
    if "|" not in st:
        return {"state": "absent", "since": None}
    state, started = st.split("|", 1)
    return {"state": state, "since": started}


def temp_c():
    for z in sorted(os.listdir("/sys/class/thermal")) if os.path.isdir("/sys/class/thermal") else []:
        p = f"/sys/class/thermal/{z}/temp"
        if os.path.exists(p):
            try:
                t = int(open(p).read().strip()) / 1000.0
                if 10 < t < 120:
                    return round(t, 1)
            except Exception:
                pass
    return None


def main():
    total_mem, used_mem = meminfo()
    du = shutil.disk_usage(MEDIA)
    rx_rate, tx_rate, rx_tot, tx_tot = net_rate()
    load = open("/proc/loadavg").read().split()[:3]
    uptime = float(open("/proc/uptime").read().split()[0])

    services = [
        {"key": "navidrome", "name": "Navidrome", "role": "Music streaming",
         "url": "https://music.probablysecure.tech",
         "up": http_ok("http://127.0.0.1:4533/ping"), **container("navidrome")},
        {"key": "jellyfin", "name": "Jellyfin", "role": "Media server",
         "url": "https://media.probablysecure.tech",
         "up": http_ok("http://127.0.0.1:8096/health"), **container("jellyfin")},
    ]

    tunnel_active = sh("systemctl is-active cloudflared") == "active"
    conns = sh("journalctl -u cloudflared --since '-24h' -o cat 2>/dev/null "
               "| grep -c 'Registered tunnel connection'")

    data = {
        "generated": int(time.time()),
        "uptime_seconds": int(uptime),
        "kernel": sh("uname -r"),
        "os": re.sub(r'^PRETTY_NAME="|"$', "", sh("grep PRETTY_NAME /etc/os-release")).replace("PRETTY_NAME=", "").strip('"'),
        "cpu": {"percent": cpu_percent(), "cores": os.cpu_count(),
                "model": sh("grep -m1 'model name' /proc/cpuinfo | cut -d: -f2").strip(),
                "load": load, "temp_c": temp_c()},
        "memory": {"used": used_mem, "total": total_mem,
                   "percent": round(100 * used_mem / total_mem, 1) if total_mem else 0},
        "storage": {"used": du.used, "total": du.total, "free": du.free,
                    "percent": round(100 * du.used / du.total, 1) if du.total else 0},
        "network": {"rx_bps": rx_rate, "tx_bps": tx_rate,
                    "rx_total": rx_tot, "tx_total": tx_tot, "link": "100 Mb/s"},
        "tunnel": {"active": tunnel_active, "edge_connections": 4 if tunnel_active else 0,
                   "registrations_24h": int(conns) if conns.isdigit() else 0},
        "services": services,
    }

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    fd, tmp = tempfile.mkstemp(dir=os.path.dirname(OUT))
    with os.fdopen(fd, "w") as f:
        json.dump(data, f, separators=(",", ":"))
    os.chmod(tmp, 0o644)
    os.replace(tmp, OUT)


if __name__ == "__main__":
    main()
