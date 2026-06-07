"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePrivacyMode } from "@/components/privacy/usePrivacyMode";

const localProtections = [
  "Hides WhatsApp launch buttons in the header and forms.",
  "Keeps quote and dealer request handoffs as local copy text.",
  "Labels Review Mode localStorage as local-only, not private production storage.",
  "Keeps Google Analytics, Baidu Tongji, Supabase, and live API flags off in V1.",
];

const stillExternal = [
  "Anything pasted into Codex, ChatGPT, WhatsApp, WeChat, GitHub, Vercel, or email is outside this local browser mode.",
  "This mode cannot change OpenAI account training controls or Codex product telemetry settings.",
  "Real suppliers, customer lists, prices, contracts, and credentials still belong outside this public/static repo.",
];

export function PrivacyModeControl() {
  const { privacyMode, setPrivacyMode } = usePrivacyMode();
  const [copyStatus, setCopyStatus] = useState("Ready");

  const operatingSummary = useMemo(() => {
    return [
      "New Vision OS privacy mode",
      `Status: ${privacyMode ? "ON" : "OFF"}`,
      "",
      "Local protections:",
      ...localProtections.map((item) => `- ${item}`),
      "",
      "Still external or unverified:",
      ...stillExternal.map((item) => `- ${item}`),
    ].join("\n");
  }, [privacyMode]);

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(operatingSummary);
      setCopyStatus("Copied privacy summary locally.");
    } catch {
      setCopyStatus("Copy failed. Browser clipboard permission blocked it.");
    }
  }

  return (
    <div className="privacy-layout" data-section="privacy-mode-control" data-section-label="Privacy mode control">
      <section className="privacy-console">
        <div className="privacy-status-row">
          <span className={privacyMode ? "privacy-badge on" : "privacy-badge"}>{privacyMode ? "Privacy Mode On" : "Privacy Mode Off"}</span>
          <button className={privacyMode ? "button ghost" : "button primary"} type="button" onClick={() => setPrivacyMode(!privacyMode)}>
            {privacyMode ? "Turn off" : "Turn on"}
          </button>
        </div>
        <h2 data-field="title">Local browser privacy mode</h2>
        <p data-field="copy">
          This switch changes New Vision OS browser behavior on this device. It does not change OpenAI, Codex, WhatsApp, WeChat, Vercel, GitHub, or phone-level privacy settings.
        </p>
        <div className="notice privacy-warning">
          Use this when reviewing sensitive New Vision strategy. Keep real supplier lists, customer details, private margins, contracts, credentials, and raw business logs out of this public/static repo.
        </div>
        <div className="row-actions">
          <button className="button primary" type="button" onClick={copySummary}>Copy local privacy summary</button>
          <Link className="button ghost" href="/admin/review">Open Review Mode</Link>
        </div>
        <p className="review-status">{copyStatus}</p>
      </section>

      <section className="privacy-list">
        <h3>Protected by this mode</h3>
        {localProtections.map((item) => (
          <div key={item} className="privacy-row safe">
            <b>Local</b>
            <span>{item}</span>
          </div>
        ))}
      </section>

      <section className="privacy-list">
        <h3>Not protected by this mode</h3>
        {stillExternal.map((item) => (
          <div key={item} className="privacy-row risk">
            <b>External</b>
            <span>{item}</span>
          </div>
        ))}
      </section>
    </div>
  );
}
