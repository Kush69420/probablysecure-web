# probablysecure.tech

Landing page and live homelab monitor for a self-hosted NAS, published through a
Cloudflare named tunnel. React 19 + Vite + TypeScript + Tailwind, styled to match
[the portfolio](https://github.com/Kush69420/Portfolio).

## How a change reaches production

```
git push origin main
        │
        ├─ GitHub Actions builds the image and pushes ghcr.io/kush69420/probablysecure-web:latest
        │
        └─ NAS: psw-update.timer polls GHCR every 3 minutes, and when the digest
           changes it runs `docker compose up -d` to roll the container
```

The NAS has no public IP and no port forward, so a webhook cannot reach it.
Deployment is pull-based by necessity. Expect a change to be live **within about
4 minutes** of the Actions run finishing.

## Local development

```bash
npm install
npm run dev
```

The monitor reads `/api/status.json`. In dev that path 404s and the UI shows its
"telemetry unreachable" state, which is the correct fallback. To work against
real data, proxy it in `vite.config.ts` or drop a sample at `public/api/status.json`.

## Telemetry

`deploy/homelab-status.py` runs on the NAS under `homelab-status.timer` every 20s
and writes `status.json` atomically into the host directory that the container
mounts read-only at `/usr/share/nginx/html/api`.

It deliberately publishes **no internal IPs, hostnames or share paths** — the file
is served to the open internet. Keep it that way when adding metrics.

## Server layout

| Path | Purpose |
|---|---|
| `/etc/probablysecure-web/docker-compose.yml` | container definition |
| `/usr/local/bin/psw-update.sh` | pull-and-roll script |
| `/usr/local/bin/homelab-status.py` | telemetry collector |
| `…/blue/appdata/probablysecure-web/api/` | generated `status.json` |

Ingress hostnames are defined in `/etc/cloudflared/config.yml`. Editing that file
requires `systemctl restart cloudflared`, which briefly drops every hostname on
the tunnel, not just this one.
