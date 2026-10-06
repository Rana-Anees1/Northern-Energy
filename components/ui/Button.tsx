import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "navy" | "outline" | "outlineLight" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 will-change-transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-green text-white shadow-soft hover:bg-green-dark",
  navy: "bg-navy text-white hover:bg-navy-deep shadow-soft",
  outline: "border border-navy/25 text-navy hover:border-green hover:text-green",
  outlineLight:
    "border border-white/40 text-white hover:bg-white hover:text-navy",
  ghost: "text-green hover:text-green-dark",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

type AsLink = CommonProps & {
  href: string;
  onClick?: never;
  type?: never;
  external?: boolean;
  disabled?: never;
};

type AsButton = CommonProps & {
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit";
  external?: never;
  /** Disables the button; base styles already cover the disabled look. */
  disabled?: boolean;
};

export function Button(props: AsLink | AsButton) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    if (props.external) {
      return (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
