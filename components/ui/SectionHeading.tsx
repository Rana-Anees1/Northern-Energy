import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";
import { TextReveal, type TextSegment } from "@/components/ui/TextReveal";

/**
 * Eyebrow + animated heading + optional intro. `highlight` renders a
 * green-accented run of words inside the heading (e.g. "An Exclusive Range of
 * Solutions"). The heading animates word-by-word via TextReveal.
 */
export function SectionHeading({
  eyebrow,
  title,
  highlight,
  titleTail,
  intro,
  align = "center",
  tone = "dark",
  className,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  titleTail?: string;
  intro?: string;
  align?: "center" | "left";
  tone?: "dark" | "light";
  className?: string;
}) {
  const isLight = tone === "light";

  const segments: TextSegment[] = [{ text: title }];
  if (highlight) segments.push({ text: highlight, className: "text-green" });
  if (titleTail) segments.push({ text: titleTail });

  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <p className="eyebrow mb-3">{eyebrow}</p>
        </Reveal>
      )}
      <TextReveal
        as="h2"
        segments={segments}
        className={cn(
          "text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.75rem]",
          isLight ? "text-white" : "text-navy",
        )}
      />
      {intro && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "mt-5 text-lg leading-relaxed",
              isLight ? "text-white/80" : "text-muted",
            )}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
