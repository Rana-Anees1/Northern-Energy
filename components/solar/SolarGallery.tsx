import { img } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MediaTile } from "@/components/ui/MediaTile";
import { AnimatedStack } from "@/components/ui/Reveal";

/**
 * Installation gallery. The reference uses a carousel; an eight-tile grid was
 * chosen instead so every photo is visible at once, which reads as a stronger
 * track record and needs no carousel dependency.
 *
 * Every photo below was checked by eye, not by filename, and each one is
 * distinct: several keys in lib/assets.ts are misleading (`solarAerial` is a
 * derelict facade, `solarRoofVista` is a panel on the ground, `batteryWall` is
 * an inverter) and `solarFlatRoof` duplicates the commercial aerial.
 */
const tiles = [
  img("solarRoofVista", "Installer positioning a solar panel on site"),
  img("solarRoofWorker", "Installer fitting solar panels on a pitched roof"),
  img("installerAction", "Installer securing a solar panel during a rooftop install"),
  img("installersRedRoof", "Installer fitting panels on a red tiled roof"),
  img("inspectPanel", "Installer lifting a solar panel into place at a house"),
  img("installerCarry", "Installer carrying a solar panel into position"),
  img("solarFarmAerial", "Aerial view of a large ground-mounted solar array"),
  img("techniciansTeam", "Two engineers fitting panels on a commercial roof"),
];

export function SolarGallery() {
  return (
    <Section tone="light">
      <Container>
        <SectionHeading
          eyebrow="Our work"
          title="Solar PV we’ve installed at properties across the "
          highlight="UK"
        />
        <AnimatedStack
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          staggerDelay={0.06}
        >
          {tiles.map((media) => (
            <MediaTile key={media.alt} media={media} className="aspect-[4/3]" />
          ))}
        </AnimatedStack>
      </Container>
    </Section>
  );
}
