"use client";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { ecosystem } from "@/lib/content";
import { images } from "@/lib/assets";

export function EcosystemSection() {
  return (
    <Section tone="light">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Works together"
          title={ecosystem.heading}
          intro={ecosystem.body}
        />

        <Reveal direction="scale" className="mt-12">
          <div className="relative mx-auto aspect-[16/9] w-full max-w-5xl overflow-hidden rounded-2xl ring-1 ring-black/5">
            <Media
              media={{
                type: "image",
                src: images.houseAerial,
                alt: "Aerial view of a home with integrated renewable energy",
              }}
              className="absolute inset-0"
            />

            {ecosystem.hotspots.map((h) => (
              <button
                key={h.label}
                type="button"
                aria-label={h.label}
                style={{ top: h.top, left: h.left }}
                className="group absolute -translate-x-1/2 -translate-y-1/2 rounded-full outline-none"
              >
                {/* Pulsing ring */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -m-1.5 rounded-full bg-green/60 motion-safe:animate-ping-slow"
                />
                {/* Solid dot */}
                <span
                  aria-hidden="true"
                  className="relative block h-4 w-4 rounded-full border-2 border-white bg-green shadow-md transition-transform duration-200 group-hover:scale-125 group-focus-visible:scale-125"
                />

                {/* Tooltip label */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-navy opacity-0 shadow-lg ring-1 ring-black/5 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
                >
                  {h.label}
                </span>
              </button>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
