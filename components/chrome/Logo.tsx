import Image from "next/image";
import { siteConfig } from "@/lib/siteConfig";
import { cn } from "@/lib/cn";

const LOGO_ASPECT = 2560 / 976;

interface LogoProps {
  className?: string;
  /** Height in pixels — width scales with the logo aspect ratio. */
  height?: number;
  priority?: boolean;
  /** Light = white text for dark backgrounds; dark = navy text for light backgrounds. */
  variant?: "light" | "dark";
}

export function Logo({
  className,
  height = 56,
  priority = false,
  variant = "light",
}: LogoProps) {
  const src =
    variant === "dark" ? siteConfig.logo.dark : siteConfig.logo.light;

  return (
    <Image
      src={src}
      alt={siteConfig.name}
      width={Math.round(height * LOGO_ASPECT)}
      height={height}
      priority={priority}
      className={cn("h-auto w-auto object-contain", className)}
      style={{ height, width: "auto" }}
    />
  );
}
