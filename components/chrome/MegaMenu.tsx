"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { images } from "@/lib/assets";
import { Container } from "@/components/ui/Container";
import { SmartImage } from "@/components/ui/SmartImage";
import { getLenis } from "@/components/providers/SmoothScroll";
import { cn } from "@/lib/cn";

interface MegaMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MegaMenu({ open, onClose }: MegaMenuProps) {
  const reduceMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  // Lock body scroll while the menu is open; restore on close/unmount.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    getLenis()?.stop();
    return () => {
      document.body.style.overflow = previous;
      getLenis()?.start();
    };
  }, [open]);

  // Close on Escape, capture the opener, move focus into the menu, and restore
  // focus to the opener when the menu closes.
  useEffect(() => {
    if (!open) return;
    openerRef.current = (document.activeElement as HTMLElement | null) ?? null;
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      openerRef.current?.focus?.();
    };
  }, [open, onClose]);

  // Trap Tab focus within the open menu (mirrors EnquiryModal).
  const handleKeyDownTrap = (event: React.KeyboardEvent) => {
    if (event.key !== "Tab" || !panelRef.current) return;
    const focusable = panelRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  // Reset accordion state whenever the menu fully closes.
  useEffect(() => {
    if (!open) setOpenGroups({});
  }, [open]);

  const toggleGroup = (label: string) =>
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));

  const overlayVariants = reduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        hidden: { opacity: 0, y: -24 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -24 },
      };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mega-menu"
          ref={panelRef}
          onKeyDown={handleKeyDownTrap}
          role="dialog"
          aria-modal="true"
          aria-label="Main menu"
          className="fixed inset-0 z-[90] overflow-y-auto bg-white text-ink"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: reduceMotion ? 0.15 : 0.3, ease: "easeOut" }}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full text-navy transition-colors hover:bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-green sm:right-6 sm:top-6"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>

          <Container className="py-20 sm:py-24 lg:py-28">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
              {/* Navigation */}
              <nav aria-label="Site sections">
                {/* Desktop: multi-column grid */}
                <ul className="hidden gap-x-10 gap-y-12 lg:grid lg:grid-cols-3">
                  {siteConfig.nav.map((group) => (
                    <li key={group.label}>
                      {group.href ? (
                        <Link
                          href={group.href}
                          onClick={onClose}
                          className="text-lg font-semibold text-navy transition-colors hover:text-green"
                        >
                          {group.label}
                        </Link>
                      ) : (
                        <span className="text-lg font-semibold text-navy">
                          {group.label}
                        </span>
                      )}
                      {group.children && (
                        <ul className="mt-4 space-y-3">
                          {group.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={onClose}
                                className="text-muted transition-colors hover:text-green"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>

                {/* Mobile: single-column accordion */}
                <ul className="flex flex-col divide-y divide-black/5 lg:hidden">
                  {siteConfig.nav.map((group) => {
                    const hasChildren =
                      !!group.children && group.children.length > 0;
                    const isExpanded = !!openGroups[group.label];

                    if (!hasChildren) {
                      return (
                        <li key={group.label}>
                          {group.href ? (
                            <Link
                              href={group.href}
                              onClick={onClose}
                              className="block py-4 text-lg font-semibold text-navy transition-colors hover:text-green"
                            >
                              {group.label}
                            </Link>
                          ) : (
                            <span className="block py-4 text-lg font-semibold text-navy">
                              {group.label}
                            </span>
                          )}
                        </li>
                      );
                    }

                    return (
                      <li key={group.label}>
                        <button
                          type="button"
                          onClick={() => toggleGroup(group.label)}
                          aria-expanded={isExpanded}
                          className="flex w-full items-center justify-between py-4 text-left text-lg font-semibold text-navy"
                        >
                          <span>{group.label}</span>
                          <ChevronDown
                            className={cn(
                              "h-5 w-5 shrink-0 text-green transition-transform duration-200",
                              isExpanded && "rotate-180"
                            )}
                            aria-hidden="true"
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={
                                reduceMotion
                                  ? { opacity: 0 }
                                  : { height: 0, opacity: 0 }
                              }
                              animate={
                                reduceMotion
                                  ? { opacity: 1 }
                                  : { height: "auto", opacity: 1 }
                              }
                              exit={
                                reduceMotion
                                  ? { opacity: 0 }
                                  : { height: 0, opacity: 0 }
                              }
                              transition={{ duration: 0.25, ease: "easeOut" }}
                              className="overflow-hidden"
                            >
                              <ul className="space-y-3 pb-4 pl-1">
                                {group.children?.map((child) => (
                                  <li key={child.href}>
                                    <Link
                                      href={child.href}
                                      onClick={onClose}
                                      className="block text-muted transition-colors hover:text-green"
                                    >
                                      {child.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </li>
                    );
                  })}
                </ul>

                {/* Bottom-left contact details */}
                <div className="mt-12 flex flex-col gap-2 border-t border-black/5 pt-8 text-sm sm:flex-row sm:gap-8">
                  <a
                    href={siteConfig.emailHref}
                    onClick={onClose}
                    className="font-medium text-navy transition-colors hover:text-green"
                  >
                    {siteConfig.email}
                  </a>
                  <a
                    href={siteConfig.phoneHref}
                    onClick={onClose}
                    className="font-medium text-navy transition-colors hover:text-green"
                  >
                    {siteConfig.phone}
                  </a>
                </div>
              </nav>

              {/* Feature image */}
              <div className="hidden lg:block">
                <div className="aspect-[3/4] overflow-hidden rounded-2xl">
                  <SmartImage
                    src={images.house}
                    alt="Modern home with rooftop solar"
                    className="h-full w-full"
                    imgClassName="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
