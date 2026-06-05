import { DealerApplicationForm } from "@/components/forms/DealerApplicationForm";
import { SectionTitle } from "@/components/site/SectionTitle";

export const metadata = {
  title: "Dealer Program - New Vision OS",
};

export default function DealerProgramPage() {
  return (
    <section className="section">
      <div className="container">
        <SectionTitle title="Global Dealer Program">
          Recruit regional dealers for Ethiopia, Egypt, Nigeria, Algeria, and Guinea before building a full dealer portal.
        </SectionTitle>
        <div className="card-grid" style={{ marginBottom: 18 }}>
          <div className="card"><h3>Applicant</h3><p>Submit business details, market coverage, target vehicles, and monthly volume.</p></div>
          <div className="card"><h3>Approved Dealer</h3><p>Receives verified stock lists, quote support, marketing material, and dealer pricing updates.</p></div>
          <div className="card"><h3>Distributor</h3><p>Future role for regional partners with repeat orders and local after-sales capacity.</p></div>
        </div>
        <DealerApplicationForm />
      </div>
    </section>
  );
}
