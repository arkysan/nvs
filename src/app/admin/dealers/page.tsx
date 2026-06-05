import { AdminTable } from "@/components/admin/AdminTable";
import { SectionTitle } from "@/components/site/SectionTitle";
import { dealerApplications } from "@/data/inquiries";

export const metadata = {
  title: "Admin Dealers - New Vision OS",
};

export default function AdminDealersPage() {
  return (
    <section className="section">
      <div className="container">
        <SectionTitle title="Dealer Applications">
          Dealer applications are static V1 examples until a database is added.
        </SectionTitle>
        <AdminTable
          headers={["Company", "Country", "Contact", "Monthly volume", "Focus", "Status"]}
          rows={dealerApplications.map((dealer) => [
            dealer.companyName,
            dealer.country,
            dealer.whatsapp,
            dealer.monthlyVolume,
            dealer.vehicleFocus.join(", "),
            dealer.status,
          ])}
        />
      </div>
    </section>
  );
}
