import { cn } from "@/lib/cn";

/**
 * Two looks:
 *  - "plain"  → bold uppercase tracked label (used in the product badge rows)
 *  - "pill"   → soft green-tinted pill
 */
export function Badge({
  children,
  variant = "plain",
  className,
}: {
  children: React.ReactNode;
  variant?: "plain" | "pill";
  className?: string;
}) {
  if (variant === "pill") {
    return (
      <span
        className={cn(
          "inline-flex items-center rounded-full bg-green/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green",
          className,
        )}
      >
        {children}
      </span>
    );
  }
  return (
    <span
      className={cn(
        "text-xs font-bold uppercase tracking-[0.12em] text-navy/70",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function BadgeRow({
  items,
  className,
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-6 gap-y-2",
        className,
      )}
    >
      {items.map((item) => (
        <Badge key={item}>{item}</Badge>
      ))}
    </div>
  );
}
