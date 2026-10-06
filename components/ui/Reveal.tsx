"use client";

import { Children, isValidElement } from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  revealVariants,
  viewportOnce,
  type RevealDirection,
} from "@/lib/motion";

/**
 * Scroll-reveal wrapper. Fades into view once with a smooth ease.
 * Respects prefers-reduced-motion by rendering content statically.
 */
export function Reveal({
  children,
  className,
  variants,
  direction = "up",
  delay = 0,
  as = "div",
  mode = "inView",
}: {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  direction?: RevealDirection;
  delay?: number;
  as?: "div" | "li" | "section" | "article";
  /** Use `inherit` when nested inside <RevealGroup>. */
  mode?: "inView" | "inherit";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];
  const resolvedVariants = variants ?? revealVariants[direction];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  if (mode === "inherit") {
    return (
      <MotionTag className={className} variants={resolvedVariants}>
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={className}
      variants={resolvedVariants}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

/** Staggers direct child <Reveal mode="inherit"> blocks. */
export function RevealGroup({
  children,
  className,
  staggerDelay = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: staggerDelay, delayChildren: 0.04 },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Applies scroll reveal to each direct child with a gentle stagger. */
export function AnimatedStack({
  children,
  className,
  staggerDelay = 0.08,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  direction?: RevealDirection;
}) {
  const reduce = useReducedMotion();
  const items = Children.toArray(children).filter(isValidElement);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <RevealGroup className={className} staggerDelay={staggerDelay}>
      {items.map((child, i) => (
        <Reveal key={child.key ?? i} mode="inherit" direction={direction}>
          {child}
        </Reveal>
      ))}
    </RevealGroup>
  );
}
