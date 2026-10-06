import { cn } from "@/lib/cn";

export function Container({
  className,
  children,
  size = "default",
}: {
  className?: string;
  children: React.ReactNode;
  size?: "default" | "wide" | "narrow";
}) {
  const max =
    size === "wide" ? "max-w-[88rem]" : size === "narrow" ? "max-w-3xl" : "max-w-7xl";
  return (
    <div className={cn("mx-auto w-full section-x", max, className)}>{children}</div>
  );
}
