# probablysecure.tech

Portfolio and public homelab showcase for Kush Agrawal, published through a
Cloudflare named tunnel. React 19 + Vite + TypeScript + Tailwind, retaining the
existing terminal-inspired visual style.

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

## Public routes

| Route | Content |
|---|---|
| `/` | Portfolio: education, research experience, projects, technical skills, and contact |
| `/homelab` | Infrastructure overview, recovery automation, operational lessons, and live telemetry |
| `/resume` | Original updated resume, served directly as `application/pdf` with inline disposition |

`public/resume.pdf` is an unchanged copy of the supplied `Resume(SRE).pdf`.
To update the resume later, replace that asset and update the related portfolio
copy. Vite development/preview middleware and the production Nginx configuration
both support `/resume`; keep those routes in sync.

The three existing projects remain, with their descriptions updated to match the
resume; SENTINEL is added alongside them. The homelab page links to the original
Navidrome, Jellyfin, and File Manager endpoints; authentication remains enforced
by those services. Internal addresses, credentials, and share paths are not
published. Only that page polls `/api/status.json`; local telemetry is unavailable
unless a collector or sample is configured.

Technical skills use an infinitely looping horizontal carousel: one centered
category with previews of its neighbors, native touch/trackpad scrolling, and
keyboard Left/Right/Home/End navigation when focused. Ruled skill rows replace
pill badges; spring-based depth/tilt and a short row stagger emphasize the centered
category. Reduced-motion preferences disable spatial motion and smooth scrolling,
including when the preference changes while the page is open. Duplicate loop
slides are hidden from screen readers. No autoplay, arrow buttons, or visible
slide counters.

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
