import { AdminTable } from "@/components/admin/AdminTable";
import { SectionTitle } from "@/components/site/SectionTitle";
import { suppliers } from "@/data/suppliers";

export const metadata = {
  title: "Admin Suppliers - New Vision OS",
};

export default function AdminSuppliersPage() {
  return (
    <section className="section">
      <div className="container">
        <SectionTitle title="Supplier Verification">
          Tier 3 remains internal until license, showroom, inventory, and export experience are verified.
        </SectionTitle>
        <AdminTable
          headers={["Supplier", "Tier", "City", "Checklist", "Risk", "Last verified"]}
          rows={suppliers.map((supplier) => [
            supplier.companyName,
            supplier.verificationTier,
            `${supplier.city}, ${supplier.province}`,
            [
              supplier.businessLicenseVerified ? "license" : "license missing",
              supplier.showroomVerified ? "showroom" : "showroom missing",
              supplier.inventoryVerified ? "inventory" : "inventory missing",
              supplier.exportExperienceVerified ? "export" : "export missing",
            ].join(", "),
            supplier.riskLevel,
            supplier.lastVerifiedAt,
          ])}
        />
      </div>
    </section>
  );
}
