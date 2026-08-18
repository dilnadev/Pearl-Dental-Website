import type { Variants } from 'motion/react';

/** Standard viewport trigger: animate once, slightly before fully in view. */
export const viewportOnce = { once: true, margin: '-80px' } as const;

const easeOut = [0.16, 1, 0.3, 1] as const;

/** Fade + subtle upward move. Use as a child of `staggerContainer`, or standalone with whileInView. */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

/** Fade only, no movement — for elements where a shift would feel odd (e.g. background art). */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: easeOut },
  },
};

/** Wrap a group of `fadeInUp` children in this to stagger their entrance ~120ms apart. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};
