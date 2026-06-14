/**
 * Ambient page backdrop: a subtle grid plus two slow-drifting glow blobs.
 * Pure CSS animation (gated by prefers-reduced-motion in index.css) so it
 * costs nothing on the main thread and never blocks interaction.
 */
export default function Background() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Base wash */}
      <div className="absolute inset-0 bg-[#07070b]" />

      {/* Faint technical grid */}
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      {/* Ember glow — brand */}
      <div className="animate-float-slow absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(229,112,0,0.22),transparent_60%)] blur-3xl" />

      {/* Cool counter-glow for depth */}
      <div className="animate-float-slow absolute top-1/3 -right-32 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(56,80,140,0.18),transparent_60%)] blur-3xl [animation-delay:-7s]" />

      {/* Vignette toward the footer */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#07070b] to-transparent" />
    </div>
  );
}
