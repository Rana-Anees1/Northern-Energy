"use client";

import { Fragment } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { viewportOnce, smoothEase, motionDuration } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Tag = "h1" | "h2" | "h3" | "p" | "span";

export interface TextSegment {
  text: string;
  /** Extra classes for this run of words (e.g. "text-green") */
  className?: string;
}

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: motionDuration.text, ease: smoothEase },
  },
};

/**
 * Headline reveal: each word fades + rises into place with a gentle stagger.
 * Accepts either a plain `text` string or coloured `segments`. The full string
 * is exposed via aria-label, with the animated words hidden from AT.
 * Respects prefers-reduced-motion.
 */
export function TextReveal({
  text,
  segments,
  className,
  as = "h2",
  delay = 0,
  stagger = 0.045,
}: {
  text?: string;
  segments?: TextSegment[];
  className?: string;
  as?: Tag;
  delay?: number;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  const segs: TextSegment[] = segments ?? [{ text: text ?? "" }];
  const full = segs.map((s) => s.text).join(" ").replace(/\s+/g, " ").trim();

  if (reduce) {
    const Plain = as;
    return (
      <Plain className={className}>
        {segs.map((s, i) => (
          <span key={i} className={s.className}>
            {s.text}
            {i < segs.length - 1 ? " " : ""}
          </span>
        ))}
      </Plain>
    );
  }

  const words: { word: string; className?: string }[] = [];
  segs.forEach((s) => {
    s.text
      .split(" ")
      .filter(Boolean)
      .forEach((word) => words.push({ word, className: s.className }));
  });

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      aria-label={full}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={{ show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {words.map((item, i) => (
        <Fragment key={i}>
          <motion.span
            aria-hidden="true"
            variants={wordVariants}
            className={cn("inline-block", item.className)}
          >
            {item.word}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </MotionTag>
  );
}
