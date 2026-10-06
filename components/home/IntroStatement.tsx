import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { introStatement } from "@/lib/content";

export function IntroStatement() {
  const { eyebrow, text, link } = introStatement;

  return (
    <Section tone="light">
      <Container>
        <div className="max-w-3xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green">
              {eyebrow}
            </p>
          </Reveal>
          <TextReveal
            as="p"
            text={text}
            stagger={0.016}
            delay={0.05}
            className="mt-6 text-2xl font-light leading-snug text-navy sm:text-3xl lg:text-[2.5rem] lg:leading-[1.22]"
          />
          <Reveal delay={0.1}>
            <Link
              href={link.href}
              className="group mt-8 inline-flex items-center gap-2 font-semibold text-green hover:underline"
            >
              {link.label}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
