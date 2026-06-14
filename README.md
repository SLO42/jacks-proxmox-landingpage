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

If you already have an LXC/VM with Docker, just run `docker compose up -d --build`
from the repo. Starting from a fresh Proxmox LXC, here's the full path.

> [!IMPORTANT]
> Docker needs **nesting** enabled in the LXC or the daemon won't start.
> Run this on the **Proxmox host** for your container (CT `200` here):
> ```bash
> pct set 200 --features nesting=1,keyctl=1
> pct reboot 200
> ```
> (Don't have the container yet? See *"One-line LXC creation"* below first.)

**1. Enter the container** (from the Proxmox host):
```bash
pct enter 200
```

**2. Install Docker** (inside the container):
```bash
apt update && apt install -y git ca-certificates curl
curl -fsSL https://get.docker.com | sh      # official Docker install script
systemctl enable --now docker
docker --version                            # sanity check
```

**3. Clone the repo and start the app:**
```bash
git clone https://github.com/SLO42/jacks-proxmox-landingpage.git
cd jacks-proxmox-landingpage
docker compose up -d --build
```
The `claude/modern-landing-page-uuu21z` branch is the repo default, so a plain
clone checks out the site automatically — no `git checkout` needed. (If the repo
is private, clone with a Personal Access Token or deploy key.)

**4. Verify and open it:**
```bash
hostname -I                       # the container's IP
docker compose ps                 # STATUS should read "healthy"
curl -s localhost:8080/healthz    # -> ok
```
The site is served on **`http://<container-ip>:8080`** — map a different host
port by editing `ports:` in `docker-compose.yml`. A `/healthz` endpoint and a
container `HEALTHCHECK` are included for monitoring.

**Updating after code or config changes:**

> [!IMPORTANT]
> The site is **compiled into the image at build time** (multi-stage build →
> static files baked into nginx). That means **restarting does nothing** —
> `docker compose restart`, `docker restart`, and `systemctl restart docker`
> all relaunch the *old* image. To see any edit (service links in
> `src/`, `docker-compose.yml`, etc.) you must **rebuild the image**.

Run this from inside the cloned repo, **on the same machine that's running the
container** (i.e. inside the LXC, not your laptop — unless that's where the
container lives):

```bash
git pull                              # only if you pushed changes elsewhere
docker compose up -d --build          # rebuild image + recreate container
```

`--build` is what does the work; `up` then swaps the running container for the
freshly built one. Confirm the new build is live:

```bash
docker compose ps                     # STATUS "healthy"
docker compose images                 # CREATED should be just now
```

If you *still* see the old site:

```bash
# 1. Force a clean rebuild that ignores Docker's layer cache:
docker compose build --no-cache && docker compose up -d --force-recreate

# 2. Bypass your browser cache with a hard refresh (Ctrl/Cmd + Shift + R),
#    or test from the container itself to rule the browser out:
curl -s localhost:8080 | grep -o '<title>[^<]*</title>'
```

> **Editing in the right place:** `docker compose` builds from the files in the
> current directory. If you edited files on your workstation but build inside
> the LXC, the container won't see them until you `git push` from the
> workstation and `git pull` in the container (or copy the files over).

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

**First, download an LXC template** — Proxmox won't fetch it automatically, and
`pct create` fails with `volume '...' does not exist` if the template is
missing:

```bash
pveam update                            # refresh the catalog
pveam available --section system        # list exact names
```

> [!IMPORTANT]
> Template names include a **version**. The catalog lists e.g.
> `debian-12-standard_12.12-1_amd64.tar.zst`, *not*
> `debian-12-standard_amd64.tar.zst`. Copy the full name verbatim — the short
> form is "no such template".

```bash
# use the exact name from the list above (versions change over time):
pveam download local debian-12-standard_12.12-1_amd64.tar.zst
```

Then create the container, referencing that **same** versioned filename. Note
the **`--rootfs`** flag: the default `local` storage only holds templates, ISOs
and backups — it does *not* support container root volumes, so point the rootfs
at storage that does (commonly `local-lvm`, or your ZFS/Ceph pool):

```bash
pct create 200 local:vztmpl/debian-12-standard_12.12-1_amd64.tar.zst \
  --hostname homelab-landing --cores 1 --memory 512 \
  --rootfs local-lvm:8 \
  --net0 name=eth0,bridge=vmbr0,ip=dhcp --unprivileged 1 --start 1
```

The template comes from `local` (which supports `vztmpl`); only the rootfs needs
container-capable storage. Check what's available with
`pvesm status -content rootdir`. Then follow Option A or B inside it.

> **Tip:** the GUI does this without exact typing — `local (pve)` →
> **CT Templates** → **Templates**, pick from the list, download.

## License

MIT — do whatever you like with it.
