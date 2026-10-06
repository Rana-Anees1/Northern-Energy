"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

/**
 * The solar lead form that sits beside the hero.
 *
 * Field set mirrors the reference brief exactly, including the LANDLINE that
 * an earlier build missed. Posts to /api/contact, which already accepts the
 * optional `postcode` and `source` fields; the landline is folded into the
 * message body so it reaches the team without a route change (see below).
 */

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  landline: string;
  source: string;
  postcode: string;
  message: string;
}

const emptyForm: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  landline: "",
  source: "",
  postcode: "",
  message: "",
};

/** "How did you find us?" options. */
const sourceOptions = [
  "Google search",
  "Recommendation from a friend",
  "Social media",
  "Saw our showroom or van",
  "Trustpilot or a review site",
  "Existing customer",
  "Other",
] as const;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldErrors = Partial<Record<keyof FormState, string>>;

export function SolarLeadForm({ className }: { className?: string }) {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const update = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: FieldErrors = {};
    if (!form.firstName.trim()) next.firstName = "Please enter your first name.";
    if (!form.lastName.trim()) next.lastName = "Please enter your last name.";
    if (!form.email.trim()) next.email = "Please enter your email.";
    else if (!emailRe.test(form.email)) next.email = "Please enter a valid email address.";
    if (!form.mobile.trim()) next.mobile = "Please enter a mobile number.";
    if (!form.postcode.trim()) next.postcode = "Please enter your postcode.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate() || sending) return;
    setSending(true);
    setSendError(null);

    // The landline has no dedicated column in the enquiry email, so it is
    // prepended to the message. That keeps every detail in front of the team
    // without changing the shared /api/contact payload shape.
    const messageParts = [
      form.landline.trim() ? `Landline: ${form.landline.trim()}` : null,
      form.message.trim() || "(no additional details)",
    ].filter(Boolean);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.firstName.trim()} ${form.lastName.trim()}`.trim(),
          email: form.email.trim(),
          phone: form.mobile.trim(),
          enquiryType: "Residential Solar",
          message: messageParts.join("\n\n"),
          postcode: form.postcode.trim(),
          source: form.source.trim(),
        }),
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

  if (submitted) {
    return (
      <div
        className={cn(
          "rounded-2xl bg-white p-8 text-center shadow-card ring-1 ring-black/5",
          className,
        )}
      >
        <CheckCircle2 className="mx-auto h-14 w-14 text-green" aria-hidden />
        <h2 className="mt-4 text-2xl font-bold text-navy">
          Thanks, we&apos;ll reach out today.
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-muted">
          We have your details and one of our solar team will be in touch to start
          your remote design. If it is urgent, call us on{" "}
          <a href={siteConfig.phoneHref} className="font-semibold text-green">
            {siteConfig.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn(
        "rounded-2xl bg-white p-6 shadow-card ring-1 ring-black/5 sm:p-8",
        className,
      )}
    >
      <p className="eyebrow">Talk to us today</p>
      <h2 className="mt-2 text-2xl font-bold text-navy">Book a consultation</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Leave your details and one of our team will reach out to you the same day
        with the information you need to make an informed decision, in your own time.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field name="firstName" label="First Name" error={errors.firstName}>
          <input
            id="firstName"
            type="text"
            autoComplete="given-name"
            value={form.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            className={inputCls(errors.firstName)}
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
          />
        </Field>

        <Field name="lastName" label="Last Name" error={errors.lastName}>
          <input
            id="lastName"
            type="text"
            autoComplete="family-name"
            value={form.lastName}
            onChange={(e) => update("lastName", e.target.value)}
            className={inputCls(errors.lastName)}
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
          />
        </Field>

        <Field name="email" label="Email" error={errors.email} className="sm:col-span-2">
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputCls(errors.email)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
        </Field>

        <Field name="mobile" label="Mobile Number" error={errors.mobile}>
          <input
            id="mobile"
            type="tel"
            autoComplete="tel"
            value={form.mobile}
            onChange={(e) => update("mobile", e.target.value)}
            className={inputCls(errors.mobile)}
            aria-invalid={!!errors.mobile}
            aria-describedby={errors.mobile ? "mobile-error" : undefined}
          />
        </Field>

        <Field name="landline" label="Landline Number" optional>
          <input
            id="landline"
            type="tel"
            autoComplete="tel-national"
            value={form.landline}
            onChange={(e) => update("landline", e.target.value)}
            className={inputCls(undefined)}
          />
        </Field>

        <Field name="source" label="How did you find us?" optional>
          <select
            id="source"
            value={form.source}
            onChange={(e) => update("source", e.target.value)}
            className={inputCls(undefined)}
          >
            <option value="">Please choose...</option>
            {sourceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field name="postcode" label="Postcode" error={errors.postcode}>
          <input
            id="postcode"
            type="text"
            autoComplete="postal-code"
            value={form.postcode}
            onChange={(e) => update("postcode", e.target.value)}
            className={inputCls(errors.postcode)}
            aria-invalid={!!errors.postcode}
            aria-describedby={errors.postcode ? "postcode-error" : undefined}
          />
        </Field>

        <Field
          name="message"
          label="Is there anything else we need to know?"
          optional
          className="sm:col-span-2"
        >
          <textarea
            id="message"
            rows={4}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            className={cn(inputCls(undefined), "resize-none")}
          />
        </Field>
      </div>

      <p className="mt-5 text-xs leading-relaxed text-muted">
        {siteConfig.name} needs the contact information you provide to contact you
        about our products and services. By leaving your details you agree to our{" "}
        <a href="/privacy-policy" className="font-semibold text-green underline">
          privacy policy
        </a>
        . You may unsubscribe from these communications at any time.
      </p>

      {sendError ? (
        <p
          role="alert"
          className="mt-4 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {sendError}{" "}
          <a href={siteConfig.phoneHref} className="font-semibold underline">
            {siteConfig.phone}
          </a>
        </p>
      ) : null}

      <Button type="submit" variant="primary" size="lg" disabled={sending} className="mt-5 w-full">
        {sending ? "Sending..." : "Reach Out"}
        {sending ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        ) : (
          <Send className="h-4 w-4" aria-hidden />
        )}
      </Button>
    </form>
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
  optional = false,
  className,
  children,
}: {
  name: string;
  label: string;
  error?: string;
  optional?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-semibold leading-snug text-navy sm:min-h-[2.5rem]"
      >
        {label}
        {optional ? (
          <span className="ml-1 font-normal text-muted">(optional)</span>
        ) : null}
      </label>
      {children}
      {error ? (
        <span id={`${name}-error`} role="alert" className="mt-1 block text-xs text-red-500">
          {error}
        </span>
      ) : null}
    </div>
  );
}
