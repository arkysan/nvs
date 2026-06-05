import { AdminTable } from "@/components/admin/AdminTable";
import { SectionTitle } from "@/components/site/SectionTitle";
import { vehicles } from "@/data/vehicles";
import { isPublicVehicle } from "@/lib/inventory";
import { money } from "@/lib/format";

export const metadata = {
  title: "Admin Vehicles - New Vision OS",
};

export default function AdminVehiclesPage() {
  return (
    <section className="section">
      <div className="container">
        <SectionTitle title="Vehicle Management">
          Static V1 board showing why each vehicle is public or internal.
        </SectionTitle>
        <AdminTable
          headers={["Stock", "Vehicle", "FOB", "Supplier tier", "Availability", "Verification", "Public"]}
          rows={vehicles.map((vehicle) => [
            vehicle.stockId,
            `${vehicle.year} ${vehicle.brand} ${vehicle.model}`,
            money(vehicle.fobPriceUsd),
            vehicle.supplierTier,
            vehicle.availability,
            vehicle.verificationStatus,
            isPublicVehicle(vehicle) ? "yes" : "no",
          ])}
        />
      </div>
    </section>
  );
}
