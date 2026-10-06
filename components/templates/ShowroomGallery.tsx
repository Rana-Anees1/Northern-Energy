"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { MediaRef } from "@/lib/content";
import { MediaTile } from "@/components/ui/MediaTile";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

/**
 * Photo gallery carousel for a set of real photos (e.g. a showroom tour).
 * Tiles are portrait (3:4) because the supplied showroom photos are portrait;
 * object-cover keeps each shot centred. Mirrors CaseStudyGallery's controls
 * (autoplay, arrows, dots) and respects prefers-reduced-motion via Embla.
 */
export function ShowroomGallery({ items }: { items: MediaRef[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);

  const [snaps, setSnaps] = useState<number[]>([]);
  const [selected, setSelected] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    setSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  return (
    <Reveal direction="scale">
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {items.map((media, i) => (
              <div
                key={`${media.src}-${i}`}
                className="min-w-0 shrink-0 grow-0 basis-4/5 pl-4 sm:basis-1/2 lg:basis-1/3"
              >
                <div className="overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-black/5">
                  <MediaTile
                    media={media}
                    rounded={false}
                    className="aspect-[3/4]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous photo"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-green text-white transition hover:bg-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2"
            >
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next photo"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-green text-white transition hover:bg-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2"
            >
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            {snaps.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollTo(i)}
                aria-label={`Go to photo ${i + 1}`}
                aria-current={selected === i}
                className={cn(
                  "h-2.5 rounded-full transition-all",
                  selected === i ? "w-6 bg-green" : "w-2.5 bg-navy/20 hover:bg-navy/40",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
