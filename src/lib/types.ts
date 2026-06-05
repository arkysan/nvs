export type SupplierTier = "tier_1_direct" | "tier_2_partner" | "tier_3_internal";
export type VerificationStatus = "verified" | "pending" | "rejected";
export type Availability = "available" | "reserved" | "sold" | "hidden";
export type Powertrain = "NEV" | "ICE" | "PHEV" | "HEV";
export type BodyType = "SUV" | "Sedan" | "Pickup" | "Van" | "Truck" | "Hatchback";

export type Vehicle = {
  id: string;
  slug: string;
  stockId: string;
  brand: string;
  model: string;
  year: number;
  condition: "new" | "used";
  powertrain: Powertrain;
  bodyType: BodyType;
  fobPriceUsd: number;
  mileageKm?: number;
  rangeKm?: number;
  supplierId: string;
  supplierTier: SupplierTier;
  availability: Availability;
  verificationStatus: VerificationStatus;
  eligibleMarkets: string[];
  recommendedMarkets: string[];
  image: string;
  specs: Record<string, string>;
};

export type Supplier = {
  id: string;
  companyName: string;
  city: string;
  province: string;
  contactName: string;
  phone: string;
  wechat?: string;
  brands: string[];
  vehicleTypes: string[];
  verificationTier: SupplierTier;
  businessLicenseVerified: boolean;
  showroomVerified: boolean;
  inventoryVerified: boolean;
  exportExperienceVerified: boolean;
  lastVerifiedAt: string;
  internalNotes: string;
  riskLevel: "low" | "medium" | "high";
};

export type Market = {
  code: string;
  slug: string;
  name: string;
  region: string;
  priority: number;
  focus: "NEV" | "ICE";
  languagePriority: string[];
  recommendedVehicles: string[];
  primaryPorts: string[];
  buyerGuidance: string;
};

export type ShippingRoute = {
  id: string;
  origin: string;
  destination: string;
  marketSlug: string;
  transitDays: string;
  notes: string;
};

export type Inquiry = {
  id: string;
  name: string;
  company?: string;
  country: string;
  whatsapp: string;
  email?: string;
  destinationPort: string;
  vehicleInterest: string;
  quantity: number;
  budget?: string;
  condition: "either" | "new" | "used";
  powertrain: "any" | Powertrain;
  inspectionRequired: boolean;
  message: string;
  source: "static_quote_form" | "dealer_form";
  createdAt: string;
  status: "new" | "contacted" | "quote_sent" | "won" | "lost";
};

export type DealerApplication = {
  id: string;
  companyName: string;
  country: string;
  contactName: string;
  whatsapp: string;
  monthlyVolume: string;
  marketCoverage: string;
  vehicleFocus: string[];
  status: "new" | "reviewing" | "approved" | "declined";
};
