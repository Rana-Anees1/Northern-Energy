import { SmartImage } from "@/components/ui/SmartImage";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/lib/siteConfig";
import { cn } from "@/lib/cn";

/**
 * The accreditation logo strip.
 *
 * Client feedback: this section must show the ACTUAL marks, not text chips.
 * Each logo sits on a white tile because the official artwork is designed for
 * a light background (Gas Safe and MCS are near-black, F-Gas is deep blue), so
 * a white tile keeps them legible on both the light and surface section tones.
 */
export function AccreditationLogos({ className }: { className?: string }) {
  return (
    <ul
      className={cn(
        "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7",
        className,
      )}
    >
      {siteConfig.accreditations.map((accreditation, i) => (
        <li key={accreditation.name}>
          <Reveal delay={i * 0.06}>
            <div className="flex h-full items-center justify-center rounded-xl bg-white px-4 py-5 shadow-soft ring-1 ring-black/5">
              <SmartImage
                src={accreditation.logo}
                alt={`${accreditation.name} logo`}
                className="h-12 w-full"
                imgClassName="object-contain"
              />
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
