import { faqs } from "@/lib/content";
import { images } from "@/lib/assets";
import { siteConfig } from "@/lib/siteConfig";
import { PageBanner } from "@/components/ui/PageBanner";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { EnquiryButton } from "@/components/ui/EnquiryButton";
import { Button } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/faqs/FaqAccordion";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = {
  title: "FAQs",
  description:
    "Answers to common questions about solar, heat pumps, batteries, grants and finance.",
};

export default function Page() {
  return (
    <>
      <PageBanner
        eyebrow="Good to know"
        title="Frequently Asked Questions"
        media={{
          type: "image",
          src: images.bannerFaqs,
          alt: "Comfortable, energy-efficient home",
        }}
      />

      <Section tone="light">
        <Container size="narrow">
          <Reveal>
            <p className="mb-8 leading-relaxed text-muted">
              Thinking about going greener at home or work? Here are the questions
              we hear most often about solar, heat pumps, batteries, grants and
              finance. Can&apos;t find what you&apos;re after? Our team is always
              happy to help.
            </p>
          </Reveal>
          <FaqAccordion items={faqs} />
        </Container>
      </Section>

      <Section tone="green">
        <Container size="narrow" className="text-center">
          <Reveal>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Still have a question?
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/85">
              Get in touch and one of our friendly advisors will point you in the
              right direction.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <EnquiryButton label="Ask us" variant="navy" />
              <Button variant="outlineLight" href={siteConfig.phoneHref}>
                Call {siteConfig.phone}
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
