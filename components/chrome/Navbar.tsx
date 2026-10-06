"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";

import { siteConfig } from "@/lib/siteConfig";
import { cn } from "@/lib/cn";
import { MegaMenu } from "@/components/chrome/MegaMenu";
import { Logo } from "@/components/chrome/Logo";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-9 z-30 transition-colors duration-300",
          scrolled
            ? "bg-white text-navy shadow-md"
            : "bg-transparent text-white",
        )}
      >
        <div className="mx-auto grid h-20 w-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-4 sm:h-24 sm:px-6 lg:px-8">
          {/* LEFT: branch hint (decorative) */}
          <div className="hidden items-center sm:flex">
            <span className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wide opacity-70">
              Eng
              <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </div>

          {/* CENTER: logo */}
          <Link
            href="/"
            className="col-start-2 flex items-center justify-center"
            aria-label={`${siteConfig.name} home`}
          >
            <Logo
              height={72}
              priority
              variant={scrolled ? "dark" : "light"}
              className="max-w-[min(100%,22rem)] sm:max-w-md lg:max-w-lg xl:max-w-xl"
            />
          </Link>

          {/* RIGHT: hamburger */}
          <div className="col-start-3 flex items-center justify-end">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="inline-flex items-center justify-center rounded-md p-2 transition-colors hover:text-green focus:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <MegaMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
