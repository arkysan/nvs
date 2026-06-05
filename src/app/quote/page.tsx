import { Suspense } from "react";
import { QuotePageForm } from "@/components/forms/QuotePageForm";
import { SectionTitle } from "@/components/site/SectionTitle";

export const metadata = {
  title: "Request a Quote - New Vision OS",
};

export default function QuotePage() {
  return (
    <section className="section">
      <div className="container">
        <SectionTitle title="Request a Quote">
          Collect buyer details, preview FOB to CIF, then send a structured WhatsApp request. WeChat and phone remain visible for China-safe fallback.
        </SectionTitle>
        <Suspense fallback={<div className="form-card">Loading quote form...</div>}>
          <QuotePageForm />
        </Suspense>
      </div>
    </section>
  );
}
