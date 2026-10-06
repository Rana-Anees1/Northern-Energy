"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MediaTile } from "@/components/ui/MediaTile";
import { Reveal } from "@/components/ui/Reveal";
import { blogPosts } from "@/lib/content";
import { cn } from "@/lib/cn";

export function BlogCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
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
      <Container size="wide">
        <SectionHeading
          eyebrow="Insights"
          title="From the Northern Renewable Centre blog"
          align="center"
        />

        <Reveal direction="scale" className="mt-12">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {blogPosts.map((post, i) => (
                <div
                  key={i}
                  className="min-w-0 shrink-0 grow-0 basis-full pl-4 sm:basis-1/2 lg:basis-1/3"
                >
                  <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-black/5">
                    <MediaTile
                      media={post.media}
                      rounded={false}
                      className="aspect-[16/10]"
                    />
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="min-h-[3.5rem] text-lg font-bold leading-snug text-navy">
                        {post.title}
                      </h3>
                      <p className="mt-3 line-clamp-3 text-sm text-muted">
                        {post.excerpt}
                      </p>
                      <Link
                        href={post.href}
                        className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-green transition-colors hover:text-green-dark"
                      >
                        Discover more
                        <ArrowRight
                          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous insights"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-green text-white shadow-soft transition-colors hover:bg-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            <div
              className="flex items-center gap-2.5"
              role="tablist"
              aria-label="Slide selectors"
            >
              {snaps.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-selected={i === selected}
                  role="tab"
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === selected
                      ? "w-6 bg-green"
                      : "w-2 bg-navy/20 hover:bg-navy/40",
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next insights"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-green text-white shadow-soft transition-colors hover:bg-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
