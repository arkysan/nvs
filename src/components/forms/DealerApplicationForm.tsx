"use client";

import { useMemo, useState } from "react";
import { usePrivacyMode } from "@/components/privacy/usePrivacyMode";
import { siteConfig } from "@/lib/site";

export function DealerApplicationForm() {
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("");
  const [contact, setContact] = useState("");
  const [volume, setVolume] = useState("5-10 units");
  const [coverage, setCoverage] = useState("");
  const [focus, setFocus] = useState("EV SUV, ICE SUV");
  const [copyStatus, setCopyStatus] = useState("");
  const { privacyMode, privacyModeReady } = usePrivacyMode();

  const message = useMemo(() => {
    return [
      "Hi New Vision team,",
      "",
      "I want to apply for the dealer program.",
      `Company: ${company || "[company]"}`,
      `Country: ${country || "[country]"}`,
      `Contact: ${contact || "[contact]"}`,
      `Monthly volume: ${volume}`,
      `Market coverage: ${coverage || "[coverage]"}`,
      `Vehicle focus: ${focus}`,
      "",
      "Please send dealer onboarding steps and verified stock list.",
    ].join("\n");
  }, [company, contact, country, coverage, focus, volume]);

  const waUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;

  async function copyApplicationMessage() {
    try {
      await navigator.clipboard.writeText(message);
      setCopyStatus("Dealer application copied locally. Paste it manually only when you are ready to share.");
    } catch {
      setCopyStatus("Copy failed. Browser clipboard permission blocked it.");
    }
  }

  return (
    <form className="form-card" onSubmit={(event) => event.preventDefault()}>
      <div className="form-grid">
        <label>Company Name<input value={company} onChange={(event) => setCompany(event.target.value)} placeholder="Dealer company" /></label>
        <label>Country<input value={country} onChange={(event) => setCountry(event.target.value)} placeholder="Ethiopia, Egypt, Nigeria..." /></label>
        <label>WhatsApp / Contact<input value={contact} onChange={(event) => setContact(event.target.value)} placeholder="+000..." /></label>
        <label>Monthly Volume<select value={volume} onChange={(event) => setVolume(event.target.value)}><option>1-4 units</option><option>5-10 units</option><option>10-30 units</option><option>30+ units</option></select></label>
        <label className="wide">Market Coverage<input value={coverage} onChange={(event) => setCoverage(event.target.value)} placeholder="Cities, dealer network, fleet customers" /></label>
        <label className="wide">Vehicle Focus<input value={focus} onChange={(event) => setFocus(event.target.value)} placeholder="EV SUV, ICE sedan, pickup..." /></label>
      </div>
      <div className="row-actions" style={{ marginTop: 14 }}>
        {!privacyModeReady ? (
          <button className="button ghost" type="button" disabled>Checking privacy</button>
        ) : privacyMode ? (
          <button className="button primary" type="button" onClick={copyApplicationMessage}>Copy application locally</button>
        ) : (
          <a className="button primary" href={waUrl} target="_blank" rel="noreferrer">Send Dealer Application</a>
        )}
      </div>
      {privacyMode ? <p className="notice privacy-inline">Privacy Mode is on. This form is not opening WhatsApp automatically; it only prepares local copy text.</p> : null}
      {copyStatus ? <p className="review-status">{copyStatus}</p> : null}
    </form>
  );
}
