import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AccreditationLogos } from "@/components/ui/AccreditationLogos";
import { TrustpilotReviews } from "@/components/ui/TrustpilotReviews";

export function Accreditations() {
  return (
    <Section tone="surface">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Accredited & approved"
          title="Our accreditations"
          intro="Independently certified, so you can be confident the work meets recognised industry standards."
        />

        <AccreditationLogos className="mt-10" />

        {/* Client feedback: show reviews ON the site rather than linking away. */}
        <TrustpilotReviews className="mt-14" />
      </Container>
    </Section>
  );
}
