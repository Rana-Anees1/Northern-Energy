"use client";

import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Thin full-bleed horizontal strip of key facts in large, light type,
 * separated by bullet dots.
 */
export function SpecStrip({
  items,
  tone = "light",
  className,
}: {
  items: string[];
  tone?: "light" | "navy";
  className?: string;
}) {
  if (!items.length) return null;
  const isNavy = tone === "navy";
  return (
    <Reveal direction="fade">
      <div
        className={cn(
          "w-full border-y",
          isNavy ? "border-white/10 bg-navy-deep" : "border-black/5 bg-surface",
          className,
        )}
      >
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-6 py-5 text-center">
          {items.map((item, i) => (
            <span key={item} className="flex items-center gap-3">
              {i > 0 && (
                <span
                  className={cn(
                    "text-lg",
                    isNavy ? "text-green" : "text-green/70",
                  )}
                  aria-hidden
                >
                  •
                </span>
              )}
              <span
                className={cn(
                  "text-base font-light tracking-tight sm:text-lg lg:text-xl",
                  isNavy ? "text-white/70" : "text-muted",
                )}
              >
                {item}
              </span>
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
