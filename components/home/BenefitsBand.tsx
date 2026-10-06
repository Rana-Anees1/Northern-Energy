import { ArrowRight, PiggyBank, ShieldCheck, Leaf, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { benefits, benefitsBand } from "@/lib/content";

const ICONS: Record<string, LucideIcon> = {
  PiggyBank,
  ShieldCheck,
  Leaf,
  TrendingUp,
};

export function BenefitsBand() {
  return (
    <Section tone="surface">
      <Container>
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-green">
              {benefitsBand.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-bold text-navy sm:text-4xl">
              {benefitsBand.heading}
            </h2>
            <p className="mt-4 text-base text-muted">{benefitsBand.body}</p>
            <p className="mt-5 text-lg font-semibold italic text-navy">
              {benefitsBand.strapline}
            </p>
            <Link
              href={benefitsBand.link.href}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-green transition-colors hover:text-green-dark"
            >
              {benefitsBand.link.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, i) => {
            const Icon = ICONS[benefit.icon];
            return (
              <Reveal key={benefit.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green/10 text-green">
                    {Icon ? <Icon className="h-6 w-6" aria-hidden="true" /> : null}
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-navy">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{benefit.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
