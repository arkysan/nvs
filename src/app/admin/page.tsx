import Link from "next/link";
import { SectionTitle } from "@/components/site/SectionTitle";
import { dealerApplications, sampleInquiries } from "@/data/inquiries";
import { suppliers } from "@/data/suppliers";
import { vehicles } from "@/data/vehicles";
import { publicVehicles } from "@/lib/inventory";

export const metadata = {
  title: "Admin Lite - New Vision OS",
};

export default function AdminPage() {
  const cards = [
    ["Vehicles", vehicles.length, "/admin/vehicles", "All stock records including internal guard fixtures."],
    ["Public stock", publicVehicles.length, "/vehicles", "Available + verified + not tier 3 internal."],
    ["Suppliers", suppliers.length, "/admin/suppliers", "Supplier verification tiers and checklist state."],
    ["Inquiries", sampleInquiries.length, "/admin/inquiries", "Static sample quote records until backend ships."],
    ["Dealers", dealerApplications.length, "/admin/dealers", "Dealer application queue for Year 1 markets."],
    ["Privacy", "Local", "/privacy-mode", "Local browser privacy switch and honest external-sharing boundaries."],
    ["Review", "Local", "/admin/review", "Local-only visual notes, content preview, vehicle draft notes, and handoff export."],
  ] as const;

  return (
    <section className="section">
      <div className="container">
        <SectionTitle title="Admin Lite">
          Static internal review pages. This is not full auth, CRM, or Supabase yet.
        </SectionTitle>
        <div className="notice" style={{ marginBottom: 18 }}>
          V1 admin is a local/static operating board for development. Do not treat it as private production storage.
        </div>
        <div className="admin-grid">
          {cards.map(([title, count, href, copy]) => (
            <Link className="admin-card" key={title} href={href}>
              <h3>{title}</h3>
              <p><b>{count}</b> records</p>
              <p>{copy}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
