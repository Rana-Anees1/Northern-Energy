import { BadgePoundSterling } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { EnquiryButton } from "@/components/ui/EnquiryButton";

/** Price match guarantee band. */
export function SolarPriceMatch() {
  return (
    <Section tone="green">
      <Container size="narrow">
        <Reveal className="text-center">
          <div>
            <span
              aria-hidden
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white"
            >
              <BadgePoundSterling className="h-7 w-7" />
            </span>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
              Price Match Guarantee
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              A no-nonsense price match guarantee.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/85">
              Had a quote with better pricing? Share it with us and we&apos;ll beat
              it, as simple as that.
            </p>
            <div className="mt-8 flex justify-center">
              <EnquiryButton
                label="Price match my quote!"
                prefillType="Residential Solar"
                variant="navy"
                size="lg"
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
