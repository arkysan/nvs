import fs from "fs";
import path from "path";

const root = process.cwd();
const inventoryPath = path.join(root, "src", "lib", "inventory.ts");
const vehiclesPath = path.join(root, "src", "data", "vehicles.ts");
const inventory = fs.readFileSync(inventoryPath, "utf8");
const vehicles = fs.readFileSync(vehiclesPath, "utf8");

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

console.log(JSON.stringify({ ok: true, rule: "available + verified + not tier_3_internal" }));
