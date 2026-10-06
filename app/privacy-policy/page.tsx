import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageBanner } from "@/components/ui/PageBanner";
import { AnimatedStack } from "@/components/ui/Reveal";
import { images } from "@/lib/assets";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Northern Renewable Centre collects, uses and protects the personal data you share with us through our enquiry form and contact channels.",
};

export default function Page() {
  return (
    <>
      <PageBanner
        eyebrow="Legal"
        title="Privacy Policy"
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
              This policy explains, in plain English, what personal information{" "}
              {siteConfig.name} collects, why we collect it, and how we look after
              it. We only ever ask for the details we genuinely need to help you,
              and we treat them with care.
            </p>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-navy">Who we are</h2>
              <p className="text-muted">
                {siteConfig.name} ({siteConfig.company.registration}) is the data
                controller responsible for the personal data you share with us. We
                are registered with the Information Commissioner&apos;s Office under{" "}
                {siteConfig.company.ico}.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-navy">
                The information we collect
              </h2>
              <p className="text-muted">
                When you complete our enquiry form, request a quotation or get in
                touch by phone or email, we collect the details you choose to give
                us, typically your name, contact details, your property&apos;s
                location and a description of the renewable system or service you
                are interested in. We do not ask for more than we need.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-navy">How we use it</h2>
              <p className="text-muted">
                We use your information to respond to your enquiry, prepare a
                tailored quotation, arrange site surveys and installations, and
                where relevant, to check your eligibility for grants and handle the
                associated paperwork on your behalf. With your consent, we may also
                keep you updated about products and offers that are likely to be of
                interest. You can ask us to stop at any time.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-navy">
                Keeping your data safe
              </h2>
              <p className="text-muted">
                We hold your information securely and share it only with trusted
                partners who help us deliver your installation, and only ever the
                details they need to do their part of the job. We keep your data for
                no longer than is necessary, after which it is securely deleted.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-navy">Your rights</h2>
              <p className="text-muted">
                You have the right to ask what personal data we hold about you, to
                have it corrected or deleted, and to withdraw your consent to
                marketing at any time. To make a request, or if you have any
                questions about how we handle your data, please email us at{" "}
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
