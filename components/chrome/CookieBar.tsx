"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Cookie } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function CookieBar() {
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-[70] bg-navy text-white shadow-soft"
          role="region"
          aria-label="Cookie consent"
          initial={reduceMotion ? { opacity: 0 } : { y: "100%" }}
          animate={reduceMotion ? { opacity: 1 } : { y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { y: "100%" }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <Container className="flex flex-wrap items-center justify-between gap-3 py-3">
            <p className="flex items-center gap-2 text-sm text-white/85">
              <Cookie className="h-4 w-4 shrink-0 text-green" aria-hidden="true" />
              <span>
                We use cookies to give you the best experience on our website.
              </span>
            </p>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setVisible(false)}
            >
              Ok
            </Button>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
