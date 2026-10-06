import type { Metadata } from "next";
import { PageBanner } from "@/components/ui/PageBanner";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { EnquiryButton } from "@/components/ui/EnquiryButton";
import { CaseStudyGallery } from "@/components/case-studies/CaseStudyGallery";
import { Reveal } from "@/components/ui/Reveal";
import { commercialCaseStudies } from "@/lib/content";
import { images } from "@/lib/assets";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Commercial Case Studies",
  description:
    "Businesses cutting overheads and carbon with renewable generation, storage and heating at scale, explore commercial projects we have delivered.",
};

export default function Page() {
  return (
    <>
      <PageBanner
        eyebrow="Our work"
        title="Commercial Case Studies"
        media={{
          type: "image",
          src: images.commercialCase,
          alt: "Large commercial rooftop solar installation",
        }}
      />

      <Section tone="light">
        <Container>
          <Reveal>
            <p className="max-w-2xl text-lg text-ink">
              Warehouses, forecourts, offices and care homes, renewable energy
              scales beautifully when it is engineered for the demands of a
              business. Here are projects where we helped operators trim running
              costs, cut peak-rate demand and move closer to their net-zero goals.
            </p>
          </Reveal>
          <div className="mt-12">
            <CaseStudyGallery studies={commercialCaseStudies} />
          </div>
        </Container>
      </Section>

      <Section tone="green">
        <Container>
          <Reveal>
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold text-white sm:text-4xl">
                  Ready to cut your overheads and carbon?
                </h2>
                <p className="mt-3 text-white/85">
                  Share a few details about your premises and {siteConfig.shortName}{" "}
                  will arrange a site assessment and a tailored proposal.
                </p>
              </div>
              <EnquiryButton
                label="Start your project"
                prefillType="Commercial Solar"
                variant="navy"
                size="lg"
              />
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
