"use client";

import { useMemo, useState } from "react";
import { usePrivacyMode } from "@/components/privacy/usePrivacyMode";
import { publicVehicles } from "@/lib/inventory";
import { money } from "@/lib/format";
import { siteConfig } from "@/lib/site";

type QuoteState = {
  name: string;
  company: string;
  country: string;
  whatsapp: string;
  email: string;
  destinationPort: string;
  vehicleInterest: string;
  quantity: number;
  budget: string;
  condition: "either" | "new" | "used";
  powertrain: "any" | "NEV" | "ICE" | "PHEV" | "HEV";
  inspectionRequired: boolean;
  message: string;
};

const initial: QuoteState = {
  name: "",
  company: "",
  country: "",
  whatsapp: "",
  email: "",
  destinationPort: "",
  vehicleInterest: publicVehicles[0]?.slug ?? "",
  quantity: 1,
  budget: "",
  condition: "either",
  powertrain: "any",
  inspectionRequired: true,
  message: "",
};

export function QuoteForm({ selectedVehicleSlug }: { selectedVehicleSlug?: string }) {
  const [form, setForm] = useState<QuoteState>({ ...initial, vehicleInterest: selectedVehicleSlug ?? initial.vehicleInterest });
  const [copyStatus, setCopyStatus] = useState("");
  const { privacyMode, privacyModeReady } = usePrivacyMode();
  const selectedVehicle = publicVehicles.find((vehicle) => vehicle.slug === form.vehicleInterest);
  const freight = selectedVehicle ? 1030 + Math.max(0, form.quantity - 1) * 680 : 0;
  const inspection = form.inspectionRequired ? 280 : 0;
  const fob = selectedVehicle ? selectedVehicle.fobPriceUsd * form.quantity : 0;
  const cif = fob + freight + inspection;

  const message = useMemo(() => {
    const vehicleLine = selectedVehicle ? `${selectedVehicle.stockId} - ${selectedVehicle.brand} ${selectedVehicle.model}` : form.vehicleInterest;
    return [
      "Hi New Vision team,",
      "",
      "I would like a vehicle export quote.",
      `Name: ${form.name || "[name]"}`,
      `Company: ${form.company || "[company]"}`,
      `Country: ${form.country || "[country]"}`,
      `WhatsApp / Phone: ${form.whatsapp || "[contact]"}`,
      `Email: ${form.email || "[email]"}`,
      `Destination Port: ${form.destinationPort || "[port]"}`,
      `Vehicle: ${vehicleLine}`,
      `Quantity: ${form.quantity}`,
      `Budget: ${form.budget || "[budget]"}`,
      `Condition: ${form.condition}`,
      `Powertrain: ${form.powertrain}`,
      `Inspection required: ${form.inspectionRequired ? "yes" : "no"}`,
      `Estimate preview: FOB ${money(fob)} + freight/proof ${money(freight + inspection)} = CIF est. ${money(cif)}`,
      `Message: ${form.message || "[message]"}`,
      "",
      "Please confirm live availability, current photos, final CIF, documents, and payment terms.",
    ].join("\n");
  }, [cif, fob, form, freight, inspection, selectedVehicle]);

  const waUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;

  function update<K extends keyof QuoteState>(key: K, value: QuoteState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function copyQuoteMessage() {
    try {
      await navigator.clipboard.writeText(message);
      setCopyStatus("Quote message copied locally. Paste it manually only when you are ready to share.");
    } catch {
      setCopyStatus("Copy failed. Browser clipboard permission blocked it.");
    }
  }

  return (
    <div className="quote-layout" data-section="quote-form" data-section-label="Quote form">
      <form className="form-card" onSubmit={(event) => event.preventDefault()}>
        <div className="form-grid">
          <label>Name *<input required value={form.name} onChange={(event) => update("name", event.target.value)} placeholder="John Smith" /></label>
          <label>Company<input value={form.company} onChange={(event) => update("company", event.target.value)} placeholder="Dealer or buyer company" /></label>
          <label>Country *<input required value={form.country} onChange={(event) => update("country", event.target.value)} placeholder="Nigeria, UAE, Ethiopia..." /></label>
          <label>WhatsApp / Phone *<input required value={form.whatsapp} onChange={(event) => update("whatsapp", event.target.value)} placeholder="+234 800 000 0000" /></label>
          <label>Email<input value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="buyer@example.com" /></label>
          <label>Destination Port *<input required value={form.destinationPort} onChange={(event) => update("destinationPort", event.target.value)} placeholder="Lagos, Djibouti, Algiers..." /></label>
          <label className="wide">Vehicle of Interest
            <select value={form.vehicleInterest} onChange={(event) => update("vehicleInterest", event.target.value)}>
              {publicVehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.slug}>{vehicle.stockId} - {vehicle.brand} {vehicle.model}</option>
              ))}
              <option value="fleet-order">Multiple vehicles / fleet order</option>
            </select>
          </label>
          <label>Quantity<input type="number" min={1} max={200} value={form.quantity} onChange={(event) => update("quantity", Number(event.target.value) || 1)} /></label>
          <label>Budget<input value={form.budget} onChange={(event) => update("budget", event.target.value)} placeholder="USD 15k-30k" /></label>
          <label>New or Used
            <select value={form.condition} onChange={(event) => update("condition", event.target.value as QuoteState["condition"])}>
              <option value="either">Either</option>
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>
          </label>
          <label>Powertrain
            <select value={form.powertrain} onChange={(event) => update("powertrain", event.target.value as QuoteState["powertrain"])}>
              <option value="any">Any</option>
              <option value="NEV">NEV</option>
              <option value="ICE">ICE</option>
              <option value="PHEV">PHEV</option>
              <option value="HEV">HEV</option>
            </select>
          </label>
          <label className="wide">Message / Requirements<textarea rows={4} value={form.message} onChange={(event) => update("message", event.target.value)} placeholder="Trim, color, quantity, docs, inspection, delivery requirements..." /></label>
        </div>
        <div className="row-actions" style={{ marginTop: 14 }}>
          {!privacyModeReady ? (
            <button className="button ghost" type="button" disabled>Checking privacy</button>
          ) : privacyMode ? (
            <button className="button primary" type="button" onClick={copyQuoteMessage}>Copy locally</button>
          ) : (
            <a className="button primary" href={waUrl} target="_blank" rel="noreferrer">Send via WhatsApp</a>
          )}
          <a className="button ghost" href="/contact">Use WeChat / Phone</a>
        </div>
        {privacyMode ? <p className="notice privacy-inline">Privacy Mode is on. This form is not opening WhatsApp automatically; it only prepares local copy text.</p> : null}
        {copyStatus ? <p className="review-status">{copyStatus}</p> : null}
      </form>
      <aside className="form-card quote-preview" id="quotePreview">
        <h2 data-field="title">Export quote preview</h2>
        <p data-field="copy">Estimate until sales confirms live freight, documents, and final CIF.</p>
        <div className="preview-line"><span>FOB</span><b>{money(fob)}</b></div>
        <div className="preview-line"><span>Freight est.</span><b>{money(freight)}</b></div>
        <div className="preview-line"><span>Inspection/docs</span><b>{money(inspection)}</b></div>
        <div className="preview-line"><span>CIF est.</span><b>{money(cif)}</b></div>
        <p className="notice">China-safe fallback: WeChat {siteConfig.contact.wechat} or phone {siteConfig.contact.phone}. This form does not require Supabase or Google services.</p>
      </aside>
    </div>
  );
}
