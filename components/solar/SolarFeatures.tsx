import { Check } from "lucide-react";
import { img } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { MediaTile } from "@/components/ui/MediaTile";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The three detail blocks kept from the previous solar page. They sit after
 * the benefits row and answer the questions the reference layout leaves open
 * (roof design, battery pairing, and commercial scale).
 *
 * Copy is carried over from lib/content.ts. Three image keys were corrected
 * after checking the files by eye rather than by name: `solarAerial` is a
 * derelict concrete facade, `solarRoofVista` is a panel lying on the ground,
 * and `batteryWall` is an inverter, not a battery.
 */

const features = [
  {
    heading: "Designed around your roof",
    body: "Every roof is different, so every system we design is too. We survey orientation, shading and your usage patterns to size an array that delivers the most energy where it matters, and looks tidy doing it.",
    media: img("solarPv", "Solar panels fitted neatly across a tiled roof"),
    bullets: [
      "MCS-certified installation",
      "Premium tier-one panels",
      "25-year panel warranties",
    ],
  },
  {
    heading: "Better with a battery",
    body: "Pair your panels with storage and you can use your own solar long after the sun goes down, squeezing far more value from every unit you generate. We will show you the numbers for your home.",
    media: img("battery", "Home battery storage paired with solar PV"),
    bullets: ["Use solar after dark", "Lower grid reliance", "Optional backup power"],
  },
  {
    heading: "For homes and businesses",
    body: "From a few panels on a semi to a commercial rooftop array, the principles are the same and the savings scale. Talk to us about grid-tied systems for any size of property.",
    media: img("solarCommercial", "Commercial rooftop solar installation from above"),
    bullets: [],
  },
];

export function SolarFeatures() {
  return (
    <>
      {features.map((feature, i) => {
        const mediaRight = i % 2 === 0;
        return (
          <Section key={feature.heading} tone={i % 2 === 0 ? "light" : "surface"}>
            <Container>
              <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
                <Reveal
                  direction={mediaRight ? "right" : "left"}
                  className={mediaRight ? "lg:order-2" : "lg:order-1"}
                >
                  <MediaTile
                    media={feature.media}
                    className="aspect-[4/3] h-full lg:min-h-[400px]"
                  />
                </Reveal>
                <Reveal
                  direction={mediaRight ? "left" : "right"}
                  className={mediaRight ? "lg:order-1" : "lg:order-2"}
                >
                  <div>
                    <h3 className="text-2xl font-bold text-navy sm:text-3xl">
                      {feature.heading}
                    </h3>
                    <p className="mt-4 leading-relaxed text-muted">{feature.body}</p>
                    {feature.bullets.length > 0 ? (
                      <ul className="mt-6 space-y-3">
                        {feature.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-3">
                            <span
                              aria-hidden
                              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green/15 text-green"
                            >
                              <Check className="h-4 w-4" />
                            </span>
                            <span className="text-ink">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </Reveal>
              </div>
            </Container>
          </Section>
        );
      })}
    </>
  );
}
