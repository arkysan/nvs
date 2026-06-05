import { vehicles } from "@/data/vehicles";
import type { Vehicle } from "@/lib/types";

export function isPublicVehicle(vehicle: Vehicle): boolean {
  return (
    vehicle.availability === "available" &&
    vehicle.verificationStatus === "verified" &&
    vehicle.supplierTier !== "tier_3_internal"
  );
}

export const publicVehicles = vehicles.filter(isPublicVehicle);

export function getVehicleBySlug(slug: string): Vehicle | undefined {
  return publicVehicles.find((vehicle) => vehicle.slug === slug);
}

export function getVehiclesForMarket(marketSlug: string): Vehicle[] {
  return publicVehicles.filter((vehicle) => vehicle.eligibleMarkets.includes(marketSlug));
}
