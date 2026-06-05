import Link from "next/link";
import { markets } from "@/data/markets";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="footer" data-section="site-footer" data-section-label="Site footer">
      <div className="container footer-grid">
        <div>
          <h3 data-field="title">{siteConfig.legalName}</h3>
          <p data-field="copy">Verified vehicle sourcing, dealer recruitment, export documentation, inspection, and door-to-port logistics from Yiwu.</p>
          <p>
            Tel {siteConfig.contact.phone} <br />
            WA / WeChat {siteConfig.contact.wechat} <br />
            {siteConfig.contact.address}
          </p>
        </div>
        <div>
          <h3>Platform</h3>
          <Link href="/vehicles">Verified Inventory</Link>
          <Link href="/quote">Quote Request</Link>
          <Link href="/dealer-program">Dealer Program</Link>
          <Link href="/admin">Admin Lite</Link>
        </div>
        <div>
          <h3>Markets</h3>
          {markets.map((market) => (
            <Link key={market.slug} href={`/markets/${market.slug}`}>
              {market.name}
            </Link>
          ))}
        </div>
        <div>
          <h3>Export Support</h3>
          <Link href="/inspection">Inspection</Link>
          <Link href="/shipping">Shipping</Link>
          <Link href="/services">Services</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
