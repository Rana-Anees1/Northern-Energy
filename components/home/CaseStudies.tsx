import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MediaTile } from "@/components/ui/MediaTile";
import { Reveal } from "@/components/ui/Reveal";
import { caseStudyCategories } from "@/lib/content";

export function CaseStudies() {
  return (
    <Section tone="light">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Our work"
          title="Take a look for yourself"
          intro="Real homes and businesses across the North East and Scotland, already enjoying greener, cheaper energy."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {caseStudyCategories.map((category, i) => (
            <Reveal key={category.href} delay={i * 0.1}>
              <Link
                href={category.href}
                className="group relative block overflow-hidden rounded-2xl ring-1 ring-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-green"
              >
                <MediaTile
                  media={category.media}
                  rounded={false}
                  className="aspect-[16/10]"
                />

                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent"
                />

                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <h3 className="text-2xl font-bold text-white">
                    {category.title}
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-white/85">
                    {category.body}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white">
                    View projects
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
