import { SectionTitle } from "@/components/site/SectionTitle";
import { siteConfig } from "@/lib/site";

export const metadata = {
  title: "Contact - New Vision OS",
};

export default function ContactPage() {
  const waUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hi New Vision, I want to discuss vehicle export sourcing.")}`;

  return (
    <section className="section">
      <div className="container">
        <SectionTitle title="Contact New Vision">
          Global buyers can use WhatsApp. China-side users can use WeChat or phone without relying on blocked services.
        </SectionTitle>
        <div className="card-grid">
          <div className="card"><h3>WhatsApp</h3><p>{siteConfig.contact.whatsapp}</p><a className="button primary" href={waUrl} target="_blank" rel="noreferrer">Open WhatsApp</a></div>
          <div className="card"><h3>WeChat / Phone</h3><p>{siteConfig.contact.wechat}<br />{siteConfig.contact.phone}</p><span className="chip">China-safe fallback</span></div>
          <div className="card"><h3>Address</h3><p>{siteConfig.contact.address}</p><span className="chip">Yiwu, Zhejiang</span></div>
        </div>
      </div>
    </section>
  );
}
