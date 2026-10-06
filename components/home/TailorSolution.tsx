"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, FileText, PhoneCall, CreditCard, Sparkles } from "lucide-react";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MediaTile } from "@/components/ui/MediaTile";
import { Reveal } from "@/components/ui/Reveal";
import { useEnquiry } from "@/components/providers/EnquiryProvider";
import { tailorSolution } from "@/lib/content";
import { siteConfig } from "@/lib/siteConfig";
import { images } from "@/lib/assets";
import { cn } from "@/lib/cn";

const ICONS = { FileText, PhoneCall, CreditCard, Sparkles } as const;

type IconName = keyof typeof ICONS;

export function TailorSolution() {
  const { openEnquiry } = useEnquiry();
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 4500, stopOnInteraction: false })],
  );
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

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
    <Section tone="navy">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-green">
              Your perfect fit
            </p>
            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
              {tailorSolution.heading}
            </h2>
            <p className="max-w-xl text-white/80">{tailorSolution.body}</p>
            <MediaTile
              media={{
                type: "image",
                src: images.partnerVan,
                alt: "Northern Renewable Centre team",
              }}
              className="hidden aspect-[4/3] lg:block"
            />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {tailorSolution.cards.map((card, i) => {
                  const Icon = ICONS[card.icon as IconName] ?? Sparkles;
                  return (
                    <div
                      key={card.title}
                      className="min-w-0 shrink-0 grow-0 basis-full pl-4 sm:basis-1/2 lg:basis-full xl:basis-1/2"
                    >
                      <article className="flex h-full flex-col rounded-2xl bg-white p-6">
                        <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-green/10 text-green">
                          <Icon className="h-6 w-6" aria-hidden="true" />
                        </span>
                        <h3 className="text-lg font-semibold text-navy">
                          {card.title}
                        </h3>
                        <p className="mt-2 flex-1 text-sm text-muted">{card.body}</p>
                        <div className="mt-5">
                          {card.action.kind === "modal" ? (
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => openEnquiry()}
                            >
                              {card.action.label}
                            </Button>
                          ) : card.action.kind === "phone" ? (
                            <Button
                              variant="primary"
                              size="sm"
                              href={siteConfig.phoneHref}
                            >
                              {card.action.label}
                            </Button>
                          ) : (
                            <Button
                              variant="primary"
                              size="sm"
                              href={card.action.href}
                            >
                              {card.action.label}
                            </Button>
                          )}
                        </div>
                      </article>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2" role="tablist" aria-label="Slide selection">
                {snaps.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to slide ${i + 1}`}
                    aria-selected={i === selected}
                    role="tab"
                    onClick={() => scrollTo(i)}
                    className={cn(
                      "h-2 rounded-full transition-all",
                      i === selected ? "w-6 bg-green" : "w-2 bg-white/30 hover:bg-white/50",
                    )}
                  />
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Previous slide"
                  onClick={() => emblaApi?.scrollPrev()}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-green text-white transition-colors hover:bg-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label="Next slide"
                  onClick={() => emblaApi?.scrollNext()}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-green text-white transition-colors hover:bg-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
