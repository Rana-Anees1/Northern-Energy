import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedStack } from "@/components/ui/Reveal";

/**
 * "Our Process Made Simple" — three numbered steps, big numerals over each
 * heading. Copy follows the reference stages: remote design, independent
 * survey, then a single-day install.
 */

const steps = [
  {
    heading: "Telephone Consultation",
    body: "We use satellite imagery to measure your roof and remotely generate your solar PV system proposal. This can be refined until you are happy with the design, the brand choices and the cost, so it aligns with your goals and your budget.",
  },
  {
    heading: "In Person On Site Survey",
    body: "We do not believe in pushy sales visits, just honest advice. Once you are happy to go ahead, an independent surveyor assesses cable runs and the best locations for your equipment, checking the remote design is accurate and nothing has been missed.",
  },
  {
    heading: "Solar System Installation Day",
    body: "After grid approval and arranging scaffolding, our in-house roofers and electricians complete your installation, typically in one day. Once complete we walk you through the monitoring platform so you get the most from your system.",
  },
];

export function SolarProcess() {
  return (
    <Section tone="light">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="Our Process Made "
          highlight="Simple"
          intro="We like everything to be simple and easy, from beginning to end."
        />
        <AnimatedStack className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.heading} className="relative">
              <span
                aria-hidden
                className="block text-6xl font-bold leading-none text-green/25 sm:text-7xl"
              >
                {i + 1}
              </span>
              <h3 className="mt-4 text-xl font-bold text-navy sm:text-2xl">
                {step.heading}
              </h3>
              <p className="mt-3 leading-relaxed text-muted">{step.body}</p>
            </div>
          ))}
        </AnimatedStack>
      </Container>
    </Section>
  );
}
