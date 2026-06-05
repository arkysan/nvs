import fs from "fs";
import path from "path";

const root = process.cwd();
const inventoryPath = path.join(root, "src", "lib", "inventory.ts");
const vehiclesPath = path.join(root, "src", "data", "vehicles.ts");
const quotePagePath = path.join(root, "src", "app", "quote", "page.tsx");
const quotePageFormPath = path.join(root, "src", "components", "forms", "QuotePageForm.tsx");
const vehicleCardPath = path.join(root, "src", "components", "vehicles", "VehicleCard.tsx");
const inventory = fs.readFileSync(inventoryPath, "utf8");
const vehicles = fs.readFileSync(vehiclesPath, "utf8");
const quotePage = fs.readFileSync(quotePagePath, "utf8");
const quotePageForm = fs.readFileSync(quotePageFormPath, "utf8");
const vehicleCard = fs.readFileSync(vehicleCardPath, "utf8");

const requiredRule = [
  'vehicle.availability === "available"',
  'vehicle.verificationStatus === "verified"',
  'vehicle.supplierTier !== "tier_3_internal"',
];

for (const snippet of requiredRule) {
  if (!inventory.includes(snippet)) {
    throw new Error(`Missing public inventory rule: ${snippet}`);
  }
}

if (!vehicles.includes('supplierTier: "tier_3_internal"') || !vehicles.includes('verificationStatus: "pending"')) {
  throw new Error("Missing internal/pending vehicle fixture for public inventory guard.");
}

if (!vehicleCard.includes("/quote?vehicle=")) {
  throw new Error("Vehicle cards must hand selected stock into the quote route.");
}

if (!quotePage.includes("Suspense") || !quotePage.includes("QuotePageForm")) {
  throw new Error("Quote route must wrap query-param reader in Suspense for static export.");
}

if (!quotePageForm.includes("useSearchParams") || !quotePageForm.includes('searchParams.get("vehicle")')) {
  throw new Error("Quote page form must read the selected vehicle from the URL query.");
}

console.log(JSON.stringify({ ok: true, rule: "available + verified + not tier_3_internal", quoteHandoff: true }));
