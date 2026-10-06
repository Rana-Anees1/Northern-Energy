"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { EnquiryModal } from "@/components/modals/EnquiryModal";

interface EnquiryContextValue {
  /** Open the enquiry modal, optionally pre-selecting an enquiry type. */
  openEnquiry: (prefillType?: string) => void;
  closeEnquiry: () => void;
  isOpen: boolean;
}

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [prefill, setPrefill] = useState<string | undefined>(undefined);

  const openEnquiry = useCallback((prefillType?: string) => {
    setPrefill(prefillType);
    setIsOpen(true);
  }, []);

  const closeEnquiry = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ openEnquiry, closeEnquiry, isOpen }),
    [openEnquiry, closeEnquiry, isOpen],
  );

  return (
    <EnquiryContext.Provider value={value}>
      {children}
      <EnquiryModal open={isOpen} onClose={closeEnquiry} prefillType={prefill} />
    </EnquiryContext.Provider>
  );
}

export function useEnquiry(): EnquiryContextValue {
  const ctx = useContext(EnquiryContext);
  if (!ctx) {
    throw new Error("useEnquiry must be used within an EnquiryProvider");
  }
  return ctx;
}
