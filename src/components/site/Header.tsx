"use client";

import Link from "next/link";
import { useState } from "react";
import { featureFlags, siteConfig } from "@/lib/site";

const nav = [
  ["Inventory", "/vehicles"],
  ["Markets", "/markets/ethiopia"],
  ["Dealer Program", "/dealer-program"],
  ["Services", "/services"],
  ["Shipping", "/shipping"],
  ["Quote", "/quote"],
  ["Admin", "/admin"],
];

const languages = ["EN", "AR", "FR", "ZH"];
const markets = ["GL Market", "Ethiopia", "Egypt", "Nigeria", "Algeria", "Guinea"];

export function Header() {
  const [language, setLanguage] = useState("EN");
  const [market, setMarket] = useState(markets[0]);

  const whatsApp = `https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hi New Vision, I want current stock and export pricing.")}`;

  return (
    <header className="topbar" data-section="site-header" data-section-label="Site header">
      <nav className="nav" aria-label="Main navigation">
        <Link className="brand" href="/">
          <img src="/logo-mark.png" alt="New Vision" />
          <span>
            <strong data-field="title">{siteConfig.productName}</strong>
            <span data-field="copy">Static-first export platform</span>
          </span>
        </Link>
        <div className="nav-links">
          {nav.map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </div>
        <div className="nav-actions">
          <select className="market-select" value={market} onChange={(event) => setMarket(event.target.value)} aria-label="Market theme">
            {markets.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <div className="language-row" aria-label="Language switcher">
            {languages.map((item) => (
              <button key={item} className={language === item ? "active" : ""} onClick={() => setLanguage(item)} type="button">
                {item}
              </button>
            ))}
          </div>
          {featureFlags.useWhatsApp ? (
            <a className="button primary" href={whatsApp} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          ) : null}
          {featureFlags.useWeChat ? <Link className="button ghost" href="/contact">WeChat / Phone</Link> : null}
        </div>
      </nav>
    </header>
  );
}
