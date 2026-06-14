import { motion } from "framer-motion";
import {
  Cpu,
  Container,
  HardDrive,
  ShieldCheck,
  Network,
  GitBranch,
} from "lucide-react";
import { riseItem } from "../lib/motion";
import { Reveal } from "./primitives";

const CAPS = [
  {
    icon: Cpu,
    title: "KVM virtual machines",
    body: "Full hardware-virtualized guests with PCIe passthrough — from a Windows box to a GPU-accelerated AI node.",
  },
  {
    icon: Container,
    title: "LXC containers",
    body: "Lightweight system containers that boot in milliseconds and sip resources, perfect for single-purpose services.",
  },
  {
    icon: HardDrive,
    title: "ZFS storage",
    body: "Copy-on-write pools with snapshots, compression and bit-rot protection across a mirrored NVMe + spinning-rust tier.",
  },
  {
    icon: ShieldCheck,
    title: "Automated backups",
    body: "Scheduled, deduplicated backups to Proxmox Backup Server — every VM and container, restorable in a click.",
  },
  {
    icon: Network,
    title: "VLAN networking",
    body: "Segmented bridges and firewall rules keep IoT, lab and trusted devices apart on the same physical wire.",
  },
  {
    icon: GitBranch,
    title: "Snapshots & rollback",
    body: "Break something at 2am? Roll a guest back to a known-good state before the coffee even finishes brewing.",
  },
];

export default function Capabilities() {
  return (
    <Reveal
      id="capabilities"
      className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-6"
    >
      <motion.div variants={riseItem} className="max-w-2xl">
        <span className="text-sm font-semibold uppercase tracking-wider text-ember-soft">
          Capabilities
        </span>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          One hypervisor, every workload
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-white/55">
          Proxmox VE unifies virtual machines and containers under a single pane
          of glass. Here&apos;s what keeps the lab running.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CAPS.map((cap) => (
          <motion.article
            key={cap.title}
            variants={riseItem}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition-colors hover:border-ember/40 hover:bg-white/[0.05]"
          >
            {/* hover glow */}
            <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-ember/0 blur-2xl transition-colors duration-500 group-hover:bg-ember/20" />
            <div className="relative">
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/0 text-ember-soft">
                <cap.icon className="h-5 w-5" strokeWidth={2} />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-white">
                {cap.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-white/55">
                {cap.body}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </Reveal>
  );
}
