import { SectionTitle } from "@/components/site/SectionTitle";
import { InventoryExplorer } from "@/components/vehicles/InventoryExplorer";
import { publicVehicles } from "@/lib/inventory";

export const metadata = {
  title: "Verified Vehicles - New Vision OS",
};

export default function VehiclesPage() {
  return (
    <section className="section">
      <div className="container">
        <SectionTitle title={`Vehicle Inventory (${publicVehicles.length})`}>
          Static public stock with live-ready data structure. Only available, verified, non-tier-3 vehicles render here.
        </SectionTitle>
        <InventoryExplorer vehicles={publicVehicles} />
      </div>
    </section>
  );
}
