import type { DealerApplication, Inquiry } from "@/lib/types";

export const sampleInquiries: Inquiry[] = [
  {
    id: "inq-1001",
    name: "Dealer buyer",
    company: "Lagos Auto Import",
    country: "Nigeria",
    whatsapp: "+234 800 000 0000",
    email: "buyer@example.com",
    destinationPort: "Lagos",
    vehicleInterest: "BYD Song PLUS DM-i",
    quantity: 3,
    budget: "USD 15k-30k",
    condition: "either",
    powertrain: "PHEV",
    inspectionRequired: true,
    message: "Need CIF quote and current photos.",
    source: "static_quote_form",
    createdAt: "2026-06-06",
    status: "new",
  },
];

export const dealerApplications: DealerApplication[] = [
  {
    id: "dealer-1001",
    companyName: "East Africa EV Traders",
    country: "Ethiopia",
    contactName: "Applicant",
    whatsapp: "+251 900 000 000",
    monthlyVolume: "5-10 units",
    marketCoverage: "Addis Ababa and regional dealers",
    vehicleFocus: ["EV sedan", "EV SUV"],
    status: "reviewing",
  },
];
