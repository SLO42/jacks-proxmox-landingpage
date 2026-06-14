import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  animate as animateValue,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { EASE_OUT, viewportOnce } from "../lib/motion";

/**
 * Section — a semantic <section> that fades + rises into view once.
 * Children that use `riseItem` variants will stagger inside it.
 */
export function Reveal({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.08, delayChildren: 0.05 },
        },
      }}
    >
      {children}
    </motion.section>
  );
}

/**
 * AnimatedCounter — counts up from 0 to `value` the first time it scrolls
 * into view. Uses a motion value + rAF (no re-render per frame) and falls
 * back to the final number instantly under prefers-reduced-motion.
 */
export function AnimatedCounter({
  value,
  decimals = 0,
  suffix = "",
  prefix = "",
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value.toFixed(decimals));
      return;
    }
    const controls = animateValue(mv, value, {
      duration: 1.6,
      ease: EASE_OUT,
      onUpdate: (latest) => setDisplay(latest.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, value, decimals, reduce, mv]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/** A small reusable "online" status pulse. */
export function StatusDot({ label = "online" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-medium text-emerald-300/90">
      <span className="status-dot inline-block h-2 w-2 rounded-full bg-emerald-400" />
      {label}
    </span>
  );
}
