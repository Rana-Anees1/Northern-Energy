import { cn } from "@/lib/cn";

export type SectionTone = "light" | "surface" | "navy" | "green";

const toneClasses: Record<SectionTone, string> = {
  light: "bg-white text-ink",
  surface: "bg-surface text-ink",
  navy: "bg-navy text-white",
  green: "bg-green text-white",
};

export function Section({
  id,
  tone = "light",
  className,
  children,
  padded = true,
}: {
  id?: string;
  tone?: SectionTone;
  className?: string;
  children: React.ReactNode;
  padded?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative",
        padded && "py-16 sm:py-20 lg:py-28",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </section>
  );
}
