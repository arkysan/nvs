import Link from "next/link";
import { SectionTitle } from "@/components/site/SectionTitle";

export const metadata = {
  title: "Review Mode - New Vision OS",
};

export default function ReviewPage() {
  return (
    <section className="section" data-section="review-console" data-section-label="Review console">
      <div className="container">
        <SectionTitle title="Review Mode" titleField="title" copyField="copy">
          Local editor, annotations, vehicle draft notes, and handoff export. This page does not create production auth, APIs, CRM writes, or public inventory changes.
        </SectionTitle>
        <div className="notice" style={{ marginBottom: 18 }}>
          Review Mode uses browser localStorage. Open the panel on this page or append <b>?review=1</b> to a public page to review marked sections. For sensitive review, turn on <Link href="/privacy-mode"><b>Privacy Mode</b></Link> first.
        </div>
        <div className="card-grid">
          <Link className="card" href="/?review=1">
            <h3>Review homepage</h3>
            <p>Open the public homepage with the editor panel active.</p>
          </Link>
          <Link className="card" href="/vehicles?review=1">
            <h3>Review inventory</h3>
            <p>Check vehicle cards while preserving the verified-only public guard.</p>
          </Link>
          <Link className="card" href="/quote?review=1">
            <h3>Review quote flow</h3>
            <p>Validate copy around the WhatsApp and WeChat handoff path.</p>
          </Link>
        </div>
      </div>
    </section>
  );
}
