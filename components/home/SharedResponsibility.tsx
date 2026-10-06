import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { images } from "@/lib/assets";
import { sharedResponsibility } from "@/lib/content";

export function SharedResponsibility() {
  const { heading, segments, cta } = sharedResponsibility;

  return (
    <Section tone="navy" className="relative overflow-hidden">
      <Media
        media={{ type: "image", src: images.sharedForest, alt: "" }}
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-navy/80" aria-hidden="true" />

      <Container className="relative text-center">
        <Reveal>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">{heading}</h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed">
            {segments.map((segment, i) => (
              <span
                key={i}
                className={cn(
                  segment.bold
                    ? "font-semibold text-green"
                    : "text-white/85",
                )}
              >
                {segment.text}
              </span>
            ))}
          </p>

          <div className="mt-8">
            <Button variant="primary" href={cta.href}>
              {cta.label}
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
