"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Media } from "@/components/ui/Media";
import { heroSlides } from "@/lib/content";
import { cn } from "@/lib/cn";

const SLIDE_MS = 5000;

/**
 * Full-bleed cinematic hero CAROUSEL. A small set of on-brand stills (a
 * low-energy home, rooftop solar, a heat pump, EV charging, a large array)
 * crossfade automatically every few seconds, each with a slow Ken-Burns zoom,
 * over a gentle scroll-linked parallax drift. All slides are mounted at once
 * so they preload and the crossfade never flashes a gap.
 *
 * No text or buttons — the headline lives in the IntroStatement below. Under
 * prefers-reduced-motion the carousel holds on the first slide with no motion.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce || heroSlides.length <= 1) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % heroSlides.length),
      SLIDE_MS,
    );
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <section
      ref={ref}
      className="relative h-[82vh] min-h-[560px] w-full overflow-hidden bg-navy"
      aria-roledescription="carousel"
      aria-label="Northern Renewable Centre highlights"
    >
      <motion.div
        style={reduce ? undefined : { y }}
        className="absolute inset-x-0 -top-[12%] h-[124%] will-change-transform"
      >
        {heroSlides.map((slide, i) => {
          const active = i === index;
          return (
            <motion.div
              key={i}
              aria-hidden={!active}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: active ? 1 : 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              <motion.div
                className="absolute inset-0"
                initial={false}
                animate={!reduce && active ? { scale: [1.08, 1] } : { scale: reduce ? 1 : 1.08 }}
                transition={
                  !reduce && active
                    ? { duration: SLIDE_MS / 1000 + 1.4, ease: "linear" }
                    : { duration: 0 }
                }
              >
                <Media media={slide} className="h-full w-full" priority={i < 2} />
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Subtle top gradient so the transparent navbar stays legible */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-navy/70 to-transparent"
      />
      {/* Soft bottom fade into the intro statement */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-navy/55 via-navy/10 to-transparent"
      />

      {/* Slide indicators */}
      <div className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2.5">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show slide ${i + 1} of ${heroSlides.length}`}
            aria-current={i === index}
            className={cn(
              "h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-navy",
              i === index ? "w-7 bg-green" : "w-2 bg-white/50 hover:bg-white/80",
            )}
          />
        ))}
      </div>
    </section>
  );
}
