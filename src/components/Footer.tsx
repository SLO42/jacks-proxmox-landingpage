import { Server, Github, Rss } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-5 pb-10 pt-8 sm:px-6">
      <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-ember to-[#b35600]">
            <Server className="h-3.5 w-3.5 text-white" strokeWidth={2.2} />
          </span>
          <span className="text-sm text-white/55">
            Jack&apos;s Homelab — powered by Proxmox VE
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://git.local"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Git server"
            className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-white/60 transition-colors hover:text-white"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="/feed.xml"
            aria-label="Status feed"
            className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-white/60 transition-colors hover:text-white"
          >
            <Rss className="h-4 w-4" />
          </a>
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-white/30 sm:text-left">
        © {new Date().getFullYear()} Jack&apos;s Homelab · Self-hosted with care
        on bare metal · No clouds were rented in the making of this site.
      </p>
    </footer>
  );
}
