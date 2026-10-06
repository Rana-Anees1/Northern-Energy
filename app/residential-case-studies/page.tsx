import type { Metadata } from "next";
import { PageBanner } from "@/components/ui/PageBanner";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { EnquiryButton } from "@/components/ui/EnquiryButton";
import { CaseStudyGallery } from "@/components/case-studies/CaseStudyGallery";
import { Reveal } from "@/components/ui/Reveal";
import { residentialCaseStudies } from "@/lib/content";
import { images } from "@/lib/assets";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Residential Case Studies",
  description:
    "Real homes across the North East and Scotland generating, storing and using their own clean energy, see what we have fitted and the results it delivered.",
};

export default function Page() {
  return (
    <>
      <PageBanner
        eyebrow="Our work"
        title="Residential Case Studies"
        media={{
          type: "image",
          src: images.residentialCase,
          alt: "Completed residential solar and battery installation",
        }}
      />

      <Section tone="light">
        <Container>
          <Reveal>
            <p className="max-w-2xl text-lg text-ink">
              From a few panels on a terrace to a fully integrated solar, battery
              and heat pump setup, here is a snapshot of homes we have helped take
              real, lasting control of their energy. Every project below was
              designed around the property, the household and the way they live.
            </p>
          </Reveal>
          <div className="mt-12">
            <CaseStudyGallery studies={residentialCaseStudies} />
          </div>
        </Container>
      </Section>

      <Section tone="green">
        <Container>
          <Reveal>
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold text-white sm:text-4xl">
                  Could your home be next?
                </h2>
                <p className="mt-3 text-white/85">
                  Tell us a little about your property and {siteConfig.shortName}{" "}
                  will put together a tailored, no-obligation proposal.
                </p>
              </div>
              <EnquiryButton
                label="Start your project"
                prefillType="Residential Solar"
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
