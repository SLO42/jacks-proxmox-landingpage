import { motion } from "framer-motion";
import { riseItem } from "../lib/motion";
import { Reveal } from "./primitives";

const STACK = [
  "Proxmox VE",
  "Debian",
  "ZFS",
  "Docker",
  "Traefik",
  "WireGuard",
  "Prometheus",
  "Ansible",
];

const SPECS = [
  { k: "CPU", v: "Ryzen 9 · 16C / 32T" },
  { k: "Memory", v: "256 GB ECC DDR4" },
  { k: "Storage", v: "8 TB NVMe + 48 TB ZFS" },
  { k: "Network", v: "10 GbE backbone" },
];

export default function Stack() {
  return (
    <Reveal
      id="stack"
      className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-6"
    >
      <motion.div variants={riseItem} className="text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-ember-soft">
          The stack
        </span>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Built on tools that earn their keep
        </h2>
      </motion.div>

      <motion.div
        variants={riseItem}
        className="mt-10 flex flex-wrap justify-center gap-3"
      >
        {STACK.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-white/70 backdrop-blur-md"
          >
            {tech}
          </span>
        ))}
      </motion.div>

      <motion.dl
        variants={riseItem}
        className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {SPECS.map((s) => (
          <div key={s.k} className="bg-[#0b0b12] px-6 py-6">
            <dt className="text-xs font-medium uppercase tracking-wider text-white/40">
              {s.k}
            </dt>
            <dd className="mt-2 font-mono text-[15px] text-white/85">{s.v}</dd>
          </div>
        ))}
      </motion.dl>
    </Reveal>
  );
}
