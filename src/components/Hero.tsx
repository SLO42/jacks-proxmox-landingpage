import { motion } from "framer-motion";
import { ArrowUpRight, Boxes, Terminal } from "lucide-react";
import { EASE_OUT } from "../lib/motion";
import { AnimatedCounter, StatusDot } from "./primitives";

const heroContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE_OUT } },
};

const STATS = [
  { label: "Nodes", value: 3, suffix: "" },
  { label: "vCPU cores", value: 48, suffix: "" },
  { label: "Memory", value: 256, suffix: " GB" },
  { label: "Uptime", value: 99.98, suffix: "%", decimals: 2 },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-dvh max-w-6xl flex-col justify-center px-5 pb-16 pt-32 sm:px-6 sm:pt-36"
    >
      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-start"
      >
        {/* Eyebrow badge */}
        <motion.div
          variants={heroItem}
          className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-2 pr-4 text-sm backdrop-blur-md"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-ember/15 px-2.5 py-0.5 text-xs font-semibold text-ember-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-ember-soft" />
            Proxmox VE
          </span>
          <span className="text-white/55">Bare-metal private cloud</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={heroItem}
          className="max-w-3xl text-balance text-5xl font-bold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          Self-hosted.
          <br />
          <span className="bg-gradient-to-r from-ember-soft via-ember to-[#ff7a45] bg-clip-text text-transparent">
            Self-reliant.
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          variants={heroItem}
          className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-white/60"
        >
          A home data center running on Proxmox — virtual machines, LXC
          containers, ZFS storage and a wall of self-hosted services, all
          humming along on hardware I actually own.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={heroItem}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <motion.a
            href="#services"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            className="inline-flex items-center gap-2 rounded-xl bg-ember px-6 py-3.5 font-semibold text-white shadow-[0_8px_26px_rgba(229,112,0,0.4)] transition-colors hover:bg-ember-soft"
          >
            <Boxes className="h-5 w-5" strokeWidth={2.2} />
            Explore the services
          </motion.a>
          <motion.a
            href="https://proxmox.local:8006"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-6 py-3.5 font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/[0.08]"
          >
            <Terminal className="h-5 w-5" strokeWidth={2.2} />
            Open Proxmox
            <ArrowUpRight className="h-4 w-4 text-white/60" strokeWidth={2.4} />
          </motion.a>
        </motion.div>

        {/* Live stat bar — glassmorphic */}
        <motion.div
          variants={heroItem}
          className="mt-14 w-full rounded-2xl border border-white/10 bg-white/[0.035] p-1 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between gap-2 px-4 py-2.5">
            <span className="text-xs font-medium uppercase tracking-wider text-white/40">
              Cluster status
            </span>
            <StatusDot label="all systems operational" />
          </div>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/5 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="bg-[#0b0b12] px-5 py-5">
                <dd className="text-3xl font-bold tracking-tight text-white">
                  <AnimatedCounter
                    value={s.value}
                    suffix={s.suffix}
                    decimals={s.decimals ?? 0}
                  />
                </dd>
                <dt className="mt-1 text-sm text-white/45">{s.label}</dt>
              </div>
            ))}
          </dl>
        </motion.div>
      </motion.div>
    </section>
  );
}
