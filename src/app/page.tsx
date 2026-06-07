import Link from "next/link";
import { DealerApplicationForm } from "@/components/forms/DealerApplicationForm";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { SectionTitle } from "@/components/site/SectionTitle";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { markets } from "@/data/markets";
import { publicVehicles } from "@/lib/inventory";

export default function HomePage() {
  const publicInventoryCount = publicVehicles.length;
  const featured = publicVehicles.slice(0, 6);
  const stats = [
    [String(publicInventoryCount), "Public inventory records in structured data"],
    [String(markets.length), "Year 1 priority markets in structured data"],
    ["Verified", "Supplier-first public inventory rule"],
    ["Static", "No live API or sourcing-lane estimate in V1"],
  ];

  return (
    <>
      <section className="container hero" id="top" data-section="home-hero" data-section-label="Home hero">
        <div>
          <h1 data-field="title">New Vision OS for verified China vehicle export.</h1>
          <p data-field="copy">
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
            <b data-field="label">Yiwu New Vision Car Export Company</b>
            <p data-field="cta">Green and smart travel focus since 2019. Full-chain export support from China to dealer markets.</p>
          </div>
        </div>
      </section>

      <section className="section compact" data-section="home-stats" data-section-label="Home stats">
        <div className="container stat-grid">
          {stats.map(([value, label]) => (
            <div className="stat-card" key={label} data-section={`stat-${value.toLowerCase().replace(/\W+/g, "-")}`} data-section-label={`${value} stat`}>
              <b data-field="title">{value}</b>
              <span data-field="copy">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="inventory" data-section="home-inventory" data-section-label="Home inventory">
        <div className="container">
          <SectionTitle title={`Verified Inventory (${publicInventoryCount})`} titleField="title" copyField="copy">
            The count and cards come from the structured public inventory filter. Pending, sold, hidden, and tier 3 internal vehicles are excluded.
          </SectionTitle>
          <div className="vehicle-grid">
            {featured.map((vehicle) => <VehicleCard key={vehicle.id} vehicle={vehicle} />)}
          </div>
          <div className="row-actions" style={{ marginTop: 18, justifyContent: "center" }}>
            <Link className="button primary" href="/vehicles">Open {publicInventoryCount} public records</Link>
          </div>
        </div>
      </section>

      <section className="section compact" data-section="home-markets" data-section-label="Home markets">
        <div className="container">
          <SectionTitle title="Year 1 Market Focus" titleField="title" copyField="copy">
            NEV first in Ethiopia, Egypt, and Nigeria. ICE first in Algeria and Guinea.
          </SectionTitle>
          <div className="market-grid">
            {markets.map((market) => (
              <Link className="card" href={`/markets/${market.slug}`} key={market.slug} data-section={`market-${market.slug}`} data-section-label={`${market.name} market card`}>
                <h3 data-field="title">{market.name}</h3>
                <p data-field="copy">{market.region}</p>
                <span className="chip" data-field="label">{market.focus}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" data-section="home-operating-system" data-section-label="Operating system">
        <div className="container">
          <SectionTitle title="Export Operating System" titleField="title" copyField="copy">
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

      <section className="section" id="quote" data-section="home-quote" data-section-label="Home quote CTA">
        <div className="container">
          <SectionTitle title="Request a Quote" titleField="title" copyField="copy">
            Generate a buyer-ready WhatsApp message now. Save-to-database can be added later without changing the public flow.
          </SectionTitle>
          <QuoteForm />
        </div>
      </section>

      <section className="section compact" data-section="home-dealer" data-section-label="Home dealer application">
        <div className="container">
          <SectionTitle title="Dealer Application" titleField="title" copyField="copy">
            Start recruiting serious regional dealers while the full portal stays in a later phase.
          </SectionTitle>
          <DealerApplicationForm />
        </div>
      </section>
    </>
  );
}
