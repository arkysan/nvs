import { AdminTable } from "@/components/admin/AdminTable";
import { SectionTitle } from "@/components/site/SectionTitle";
import { sampleInquiries } from "@/data/inquiries";

export const metadata = {
  title: "Admin Inquiries - New Vision OS",
};

export default function AdminInquiriesPage() {
  return (
    <section className="section">
      <div className="container">
        <SectionTitle title="Inquiry Queue">
          Static sample queue showing the future Supabase or Alibaba Function Compute shape.
        </SectionTitle>
        <AdminTable
          headers={["Buyer", "Country", "Vehicle", "Port", "Quantity", "Status"]}
          rows={sampleInquiries.map((inquiry) => [
            `${inquiry.name} / ${inquiry.company ?? "no company"}`,
            inquiry.country,
            inquiry.vehicleInterest,
            inquiry.destinationPort,
            inquiry.quantity,
            inquiry.status,
          ])}
        />
      </div>
    </section>
  );
}
