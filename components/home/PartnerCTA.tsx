"use client";

import { Handshake } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { useEnquiry } from "@/components/providers/EnquiryProvider";
import { partnerCTA } from "@/lib/content";
import { cn } from "@/lib/cn";

interface PartnerCTAProps {
  variant?: "band" | "light";
}

export function PartnerCTA({ variant = "band" }: PartnerCTAProps) {
  const { openEnquiry } = useEnquiry();
  const isBand = variant === "band";

  return (
    <Section tone={isBand ? "green" : "surface"}>
      <Container size="narrow">
        <Reveal className="flex flex-col items-center text-center">
          <span
            className={cn(
              "inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em]",
              isBand ? "text-white/80" : "text-green"
            )}
          >
            <Handshake className="h-4 w-4" aria-hidden="true" />
            {partnerCTA.eyebrow}
          </span>

          <h2
            className={cn(
              "mt-4 text-3xl font-bold sm:text-4xl",
              isBand ? "text-white" : "text-navy"
            )}
          >
            {partnerCTA.heading}
          </h2>

          <p
            className={cn(
              "mt-4 max-w-2xl text-base leading-relaxed sm:text-lg",
              isBand ? "text-white/85" : "text-muted"
            )}
          >
            {partnerCTA.body}
          </p>

          <div className="mt-8">
            <Button
              variant={isBand ? "navy" : "primary"}
              size="lg"
              onClick={() => openEnquiry("General Enquiry")}
            >
              {partnerCTA.cta}
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
