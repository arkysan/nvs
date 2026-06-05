import type { ShippingRoute } from "@/lib/types";

export const shippingRoutes: ShippingRoute[] = [
  { id: "sha-dji", origin: "Shanghai / Ningbo", destination: "Djibouti", marketSlug: "ethiopia", transitDays: "28-36 days", notes: "Primary Ethiopia access lane through Djibouti." },
  { id: "sha-psd", origin: "Shanghai / Ningbo", destination: "Port Said / Alexandria", marketSlug: "egypt", transitDays: "22-30 days", notes: "Confirm route, duty, and documents before deposit." },
  { id: "sha-los", origin: "Shanghai / Ningbo", destination: "Lagos", marketSlug: "nigeria", transitDays: "32-42 days", notes: "Quote by vehicle size and RORO/container option." },
  { id: "sha-alg", origin: "Shanghai / Ningbo", destination: "Algiers", marketSlug: "algeria", transitDays: "26-35 days", notes: "ICE-focused quote lane with French/Arabic follow-up." },
  { id: "sha-cky", origin: "Shanghai / Ningbo", destination: "Conakry", marketSlug: "guinea", transitDays: "34-45 days", notes: "Practical SUV and pickup route for dealer buyers." },
];
