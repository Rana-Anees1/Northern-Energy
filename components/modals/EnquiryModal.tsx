"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, CheckCircle2, Send, Loader2 } from "lucide-react";
import { enquiryOptions } from "@/lib/content";
import { siteConfig } from "@/lib/siteConfig";
import { getLenis } from "@/components/providers/SmoothScroll";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

interface FormState {
  name: string;
  email: string;
  phone: string;
  enquiryType: string;
  message: string;
}

const emptyForm: FormState = {
  name: "",
  email: "",
  phone: "",
  enquiryType: enquiryOptions[0],
  message: "",
};

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function EnquiryModal({
  open,
  onClose,
  prefillType,
}: {
  open: boolean;
  onClose: () => void;
  prefillType?: string;
}) {
  const reduce = useReducedMotion();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  // Sync prefill + reset state whenever the modal opens
  useEffect(() => {
    if (open) {
      setForm({
        ...emptyForm,
        enquiryType:
          prefillType && (enquiryOptions as readonly string[]).includes(prefillType)
            ? prefillType
            : emptyForm.enquiryType,
      });
      setErrors({});
      setSubmitted(false);
      setSending(false);
      setSendError(null);
    }
  }, [open, prefillType]);

  // Body scroll lock + Esc to close + initial focus
  useEffect(() => {
    if (!open) return;
    openerRef.current = (document.activeElement as HTMLElement | null) ?? null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    getLenis()?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => firstFieldRef.current?.focus(), 60);
    return () => {
      document.body.style.overflow = prevOverflow;
      getLenis()?.start();
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
      openerRef.current?.focus?.();
    };
  }, [open, onClose]);

  const update = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) next.email = "Please enter your email.";
    else if (!emailRe.test(form.email)) next.email = "Please enter a valid email address.";
    if (!form.phone.trim()) next.phone = "Please enter a phone number.";
    if (!form.message.trim()) next.message = "Please tell us a little about your enquiry.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // Posts to /api/contact, which emails the team via Resend and sends the
  // visitor a confirmation. Errors are surfaced so an enquiry is never
  // silently lost: the visitor is told to call instead.
  const handleSubmit = async () => {
    if (!validate() || sending) return;
    setSending(true);
    setSendError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setSendError(data.error || "Something went wrong. Please try again or call us.");
        return;
      }
      setSubmitted(true);
    } catch {
      setSendError("We could not reach the server. Please check your connection or call us.");
    } finally {
      setSending(false);
    }
  };

  // Focus trap within the dialog
  const onKeyDownTrap = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !dialogRef.current) return;
    const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="enquiry-modal"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="enquiry-title"
          onKeyDown={onKeyDownTrap}
        >
          <motion.div
            className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            ref={dialogRef}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-card"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close enquiry form"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full text-navy/60 transition-colors hover:bg-surface hover:text-navy"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>

            <div className="max-h-[88vh] overflow-y-auto p-6 sm:p-8">
              {submitted ? (
                <div className="py-8 text-center">
                  <CheckCircle2 className="mx-auto h-14 w-14 text-green" aria-hidden />
                  <h2 id="enquiry-title" className="mt-4 text-2xl font-bold text-navy">
                    Thanks, we&apos;ll be in touch shortly.
                  </h2>
                  <p className="mx-auto mt-3 max-w-sm text-muted">
                    We&apos;ve received your enquiry and a member of the team will get back
                    to you as soon as possible.
                  </p>
                  <div className="mt-6 flex justify-center">
                    <Button variant="primary" onClick={onClose}>
                      Close
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="eyebrow mb-2">Enquiry</p>
                  <h2 id="enquiry-title" className="text-2xl font-bold text-navy">
                    Get in touch
                  </h2>
                  <p className="mt-2 text-sm text-muted">
                    Tell us a little about your project and we&apos;ll get back to you with
                    tailored, no-obligation advice. Or call us on{" "}
                    <a href={siteConfig.phoneHref} className="font-semibold text-green">
                      {siteConfig.phone}
                    </a>
                    .
                  </p>

                  <div className="mt-6 space-y-4" onKeyDown={(e) => {
                    if (e.key === "Enter" && (e.target as HTMLElement).tagName !== "TEXTAREA") {
                      e.preventDefault();
                      handleSubmit();
                    }
                  }}>
                    <Field name="name" label="Name" error={errors.name}>
                      <input
                        ref={firstFieldRef}
                        type="text"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        className={inputCls(errors.name)}
                        placeholder="Your name"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                      />
                    </Field>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field name="email" label="Email" error={errors.email}>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          className={inputCls(errors.email)}
                          placeholder="you@example.com"
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? "email-error" : undefined}
                        />
                      </Field>
                      <Field name="phone" label="Phone" error={errors.phone}>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          className={inputCls(errors.phone)}
                          placeholder="Your phone number"
                          aria-invalid={!!errors.phone}
                          aria-describedby={errors.phone ? "phone-error" : undefined}
                        />
                      </Field>
                    </div>

                    <Field name="enquiryType" label="Enquiry type">
                      <select
                        value={form.enquiryType}
                        onChange={(e) => update("enquiryType", e.target.value)}
                        className={inputCls(undefined)}
                      >
                        {enquiryOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field name="message" label="Message" error={errors.message}>
                      <textarea
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        rows={4}
                        className={cn(inputCls(errors.message), "resize-none")}
                        placeholder="How can we help?"
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? "message-error" : undefined}
                      />
                    </Field>

                    {sendError ? (
                      <p
                        role="alert"
                        className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700"
                      >
                        {sendError}{" "}
                        <a href={siteConfig.phoneHref} className="font-semibold underline">
                          {siteConfig.phone}
                        </a>
                      </p>
                    ) : null}

                    <Button
                      variant="primary"
                      onClick={handleSubmit}
                      disabled={sending}
                      className="w-full"
                    >
                      {sending ? "Sending..." : "Send enquiry"}
                      {sending ? (
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                      ) : (
                        <Send className="h-4 w-4" aria-hidden />
                      )}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function inputCls(error?: string) {
  return cn(
    "w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-ink placeholder:text-muted/70 transition-colors focus:outline-none focus:ring-2 focus:ring-green/40",
    error ? "border-red-400" : "border-navy/15 focus:border-green",
  );
}

function Field({
  name,
  label,
  error,
  children,
}: {
  name: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-navy">{label}</span>
      {children}
      {error && (
        <span
          id={`${name}-error`}
          role="alert"
          className="mt-1 block text-xs text-red-500"
        >
          {error}
        </span>
      )}
    </label>
  );
}
