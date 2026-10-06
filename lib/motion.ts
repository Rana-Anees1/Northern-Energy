import type { Variants } from "framer-motion";

/** Buttery ease-out curve used site-wide. */
export const smoothEase = [0.16, 1, 0.3, 1] as const;

export const motionDuration = {
  reveal: 0.85,
  text: 0.65,
  quick: 0.45,
} as const;

/** Shared scroll-reveal variants. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: motionDuration.reveal, ease: smoothEase },
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -52 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: motionDuration.reveal, ease: smoothEase },
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 52 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: motionDuration.reveal, ease: smoothEase },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: motionDuration.reveal, ease: smoothEase },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 16 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: motionDuration.reveal, ease: smoothEase },
  },
};

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.06 } },
};

export type RevealDirection = "up" | "left" | "right" | "scale" | "fade";

export const revealVariants: Record<RevealDirection, Variants> = {
  up: fadeUp,
  left: fadeLeft,
  right: fadeRight,
  scale: scaleIn,
  fade: fadeIn,
};

/** Reveal once, slightly before the element enters the viewport. */
export const viewportOnce = {
  once: true,
  margin: "-10% 0px -6% 0px",
  amount: 0.25,
} as const;
