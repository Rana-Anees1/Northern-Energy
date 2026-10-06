"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { MediaRef } from "@/lib/content";
import { Media } from "@/components/ui/Media";
import { Container } from "@/components/ui/Container";
import { TextReveal } from "@/components/ui/TextReveal";
import { smoothEase, motionDuration } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * Reusable page hero banner: full-bleed media (with a gentle parallax drift),
 * navy overlay, eyebrow and an animated title. Sits under the transparent
 * fixed navbar (which turns solid on scroll).
 */
export function PageBanner({
  eyebrow,
  title,
  media,
  className,
}: {
  eyebrow?: string;
  title: string;
  media: MediaRef;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section
      ref={ref}
      className={cn(
        "relative flex min-h-[56vh] items-end overflow-hidden bg-navy lg:min-h-[62vh]",
        className,
      )}
    >
      <motion.div
        style={reduce ? undefined : { y }}
        className="absolute inset-x-0 -top-[12%] h-[124%] will-change-transform"
      >
        <Media media={media} className="absolute inset-0 h-full w-full" priority />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-navy/30" />

      <Container className="relative z-10 pb-16 pt-32 sm:pb-20 lg:pb-24">
        {eyebrow && (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={reduce ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: motionDuration.text, ease: smoothEase }}
            className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-green"
          >
            {eyebrow}
          </motion.p>
        )}
        <TextReveal
          as="h1"
          text={title}
          className="max-w-4xl text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-6xl"
        />
      </Container>
    </section>
  );
}
