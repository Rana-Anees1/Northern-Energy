import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageBanner } from "@/components/ui/PageBanner";
import { AnimatedStack } from "@/components/ui/Reveal";
import { images } from "@/lib/assets";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Modern Slavery & Human Trafficking",
  description:
    "Northern Renewable Centre's statement on its commitment to preventing modern slavery and human trafficking across its operations and supply chain.",
};

export default function Page() {
  return (
    <>
      <PageBanner
        eyebrow="Legal"
        title="Modern Slavery & Human Trafficking"
        media={{
          type: "image",
          src: images.bannerCentre,
          alt: "Northern Renewable Centre",
        }}
      />

      <Section tone="light">
        <Container size="narrow">
          <AnimatedStack className="space-y-10">
            <p className="text-muted">
              {siteConfig.name} ({siteConfig.company.registration}) is committed to
              acting ethically and with integrity in everything we do. We have zero
              tolerance for modern slavery and human trafficking, whether in our own
              operations or anywhere in our supply chain.
            </p>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-navy">Our commitment</h2>
              <p className="text-muted">
                We believe everyone has the right to work freely, safely and with
                dignity. We are determined to play our part in ensuring that modern
                slavery, forced labour and human trafficking have no place in the
                renewable-energy industry or in the way we run our business.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-navy">Our people</h2>
              <p className="text-muted">
                Everyone who works for us does so freely and is paid fairly for the
                job they do. We verify the right to work, treat colleagues with
                respect, and encourage anyone with a concern to raise it openly,
                knowing it will be taken seriously and handled in confidence.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-navy">Our supply chain</h2>
              <p className="text-muted">
                We source equipment and services from established manufacturers and
                partners, and we expect them to share our standards. We take
                reasonable steps to understand who we work with and to satisfy
                ourselves that the products we install are produced responsibly.
                Where we have concerns, we will act on them.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-navy">Raising a concern</h2>
              <p className="text-muted">
                If you believe modern slavery or human trafficking may be connected
                to our business or supply chain in any way, please tell us so we can
                investigate. You can reach us in confidence at{" "}
                <a
                  href={siteConfig.emailHref}
                  className="font-medium text-green underline-offset-2 hover:underline"
                >
                  {siteConfig.email}
                </a>
                .
              </p>
            </div>
          </AnimatedStack>
        </Container>
      </Section>
    </>
  );
}
