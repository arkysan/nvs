"use client";

import { useEffect, useMemo, useState } from "react";
import { publicVehicles } from "@/lib/inventory";
import { siteConfig } from "@/lib/site";
import {
  buildReviewPacket,
  makeReviewId,
  reviewStorageKeys,
  summarizeReviewPacket,
  type ReviewAnnotation,
  type ReviewSection,
  type SiteContentOverride,
  type VehicleDraftNote,
} from "@/lib/siteContent";

type Tab = "visual" | "chat" | "annotate" | "vehicles" | "export";

const tabs: Array<[Tab, string]> = [
  ["visual", "Visual"],
  ["chat", "Chat"],
  ["annotate", "Annotate"],
  ["vehicles", "Vehicles"],
  ["export", "Export"],
];

const fieldLabels: Record<string, string> = {
  title: "Title",
  copy: "Copy",
  cta: "CTA",
  label: "Label",
};

function readStored<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeStored<T>(key: string, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

function scanReviewSections(): ReviewSection[] {
  const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
  return nodes.map((node) => {
    const fields = Array.from(node.querySelectorAll<HTMLElement>("[data-field]")).map((fieldNode) => {
      if (!fieldNode.dataset.originalContent) {
        fieldNode.dataset.originalContent = fieldNode.textContent?.trim() ?? "";
      }
      const field = fieldNode.dataset.field ?? "copy";
      return {
        field,
        label: fieldLabels[field] ?? field,
        value: fieldNode.dataset.originalContent,
      };
    });

    return {
      id: node.dataset.section ?? "unknown",
      label: node.dataset.sectionLabel ?? node.dataset.section ?? "Section",
      fields,
    };
  }).filter((section) => section.fields.length > 0);
}

function applyOverrides(overrides: SiteContentOverride[]) {
  const overrideMap = new Map(overrides.map((item) => [`${item.sectionId}:${item.field}`, item.value]));
  for (const node of Array.from(document.querySelectorAll<HTMLElement>("[data-section] [data-field]"))) {
    if (!node.dataset.originalContent) {
      node.dataset.originalContent = node.textContent?.trim() ?? "";
    }
    const section = node.closest<HTMLElement>("[data-section]")?.dataset.section;
    const field = node.dataset.field;
    if (!section || !field) continue;
    const value = overrideMap.get(`${section}:${field}`);
    node.textContent = value ?? node.dataset.originalContent ?? "";
  }
}

function findSection(sections: ReviewSection[], sectionId: string): ReviewSection | undefined {
  return sections.find((section) => section.id === sectionId) ?? sections[0];
}

function parseCommand(command: string, sections: ReviewSection[]) {
  const match = command.match(/^(?:change|set)\s+(.+?)\s+(title|copy|cta|label|text)\s+to\s+["'](.+)["']$/i);
  if (!match) return null;

  const requestedSection = match[1].trim().toLowerCase();
  const field = match[2].toLowerCase() === "text" ? "copy" : match[2].toLowerCase();
  const value = match[3].trim();
  const section = sections.find((item) => (
    item.id.toLowerCase() === requestedSection ||
    item.label.toLowerCase() === requestedSection ||
    item.id.toLowerCase().includes(requestedSection) ||
    item.label.toLowerCase().includes(requestedSection)
  ));

  if (!section || !section.fields.some((item) => item.field === field)) return null;
  return { sectionId: section.id, field, value };
}

export function EditorRoot() {
  const [active, setActive] = useState(false);
  const [tab, setTab] = useState<Tab>("visual");
  const [sections, setSections] = useState<ReviewSection[]>([]);
  const [selectedSectionId, setSelectedSectionId] = useState("");
  const [selectedField, setSelectedField] = useState("title");
  const [draftValue, setDraftValue] = useState("");
  const [overrides, setOverrides] = useState<SiteContentOverride[]>([]);
  const [annotations, setAnnotations] = useState<ReviewAnnotation[]>([]);
  const [vehicleDrafts, setVehicleDrafts] = useState<VehicleDraftNote[]>([]);
  const [note, setNote] = useState("");
  const [priority, setPriority] = useState<ReviewAnnotation["priority"]>("medium");
  const [vehicleSlug, setVehicleSlug] = useState(publicVehicles[0]?.slug ?? "");
  const [vehicleAction, setVehicleAction] = useState<VehicleDraftNote["action"]>("copy");
  const [vehicleNote, setVehicleNote] = useState("");
  const [command, setCommand] = useState("");
  const [status, setStatus] = useState("Local review mode is not connected to production data.");
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const path = window.location.pathname.replace(/\/$/, "");
    const enabled = query.get("review") === "1" || path === "/admin/review";
    setActive(enabled);
    setOverrides(readStored<SiteContentOverride[]>(reviewStorageKeys.overrides, []));
    setAnnotations(readStored<ReviewAnnotation[]>(reviewStorageKeys.annotations, []));
    setVehicleDrafts(readStored<VehicleDraftNote[]>(reviewStorageKeys.vehicleDrafts, []));
    setStorageReady(true);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("review-mode-active", active);
    return () => document.body.classList.remove("review-mode-active");
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const nextSections = scanReviewSections();
    setSections(nextSections);
    if (!selectedSectionId && nextSections[0]) {
      setSelectedSectionId(nextSections[0].id);
      setSelectedField(nextSections[0].fields[0]?.field ?? "title");
    }
  }, [active, selectedSectionId]);

  useEffect(() => {
    if (!active) return;
    applyOverrides(overrides);
    if (storageReady && typeof window !== "undefined") {
      writeStored(reviewStorageKeys.overrides, overrides);
    }
  }, [active, overrides, storageReady]);

  useEffect(() => {
    if (storageReady && typeof window !== "undefined") writeStored(reviewStorageKeys.annotations, annotations);
  }, [annotations, storageReady]);

  useEffect(() => {
    if (storageReady && typeof window !== "undefined") writeStored(reviewStorageKeys.vehicleDrafts, vehicleDrafts);
  }, [storageReady, vehicleDrafts]);

  const selectedSection = useMemo(() => findSection(sections, selectedSectionId), [sections, selectedSectionId]);
  const selectedFieldInfo = selectedSection?.fields.find((field) => field.field === selectedField) ?? selectedSection?.fields[0];
  const currentOverride = overrides.find((item) => item.sectionId === selectedSection?.id && item.field === selectedFieldInfo?.field);
  const packet = useMemo(() => buildReviewPacket({
    source: typeof window === "undefined" ? "local" : window.location.href,
    overrides,
    annotations,
    vehicleDrafts,
  }), [annotations, overrides, vehicleDrafts]);
  const summary = useMemo(() => summarizeReviewPacket(packet), [packet]);
  const waUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(summary)}`;

  useEffect(() => {
    setDraftValue(currentOverride?.value ?? selectedFieldInfo?.value ?? "");
  }, [currentOverride?.value, selectedFieldInfo?.value]);

  if (!active) return null;

  function saveOverride() {
    if (!selectedSection || !selectedFieldInfo) return;
    const next = overrides.filter((item) => !(item.sectionId === selectedSection.id && item.field === selectedFieldInfo.field));
    const trimmed = draftValue.trim();
    setOverrides(trimmed ? [...next, {
      sectionId: selectedSection.id,
      field: selectedFieldInfo.field,
      value: trimmed,
      updatedAt: new Date().toISOString(),
    }] : next);
    setStatus(`Saved local preview for ${selectedSection.label} ${selectedFieldInfo.label}.`);
  }

  function addAnnotation() {
    if (!selectedSection || !note.trim()) return;
    setAnnotations([...annotations, {
      id: makeReviewId("note"),
      sectionId: selectedSection.id,
      note: note.trim(),
      priority,
      createdAt: new Date().toISOString(),
    }]);
    setNote("");
    setStatus(`Added ${priority} annotation for ${selectedSection.label}.`);
  }

  function addVehicleDraft() {
    if (!vehicleSlug || !vehicleNote.trim()) return;
    setVehicleDrafts([...vehicleDrafts, {
      id: makeReviewId("vehicle"),
      vehicleSlug,
      action: vehicleAction,
      note: vehicleNote.trim(),
      createdAt: new Date().toISOString(),
    }]);
    setVehicleNote("");
    setStatus("Saved local vehicle draft note. Public inventory data is unchanged.");
  }

  async function copyText(text: string, label: string) {
    await navigator.clipboard.writeText(text);
    setStatus(`${label} copied to clipboard.`);
  }

  function runCommand() {
    const parsed = parseCommand(command.trim(), sections);
    if (!parsed) {
      setStatus('Command not applied. Use: change hero title to "New title"');
      return;
    }
    const next = overrides.filter((item) => !(item.sectionId === parsed.sectionId && item.field === parsed.field));
    setOverrides([...next, { ...parsed, updatedAt: new Date().toISOString() }]);
    setSelectedSectionId(parsed.sectionId);
    setSelectedField(parsed.field);
    setCommand("");
    setStatus(`Applied local command to ${parsed.sectionId}.${parsed.field}.`);
  }

  return (
    <aside className="review-panel" aria-label="New Vision review mode">
      <div className="review-panel-header">
        <div>
          <b>Review Mode</b>
          <span>Local only</span>
        </div>
        <button type="button" onClick={() => setActive(false)} aria-label="Hide review mode">x</button>
      </div>
      <div className="review-tabs">
        {tabs.map(([value, label]) => (
          <button type="button" className={tab === value ? "active" : ""} key={value} onClick={() => setTab(value)}>
            {label}
          </button>
        ))}
      </div>
      <p className="review-status">{status}</p>

      {tab === "visual" ? (
        <div className="review-pane">
          <label>Section
            <select value={selectedSection?.id ?? ""} onChange={(event) => {
              const section = findSection(sections, event.target.value);
              setSelectedSectionId(event.target.value);
              setSelectedField(section?.fields[0]?.field ?? "title");
            }}>
              {sections.map((section) => <option key={section.id} value={section.id}>{section.label}</option>)}
            </select>
          </label>
          <label>Field
            <select value={selectedFieldInfo?.field ?? ""} onChange={(event) => setSelectedField(event.target.value)}>
              {selectedSection?.fields.map((field) => <option key={field.field} value={field.field}>{field.label}</option>)}
            </select>
          </label>
          <label>Preview text
            <textarea rows={5} value={draftValue} onChange={(event) => setDraftValue(event.target.value)} />
          </label>
          <div className="review-actions">
            <button type="button" className="button primary" onClick={saveOverride}>Save preview</button>
            <button type="button" className="button ghost" onClick={() => setDraftValue(selectedFieldInfo?.value ?? "")}>Original</button>
          </div>
        </div>
      ) : null}

      {tab === "chat" ? (
        <div className="review-pane">
          <label>Rule-based command
            <textarea rows={5} value={command} onChange={(event) => setCommand(event.target.value)} placeholder={'change hero title to "New Vision OS export desk"'} />
          </label>
          <button type="button" className="button primary" onClick={runCommand}>Apply command</button>
        </div>
      ) : null}

      {tab === "annotate" ? (
        <div className="review-pane">
          <label>Priority
            <select value={priority} onChange={(event) => setPriority(event.target.value as ReviewAnnotation["priority"])}>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="low">Low</option>
            </select>
          </label>
          <label>Note
            <textarea rows={4} value={note} onChange={(event) => setNote(event.target.value)} placeholder="What needs review in this section?" />
          </label>
          <button type="button" className="button primary" onClick={addAnnotation}>Add note</button>
          <div className="review-list">
            {annotations.map((item) => (
              <div key={item.id}>
                <b>{item.priority} / {item.sectionId}</b>
                <p>{item.note}</p>
                <button type="button" onClick={() => setAnnotations(annotations.filter((noteItem) => noteItem.id !== item.id))}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {tab === "vehicles" ? (
        <div className="review-pane">
          <p className="review-status">Draft/local only. These notes never change public inventory records.</p>
          <label>Vehicle
            <select value={vehicleSlug} onChange={(event) => setVehicleSlug(event.target.value)}>
              {publicVehicles.map((vehicle) => <option key={vehicle.id} value={vehicle.slug}>{vehicle.stockId} - {vehicle.brand} {vehicle.model}</option>)}
            </select>
          </label>
          <label>Action
            <select value={vehicleAction} onChange={(event) => setVehicleAction(event.target.value as VehicleDraftNote["action"])}>
              <option value="copy">Copy</option>
              <option value="pricing">Pricing</option>
              <option value="photos">Photos</option>
              <option value="availability">Availability</option>
              <option value="documents">Documents</option>
            </select>
          </label>
          <label>Draft note
            <textarea rows={4} value={vehicleNote} onChange={(event) => setVehicleNote(event.target.value)} />
          </label>
          <button type="button" className="button primary" onClick={addVehicleDraft}>Save draft note</button>
          <div className="review-list">
            {vehicleDrafts.map((item) => (
              <div key={item.id}>
                <b>{item.action} / {item.vehicleSlug}</b>
                <p>{item.note}</p>
                <button type="button" onClick={() => setVehicleDrafts(vehicleDrafts.filter((draft) => draft.id !== item.id))}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {tab === "export" ? (
        <div className="review-pane">
          <textarea rows={8} readOnly value={summary} />
          <div className="review-actions">
            <button type="button" className="button primary" onClick={() => copyText(JSON.stringify(packet, null, 2), "JSON packet")}>Copy JSON</button>
            <button type="button" className="button ghost" onClick={() => copyText(summary, "Summary")}>Copy summary</button>
            <a className="button gold" href={waUrl} target="_blank" rel="noreferrer">WhatsApp handoff</a>
          </div>
        </div>
      ) : null}
    </aside>
  );
}
