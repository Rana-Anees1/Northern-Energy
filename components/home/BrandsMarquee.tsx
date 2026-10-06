"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/siteConfig";
import { cn } from "@/lib/cn";

// Paginated carousel of the real brand logos (files in /public/images/brands,
// sourced from the live site). Autoplays, loops, and has arrow + dot controls.
// Each tile shows the logo on white; the brand name is the alt text, which the
// browser shows if a logo ever fails to load.
export function BrandsMarquee() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 3200, stopOnInteraction: false }),
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
    <Section tone="light">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Trusted technology"
          title="Reliable brands"
        />

        <div className="relative mt-12">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {siteConfig.brands.map((brand) => (
                <div
                  key={brand.name}
                  className="min-w-0 shrink-0 grow-0 basis-1/2 pl-4 sm:basis-1/3 lg:basis-1/5"
                >
                  <div className="group flex h-32 items-center justify-center px-6">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      loading="lazy"
                      decoding="async"
                      className={cn(
                        "max-h-24 w-auto max-w-full object-contain",
                        "opacity-80 transition duration-300 ease-out",
                        "group-hover:scale-105 group-hover:opacity-100",
                      )}
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
                aria-label="Previous brands"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-green text-white transition hover:bg-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2"
              >
                <ArrowLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                aria-label="Next brands"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-green text-white transition hover:bg-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2"
              >
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2">
              {snaps.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollTo(i)}
                  aria-label={`Go to brand group ${i + 1}`}
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
      </Container>
    </Section>
  );
}
