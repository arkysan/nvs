import Link from "next/link";
import { DealerApplicationForm } from "@/components/forms/DealerApplicationForm";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { SectionTitle } from "@/components/site/SectionTitle";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { markets } from "@/data/markets";
import { publicVehicles } from "@/lib/inventory";

const stats = [
  ["3,200+", "Vehicles available through sourcing lanes"],
  ["50+", "Countries served by the export network"],
  ["5", "Year 1 priority markets"],
  ["Verified", "Supplier-first public inventory rule"],
];

export default function HomePage() {
  const featured = publicVehicles.slice(0, 6);

  return (
    <>
      <section className="container hero" id="top">
        <div>
          <h1>New Vision OS for verified China vehicle export.</h1>
          <p>
            A static-first platform for New Vision buyers, dealers, suppliers, quotes, and Year 1 market growth.
            Built to work globally and stay useful in China-safe mode without depending on Google, Supabase, or live APIs.
          </p>
          <div className="hero-actions">
            <Link className="button primary" href="/vehicles">Browse verified stock</Link>
            <Link className="button gold" href="/quote">Request quote</Link>
            <Link className="button ghost" href="/dealer-program">Dealer program</Link>
          </div>
        </div>
        <div className="hero-panel">
          <img src="/showroom-900.webp" alt="New Vision showroom and export office" />
          <div className="hero-panel-copy">
            <b>Yiwu New Vision Car Export Company</b>
            <p>Green and smart travel focus since 2019. Full-chain export support from China to dealer markets.</p>
          </div>
        </div>
      </section>

      <section className="section compact">
        <div className="container stat-grid">
          {stats.map(([value, label]) => (
            <div className="stat-card" key={label}>
              <b>{value}</b>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="inventory">
        <div className="container">
          <SectionTitle title="Verified Inventory">
            Public cards come from structured data and exclude pending, sold, hidden, and tier 3 internal supplier vehicles.
          </SectionTitle>
          <div className="vehicle-grid">
            {featured.map((vehicle) => <VehicleCard key={vehicle.id} vehicle={vehicle} />)}
          </div>
          <div className="row-actions" style={{ marginTop: 18, justifyContent: "center" }}>
            <Link className="button primary" href="/vehicles">Open all inventory</Link>
          </div>
        </div>
      </section>

      <section className="section compact">
        <div className="container">
          <SectionTitle title="Year 1 Market Focus">
            NEV first in Ethiopia, Egypt, and Nigeria. ICE first in Algeria and Guinea.
          </SectionTitle>
          <div className="market-grid">
            {markets.map((market) => (
              <Link className="card" href={`/markets/${market.slug}`} key={market.slug}>
                <h3>{market.name}</h3>
                <p>{market.region}</p>
                <span className="chip">{market.focus}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle title="Export Operating System">
            One codebase, two deployment paths, static public website first, database and automation later.
          </SectionTitle>
          <div className="card-grid">
            {[
              ["Verified sourcing", "Supplier tiers, verification status, risk labels, and hidden internal evaluation lanes."],
              ["Quote engine", "FOB, freight, inspection/docs, CIF preview, WhatsApp handoff, and WeChat/phone fallback."],
              ["Dealer growth", "Market-specific pages and dealer applications for the five Year 1 countries."],
            ].map(([title, copy]) => (
              <div className="card" key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="quote">
        <div className="container">
          <SectionTitle title="Request a Quote">
            Generate a buyer-ready WhatsApp message now. Save-to-database can be added later without changing the public flow.
          </SectionTitle>
          <QuoteForm />
        </div>
      </section>

      <section className="section compact">
        <div className="container">
          <SectionTitle title="Dealer Application">
            Start recruiting serious regional dealers while the full portal stays in a later phase.
          </SectionTitle>
          <DealerApplicationForm />
        </div>
      </section>
    </>
  );
}
