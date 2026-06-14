import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Home,
  Clapperboard,
  Cloud,
  ShieldHalf,
  LineChart,
  GitMerge,
  KeyRound,
  ArrowUpRight,
} from "lucide-react";
import { riseItem } from "../lib/motion";
import { Reveal } from "./primitives";

type Service = {
  icon: typeof Home;
  name: string;
  desc: string;
  href: string;
  tag: string;
  online: boolean;
};

const SERVICES: Service[] = [
  {
    icon: LayoutDashboard,
    name: "Portainer",
    desc: "Container management UI",
    href: "https://portainer.local",
    tag: "Ops",
    online: true,
  },
  {
    icon: Home,
    name: "Home Assistant",
    desc: "Whole-home automation",
    href: "https://hass.local",
    tag: "Smart home",
    online: true,
  },
  {
    icon: Clapperboard,
    name: "Jellyfin",
    desc: "Movies & TV, no subscriptions",
    href: "https://jellyfin.local",
    tag: "Media",
    online: true,
  },
  {
    icon: Cloud,
    name: "Nextcloud",
    desc: "Private files, calendar & photos",
    href: "https://cloud.local",
    tag: "Productivity",
    online: true,
  },
  {
    icon: ShieldHalf,
    name: "Pi-hole",
    desc: "Network-wide ad blocking",
    href: "https://pihole.local/admin",
    tag: "Network",
    online: true,
  },
  {
    icon: LineChart,
    name: "Grafana",
    desc: "Metrics & dashboards",
    href: "https://grafana.local",
    tag: "Monitoring",
    online: true,
  },
  {
    icon: GitMerge,
    name: "Gitea",
    desc: "Self-hosted git remotes",
    href: "https://git.local",
    tag: "Dev",
    online: true,
  },
  {
    icon: KeyRound,
    name: "Vaultwarden",
    desc: "Password vault",
    href: "https://vault.local",
    tag: "Security",
    online: false,
  },
];

export default function Services() {
  return (
    <Reveal
      id="services"
      className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-6"
    >
      <motion.div
        variants={riseItem}
        className="flex flex-wrap items-end justify-between gap-4"
      >
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-wider text-ember-soft">
            Services
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            The apps running right now
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/55">
            Every tile is a live service in its own container. Click through to
            jump straight in.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-sm text-white/60 backdrop-blur-md">
          <span className="status-dot inline-block h-2 w-2 rounded-full bg-emerald-400" />
          7 of 8 online
        </span>
      </motion.div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((s) => (
          <motion.a
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            variants={riseItem}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md transition-colors hover:border-white/20 hover:bg-white/[0.06]"
          >
            <div className="flex items-start justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-white transition-colors group-hover:text-ember-soft">
                <s.icon className="h-5 w-5" strokeWidth={2} />
              </span>
              <ArrowUpRight className="h-5 w-5 -translate-y-0.5 text-white/25 transition-all duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0 group-hover:text-white/70" />
            </div>

            <h3 className="mt-4 font-semibold text-white">{s.name}</h3>
            <p className="mt-1 text-sm text-white/50">{s.desc}</p>

            <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
              <span className="text-xs font-medium uppercase tracking-wide text-white/35">
                {s.tag}
              </span>
              {s.online ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-300/90">
                  <span className="status-dot inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  online
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-300/80">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400" />
                  maintenance
                </span>
              )}
            </div>
          </motion.a>
        ))}
      </div>
    </Reveal>
  );
}
