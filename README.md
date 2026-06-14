# Jack's Homelab — Landing Page

A modern, animated landing page for a Proxmox-powered homelab. Built with
**React + Vite + TypeScript + Tailwind CSS v4 + Framer Motion**, designed to be
hosted in a Proxmox container (LXC or VM) behind nginx.

![Stack](https://img.shields.io/badge/Vite-6-646CFF) ![React](https://img.shields.io/badge/React-18-61DAFB) ![Tailwind](https://img.shields.io/badge/Tailwind-4-38BDF8) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-FF0050)

## Design notes

The visual language was generated with two design skills and then hand-tuned:

- **Style** — OLED-dark + glassmorphism (frosted surfaces, `backdrop-blur`,
  translucent 1px borders). Deep `#07070b` base, never pure black.
- **Colour** — Proxmox **ember/orange** (`#E57000`) as the single brand / CTA
  colour; **emerald green** reserved purely as the semantic *"service online"*
  status colour.
- **Type** — Inter, with a clear weight hierarchy and tabular figures for stats.
- **Motion** — Framer Motion throughout: hero stagger entrance, scroll-reveal
  sections, animated stat counters, hover/tap springs, and an
  `AnimatePresence` mobile menu. All of it honours
  `prefers-reduced-motion` via `<MotionConfig reducedMotion="user">` and a CSS
  fallback.
- **Structure** — the "Feature-Rich Showcase" pattern: Hero → Capabilities →
  Services → Stack → CTA → Footer.

## Customise

Most content lives at the top of each component in `src/components/`:

| What | Where |
| --- | --- |
| Cluster stats (nodes, RAM, uptime) | `Hero.tsx` → `STATS` |
| Hypervisor capabilities | `Capabilities.tsx` → `CAPS` |
| Self-hosted services + links | `Services.tsx` → `SERVICES` |
| Hardware specs / tech badges | `Stack.tsx` → `SPECS`, `STACK` |
| Dashboard URL | search for `proxmox.local:8006` |

Service links default to `*.local` hostnames — point them at your own reverse
proxy entries.

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs static site to dist/
npm run preview  # serve the production build locally
```

## Deploy to a Proxmox container

### Option A — Docker (recommended)

Run inside any LXC/VM that has Docker installed:

```bash
docker compose up -d --build
```

The site is then served on **`http://<container-ip>:8080`**
(map a different host port by editing `docker-compose.yml`). A `/healthz`
endpoint and container `HEALTHCHECK` are included for monitoring.

### Option B — Plain nginx in an LXC container

1. Create an LXC container in Proxmox (Debian/Ubuntu template) and install
   nginx:
   ```bash
   apt update && apt install -y nginx
   ```
2. Build the static site (on your workstation or in a CI job) and copy it over:
   ```bash
   npm ci && npm run build
   scp -r dist/* root@<container-ip>:/var/www/html/
   ```
3. Drop `nginx.conf` in as the site config (adjust `root` to `/var/www/html`)
   and reload:
   ```bash
   systemctl reload nginx
   ```

### Tip: one-line LXC creation

On the Proxmox host, the `pct` tooling makes a Debian container in seconds.
Note the **`--rootfs`** flag: the default `local` storage only holds templates,
ISOs and backups — it does *not* support container root volumes, so point the
rootfs at storage that does (commonly `local-lvm`, or your ZFS/Ceph pool):

```bash
pct create 200 local:vztmpl/debian-12-standard_amd64.tar.zst \
  --hostname homelab-landing --cores 1 --memory 512 \
  --rootfs local-lvm:8 \
  --net0 name=eth0,bridge=vmbr0,ip=dhcp --unprivileged 1 --start 1
```

The template still comes from `local` (which supports `vztmpl`); only the
rootfs needs container-capable storage. Check what's available on your host
with `pvesm status -content rootdir`. Then follow Option A or B inside it.

## License

MIT — do whatever you like with it.
