import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionTitle } from "@/components/site/SectionTitle";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { markets } from "@/data/markets";
import { shippingRoutes } from "@/data/routes";
import { getVehiclesForMarket } from "@/lib/inventory";

export function generateStaticParams() {
  return markets.map((market) => ({ slug: market.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const market = markets.find((item) => item.slug === slug);
  return {
    title: market ? `${market.name} Market - New Vision OS` : "Market - New Vision OS",
  };
}

export default async function MarketPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const market = markets.find((item) => item.slug === slug);
  if (!market) notFound();
  const vehicles = getVehiclesForMarket(market.slug);
  const routes = shippingRoutes.filter((route) => route.marketSlug === market.slug);

  return (
    <>
      <section className="section">
        <div className="container">
          <SectionTitle title={`${market.name} Export Lane`}>
            {market.focus} priority market in {market.region}. Language priority: {market.languagePriority.join(", ")}.
          </SectionTitle>
          <div className="card-grid">
            <div className="card"><h3>Recommended vehicles</h3><p>{market.recommendedVehicles.join(", ")}</p></div>
            <div className="card"><h3>Primary ports</h3><p>{market.primaryPorts.join(", ")}</p></div>
            <div className="card"><h3>Buyer guidance</h3><p>{market.buyerGuidance}</p></div>
          </div>
          <div className="row-actions" style={{ marginTop: 18, justifyContent: "center" }}>
            <Link className="button primary" href="/quote">Request quote</Link>
            <Link className="button gold" href="/dealer-program">Apply as dealer</Link>
          </div>
        </div>
      </section>
      <section className="section compact">
        <div className="container">
          <SectionTitle title={`Recommended ${market.name} Stock`} />
          <div className="vehicle-grid">
            {vehicles.map((vehicle) => <VehicleCard key={vehicle.id} vehicle={vehicle} />)}
          </div>
        </div>
      </section>
      <section className="section compact">
        <div className="container">
          <SectionTitle title="Route Notes" />
          <div className="card-grid">
            {routes.map((route) => (
              <div className="card" key={route.id}>
                <h3>{route.origin} to {route.destination}</h3>
                <p>{route.transitDays}. {route.notes}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
