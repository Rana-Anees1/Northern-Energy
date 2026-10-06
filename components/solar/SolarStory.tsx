import { BatteryCharging, Car, PlugZap, Sun } from "lucide-react";
import { img } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { MediaTile } from "@/components/ui/MediaTile";
import { Reveal, AnimatedStack } from "@/components/ui/Reveal";
import { EnquiryButton } from "@/components/ui/EnquiryButton";

/**
 * "Home Solar And Batteries" story block. The four benefit icons live INSIDE
 * this section rather than standing alone, matching the reference layout.
 */

const benefits = [
  {
    icon: PlugZap,
    text: "Create your own power and reduce your reliance on the grid",
  },
  {
    icon: Sun,
    text: "Consume more clean power rather than gas/coal/nuclear generated",
  },
  {
    icon: BatteryCharging,
    text: "Get paid for any power exported to the grid",
  },
  {
    icon: Car,
    text: "Charge electric vehicles for free",
  },
];

export function SolarStory() {
  return (
    <Section tone="surface">
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal direction="left">
            <MediaTile
              media={img("solarHouseHill", "Home with a rooftop solar array and battery storage")}
              className="aspect-[4/3] h-full lg:min-h-[440px]"
            />
          </Reveal>

          <Reveal direction="right">
            <div>
              <p className="eyebrow">Why solar</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-navy sm:text-4xl">
                Home Solar And Batteries:{" "}
                <span className="text-green">a local solution for global problems.</span>
              </h2>
              <div className="mt-5 space-y-4 leading-relaxed text-muted">
                <p>
                  There is more solar being installed now than ever, and is it any
                  wonder why? Recent energy price hikes have increased its
                  cost-effectiveness and made solar panels an even more attractive
                  option for most homeowners to consider.
                </p>
                <p>
                  Solar and battery installations are a low-maintenance &lsquo;set and
                  forget&rsquo; technology: a power plant of your own that pays for
                  itself, increases your property value and lowers your carbon
                  footprint.
                </p>
                <p>
                  With our cars, our heating and the world around us becoming more
                  dependent on electricity, it is only a matter of time before there
                  is solar everywhere. Reach out today for a free, no-obligation
                  remote design and quote for solar on your roof.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <AnimatedStack className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="rounded-2xl bg-white p-6 shadow-soft ring-1 ring-black/5"
            >
              <span
                aria-hidden
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-green/12 text-green"
              >
                <Icon className="h-6 w-6" />
              </span>
              <p className="mt-4 leading-relaxed text-ink">{text}</p>
            </div>
          ))}
        </AnimatedStack>

        <Reveal className="mt-12 flex justify-center">
          <div>
            <EnquiryButton
              label="Contact Us Today!"
              prefillType="Residential Solar"
              size="lg"
            />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
