"use client";

import { useMemo, useState } from "react";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import type { Vehicle } from "@/lib/types";

export function InventoryExplorer({ vehicles }: { vehicles: Vehicle[] }) {
  const [brand, setBrand] = useState("All");
  const [powertrain, setPowertrain] = useState("All");
  const [condition, setCondition] = useState("All");
  const [sort, setSort] = useState("latest");

  const brands = ["All", ...Array.from(new Set(vehicles.map((vehicle) => vehicle.brand))).sort()];
  const powertrains = ["All", ...Array.from(new Set(vehicles.map((vehicle) => vehicle.powertrain))).sort()];

  const visible = useMemo(() => {
    const filtered = vehicles.filter((vehicle) => {
      return (
        (brand === "All" || vehicle.brand === brand) &&
        (powertrain === "All" || vehicle.powertrain === powertrain) &&
        (condition === "All" || vehicle.condition === condition)
      );
    });
    return filtered.sort((a, b) => {
      if (sort === "price-low") return a.fobPriceUsd - b.fobPriceUsd;
      if (sort === "price-high") return b.fobPriceUsd - a.fobPriceUsd;
      return b.year - a.year;
    });
  }, [brand, condition, powertrain, sort, vehicles]);

  return (
    <section>
      <div className="filters">
        <div className="form-grid">
          <label>
            Brand
            <select value={brand} onChange={(event) => setBrand(event.target.value)}>
              {brands.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label>
            Powertrain
            <select value={powertrain} onChange={(event) => setPowertrain(event.target.value)}>
              {powertrains.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label>
            Condition
            <select value={condition} onChange={(event) => setCondition(event.target.value)}>
              <option>All</option>
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>
          </label>
          <label>
            Sort
            <select value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="latest">Latest arrivals</option>
              <option value="price-low">Price low to high</option>
              <option value="price-high">Price high to low</option>
            </select>
          </label>
        </div>
        <div className="notice">Public rule active: only available, verified vehicles from tier 1 or tier 2 suppliers are shown.</div>
      </div>
      <div className="vehicle-grid" id="vehicleGrid">
        {visible.map((vehicle) => <VehicleCard key={vehicle.id} vehicle={vehicle} />)}
      </div>
    </section>
  );
}
