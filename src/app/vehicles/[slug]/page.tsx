import Link from "next/link";
import { notFound } from "next/navigation";
import { publicVehicles, getVehicleBySlug } from "@/lib/inventory";
import { money } from "@/lib/format";

export function generateStaticParams() {
  return publicVehicles.map((vehicle) => ({ slug: vehicle.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);
  return {
    title: vehicle ? `${vehicle.brand} ${vehicle.model} - New Vision OS` : "Vehicle - New Vision OS",
  };
}

export default async function VehicleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);
  if (!vehicle) notFound();

  return (
    <section className="section">
      <div className="container">
        <div className="hero">
          <div className="hero-panel">
            <img src={vehicle.image} alt={`${vehicle.brand} ${vehicle.model}`} />
          </div>
          <div>
            <div className="chip-row">
              <span className="chip">{vehicle.stockId}</span>
              <span className="chip">{vehicle.verificationStatus}</span>
              <span className="chip">{vehicle.supplierTier}</span>
            </div>
            <h1>{vehicle.year} {vehicle.brand} {vehicle.model}</h1>
            <p>{vehicle.condition === "new" ? "Brand new" : "Verified used"} {vehicle.bodyType} for China export quote. Sales confirms live photos, freight, docs, and availability before deposit.</p>
            <div className="stat-grid" style={{ margin: "18px 0" }}>
              <div className="stat-card"><b>{money(vehicle.fobPriceUsd)}</b><span>FOB China</span></div>
              <div className="stat-card"><b>{vehicle.mileageKm ?? 0} km</b><span>Mileage</span></div>
              <div className="stat-card"><b>{vehicle.powertrain}</b><span>Powertrain</span></div>
              <div className="stat-card"><b>{vehicle.rangeKm ?? "N/A"}</b><span>Range km</span></div>
            </div>
            <div className="row-actions">
              <Link className="button primary" href={`/quote?vehicle=${vehicle.slug}`}>Quote this vehicle</Link>
              <Link className="button ghost" href="/vehicles">Back to inventory</Link>
            </div>
          </div>
        </div>
        <div className="card-grid">
          {Object.entries(vehicle.specs).map(([key, value]) => (
            <div className="card" key={key}>
              <h3>{key}</h3>
              <p>{value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
