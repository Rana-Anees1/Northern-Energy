import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";
import { servicePages } from "@/lib/content";

export const metadata: Metadata = {
  title: servicePages["/eco4-grants"].title,
  description: servicePages["/eco4-grants"].intro.body.slice(0, 150),
};

export default function Page() {
  return <ServicePageTemplate page={servicePages["/eco4-grants"]} />;
}
