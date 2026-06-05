import Link from "next/link";
import { SectionTitle } from "@/components/site/SectionTitle";
import { shippingRoutes } from "@/data/routes";

export const metadata = {
  title: "Shipping - New Vision OS",
};

export default function ShippingPage() {
  return (
    <section className="section">
      <div className="container">
        <SectionTitle title="Shipping Route Preview">
          Static route estimates for customer guidance. Sales confirms real vessel schedule, freight, insurance, and final CIF before deposit.
        </SectionTitle>
        <div className="card-grid">
          {shippingRoutes.map((route) => (
            <div className="card" key={route.id}>
              <h3>{route.destination}</h3>
              <p>{route.origin} - {route.transitDays}</p>
              <p>{route.notes}</p>
            </div>
          ))}
        </div>
        <div className="row-actions" style={{ marginTop: 18, justifyContent: "center" }}>
          <Link className="button primary" href="/quote">Quote a route</Link>
        </div>
      </div>
    </section>
  );
}
