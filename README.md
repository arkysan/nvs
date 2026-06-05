# New Vision OS / NVS Platform

Static-first Next.js platform for New Vision vehicle export growth.

## Source Of Truth

- New build root: `C:\Users\ARKAI\Documents\nvs project`
- Reference only: `C:\Users\ARKAI\Desktop\newvision-demo`
- Public UI name: `New Vision OS`
- GitHub target: `arkysan/nvs`
- Vercel project target: `nvs-platform`

## What V1 Includes

- Verified public vehicle inventory.
- Year 1 market pages for Ethiopia, Egypt, Nigeria, Algeria, and Guinea.
- Quote form with FOB/freight/CIF preview and WhatsApp handoff.
- WeChat/phone fallback for China-safe contact.
- Dealer application flow.
- Admin-lite pages for vehicles, suppliers, inquiries, and dealers.
- Static export readiness for Vercel, GitHub Pages, and later Alibaba OSS/CDN.

## Commands

```powershell
npm run dev
npm run check:data
npm run build
npm test
```

## Inventory Rule

Public inventory renders only when:

```ts
vehicle.availability === "available" &&
vehicle.verificationStatus === "verified" &&
vehicle.supplierTier !== "tier_3_internal"
```

Tier 3, pending, sold, reserved, hidden, or rejected records stay internal.

## Current Limits

- No Supabase dependency in V1.
- No full auth or CRM yet.
- No live vessel API yet.
- Admin-lite is a static internal review board, not private production storage.
