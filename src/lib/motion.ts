import type { Variants } from "framer-motion";

/**
 * Shared motion tokens — a single rhythm for the whole page.
 * Easing is expo-out [0.16, 1, 0.3, 1] per the design-system "Modern Dark"
 * recommendation; durations stay in the 150–400ms band.
 */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** Container that staggers its children into view. */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

/** Item that rises and fades in — pairs with `staggerContainer`. */
export const riseItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT },
  },
};

/** Standard "reveal on scroll" viewport config. */
export const viewportOnce = { once: true, amount: 0.3 } as const;

/** Subtle press + lift used on cards and buttons. */
export const pressable = {
  whileHover: { y: -4 },
  whileTap: { scale: 0.97 },
  transition: { type: "spring" as const, stiffness: 320, damping: 24 },
};
