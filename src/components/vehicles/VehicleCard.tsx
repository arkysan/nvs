import Link from "next/link";
import type { Vehicle } from "@/lib/types";
import { money } from "@/lib/format";

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const cifPreview = vehicle.fobPriceUsd + 1030;

  return (
    <article className="vehicle-card" data-section={`vehicle-${vehicle.slug}`} data-section-label={`${vehicle.brand} ${vehicle.model}`}>
      <div className="vehicle-photo">
        <img src={vehicle.image} alt={`${vehicle.year} ${vehicle.brand} ${vehicle.model}`} />
      </div>
      <div className="vehicle-body">
        <div className="vehicle-brand" data-field="label">{vehicle.brand}</div>
        <div className="vehicle-name" data-field="title">{vehicle.year} {vehicle.model}</div>
        <div className="vehicle-meta">
          <span className="chip">{vehicle.stockId}</span>
          <span className="chip">{vehicle.condition === "new" ? "Brand new" : "Verified used"}</span>
          <span className="chip">{vehicle.powertrain}</span>
          <span className="chip">{vehicle.bodyType}</span>
        </div>
        <div className="vehicle-price">
          <div>
            <b>{money(vehicle.fobPriceUsd)}</b>
            <span>FOB China</span>
          </div>
          <div>
            <b>{money(cifPreview)}</b>
            <span>CIF est.</span>
          </div>
        </div>
        <div className="row-actions" style={{ marginTop: 12 }}>
          <Link className="button primary" href={`/quote?vehicle=${vehicle.slug}`}>Quote</Link>
          <Link className="button ghost" href={`/vehicles/${vehicle.slug}`}>View full deal</Link>
        </div>
      </div>
    </article>
  );
}
