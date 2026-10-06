import type { Metadata } from "next";

import { siteConfig } from "@/lib/siteConfig";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SpecStrip } from "@/components/ui/SpecStrip";
import { EnquiryButton } from "@/components/ui/EnquiryButton";
import { AccreditationLogos } from "@/components/ui/AccreditationLogos";
import { TrustpilotReviews } from "@/components/ui/TrustpilotReviews";

import { SolarHero } from "@/components/solar/SolarHero";
import { SolarProcess } from "@/components/solar/SolarProcess";
import { SolarStory } from "@/components/solar/SolarStory";
import { SolarFeatures } from "@/components/solar/SolarFeatures";
import { SolarGallery } from "@/components/solar/SolarGallery";
import { SolarPriceMatch } from "@/components/solar/SolarPriceMatch";
import { ContactStrip } from "@/components/solar/ContactStrip";

export const metadata: Metadata = {
  title: "Solar Panel Installations",
  description:
    "Looking to start your solar panel journey? MCS-certified solar PV installations with or without battery storage, 0% VAT, no deposits and a price match guarantee.",
};

/**
 * Solar PV landing page.
 *
 * A dedicated page rather than <ServicePageTemplate />: the template cannot
 * express a hero lead form, the numbered process row, the benefits row or the
 * price-match band. Section order follows the agreed reference structure:
 *
 *   hero + form -> process -> story + benefits -> features -> gallery
 *   -> reviews -> price match -> accreditations -> closing CTA -> contact
 */
export default function Page() {
  return (
    <>
      <SolarHero />

      <SpecStrip
        items={[
          "0% VAT on installations",
          "No deposits to pay",
          "MCS-certified installers",
          "Price match guarantee",
        ]}
      />

      <SolarProcess />

      <SolarStory />

      <SolarFeatures />

      <SolarGallery />

      {/* Reviews shown on-site, never as an outbound link. */}
      <Section tone="surface">
        <Container>
          <Reveal className="text-center">
            <div>
              <p className="eyebrow">Reviews</p>
              <h2 className="mt-3 text-3xl font-bold text-navy sm:text-4xl">
                What our customers say
              </h2>
            </div>
          </Reveal>
          <TrustpilotReviews className="mt-12" />
        </Container>
      </Section>

      <SolarPriceMatch />

      <Section tone="light">
        <Container>
          <Reveal className="text-center">
            <h2 className="text-2xl font-bold text-navy sm:text-3xl">
              Accredited &amp; approved
            </h2>
          </Reveal>
          <AccreditationLogos className="mt-8" />
        </Container>
      </Section>

      <Section tone="navy">
        <Container size="narrow">
          <Reveal className="text-center">
            <div>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Are you ready to start your project with a solar panel service?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/85">
                Looking for a trusted renewable energy installer near you? We provide
                expert solar panel and battery solutions to help you cut energy bills
                and get more from the power you use. Whether you need advice, a
                consultation or a tailored system, our specialists are here to help.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <EnquiryButton
                  label="Get a free quote"
                  prefillType="Residential Solar"
                  size="lg"
                />
                <Button variant="outlineLight" size="lg" href={siteConfig.phoneHref}>
                  Call {siteConfig.phone}
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <ContactStrip />
    </>
  );
}
