import { motion } from "framer-motion";
import { ArrowUpRight, Terminal } from "lucide-react";
import { riseItem } from "../lib/motion";
import { Reveal } from "./primitives";

export default function CTA() {
  return (
    <Reveal className="mx-auto max-w-6xl px-5 py-16 sm:px-6">
      <motion.div
        variants={riseItem}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] px-6 py-14 text-center backdrop-blur-xl sm:px-12"
      >
        {/* ember glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[40rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(229,112,0,0.3),transparent_60%)] blur-3xl" />

        <div className="relative">
          <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Curious how it all fits together?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-white/60">
            Jump into the Proxmox dashboard for the full picture, or browse the
            running services above. The lab&apos;s door is always open.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <motion.a
              href="https://proxmox.local:8006"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              className="inline-flex items-center gap-2 rounded-xl bg-ember px-6 py-3.5 font-semibold text-white shadow-[0_8px_26px_rgba(229,112,0,0.4)] transition-colors hover:bg-ember-soft"
            >
              <Terminal className="h-5 w-5" strokeWidth={2.2} />
              Open the dashboard
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} />
            </motion.a>
            <motion.a
              href="#services"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-6 py-3.5 font-semibold text-white transition-colors hover:bg-white/[0.08]"
            >
              Browse services
            </motion.a>
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
}
