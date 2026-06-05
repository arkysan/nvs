import Link from "next/link";
import { SectionTitle } from "@/components/site/SectionTitle";

export const metadata = {
  title: "Services - New Vision OS",
};

export default function ServicesPage() {
  const services = [
    ["Vehicle sourcing", "Verified supplier lanes, public stock rules, and dealer-ready vehicle lists."],
    ["Export documents", "Commercial invoice, packing list, certificate of origin, export declaration, and B/L coordination."],
    ["Inspection support", "Photo/video proof, live call, and third-party inspection planning before deposit."],
    ["Logistics estimate", "FOB to CIF estimate with port, freight, inspection, and document assumptions."],
  ];

  return (
    <section className="section">
      <div className="container">
        <SectionTitle title="Export Services">
          Keep the public site useful even before full backend automation ships.
        </SectionTitle>
        <div className="card-grid">
          {services.map(([title, copy]) => <div className="card" key={title}><h3>{title}</h3><p>{copy}</p></div>)}
        </div>
        <div className="row-actions" style={{ marginTop: 18, justifyContent: "center" }}>
          <Link className="button primary" href="/quote">Start quote</Link>
        </div>
      </div>
    </section>
  );
}
