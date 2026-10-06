import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Home, Mail } from "lucide-react";

export default function NotFound() {
  return (
    <Section tone="light">
      <Container size="narrow" className="flex min-h-[70vh] flex-col items-center justify-center text-center">
        <p className="text-7xl font-bold tracking-tight text-navy sm:text-8xl">404</p>
        <h1 className="mt-4 text-2xl font-semibold text-navy sm:text-3xl">
          Page not found
        </h1>
        <p className="mt-4 max-w-md text-muted">
          Sorry, we couldn&apos;t find the page you were looking for. It may have
          moved, or the link might be out of date. Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Button href="/" variant="primary">
            <Home className="h-4 w-4" aria-hidden="true" />
            Back to home
          </Button>
          <Button href="/contact" variant="outline">
            <Mail className="h-4 w-4" aria-hidden="true" />
            Contact us
          </Button>
        </div>
      </Container>
    </Section>
  );
}
