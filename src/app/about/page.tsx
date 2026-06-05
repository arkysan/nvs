import { SectionTitle } from "@/components/site/SectionTitle";
import { siteConfig } from "@/lib/site";

export const metadata = {
  title: "About - New Vision OS",
};

export default function AboutPage() {
  return (
    <section className="section">
      <div className="container">
        <SectionTitle title={siteConfig.legalName}>
          New Vision OS is the software foundation for a larger international vehicle export platform.
        </SectionTitle>
        <div className="hero">
          <div className="hero-panel"><img src="/showroom-900.webp" alt="New Vision office" /></div>
          <div>
            <h1>From export website to operating platform.</h1>
            <p>V1 focuses on verified stock, quote routing, dealer applications, supplier verification, and Year 1 market pages. Database, auth, CRM, and automation remain later phases.</p>
            <div className="card-grid">
              <div className="card"><h3>Founded</h3><p>Yiwu export company context since 2019.</p></div>
              <div className="card"><h3>Focus</h3><p>Green and smart travel plus practical ICE markets.</p></div>
              <div className="card"><h3>Principle</h3><p>Static frontend first, verified data second, automation last.</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
