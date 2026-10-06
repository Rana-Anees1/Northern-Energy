"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { MediaTile } from "@/components/ui/MediaTile";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

interface CaseStudyMedia {
  type: "image" | "video";
  src: string;
  poster?: string;
  alt: string;
}

interface CaseStudyGalleryStudy {
  title: string;
  result: string;
  media: CaseStudyMedia;
}

interface CaseStudyGalleryProps {
  studies: CaseStudyGalleryStudy[];
}

export function CaseStudyGallery({ studies }: CaseStudyGalleryProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 4500, stopOnInteraction: false }),
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
            {studies.map((study, i) => (
              <div
                key={`${study.title}-${i}`}
                className="min-w-0 shrink-0 grow-0 basis-full pl-4 sm:basis-1/2 lg:basis-1/3"
              >
                <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-black/5">
                  <MediaTile
                    media={study.media}
                    rounded={false}
                    className="aspect-[4/3]"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-bold text-navy">{study.title}</h3>
                    <p className="mt-2 text-sm text-muted">{study.result}</p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous case study"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-green text-white transition hover:bg-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2"
            >
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next case study"
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
                aria-label={`Go to slide ${i + 1}`}
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
