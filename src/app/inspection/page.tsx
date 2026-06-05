import Link from "next/link";
import { SectionTitle } from "@/components/site/SectionTitle";

export const metadata = {
  title: "Inspection - New Vision OS",
};

export default function InspectionPage() {
  return (
    <section className="section">
      <div className="container">
        <SectionTitle title="Pre-Export Inspection">
          Honest proof before deposit protects New Vision, dealers, suppliers, and buyers.
        </SectionTitle>
        <div className="card-grid">
          <div className="card"><h3>Photo/video proof</h3><p>Current stock photos, VIN/stock ID confirmation, and walkaround video when available.</p></div>
          <div className="card"><h3>Live video call</h3><p>Buyer or dealer can request a real-time vehicle view before final quote.</p></div>
          <div className="card"><h3>Third-party report</h3><p>Optional inspection package for condition, documents, and export readiness.</p></div>
        </div>
        <div className="row-actions" style={{ marginTop: 18, justifyContent: "center" }}>
          <Link className="button primary" href="/quote">Request inspection quote</Link>
        </div>
      </div>
    </section>
  );
}
