import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { productRangeIntro } from "@/lib/content";

export function ProductRangeIntro() {
  return (
    <Section tone="light" className="pb-4">
      <SectionHeading
        align="center"
        eyebrow="What we install"
        title={productRangeIntro.headingLead}
        highlight={productRangeIntro.headingHighlight}
        titleTail={productRangeIntro.headingTail}
        intro={productRangeIntro.body}
      />
    </Section>
  );
}
