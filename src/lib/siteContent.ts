export type SiteContentOverride = {
  sectionId: string;
  field: string;
  value: string;
  updatedAt: string;
};

export type ReviewAnnotation = {
  id: string;
  sectionId: string;
  note: string;
  priority: "low" | "medium" | "high";
  createdAt: string;
};

export type VehicleDraftNote = {
  id: string;
  vehicleSlug: string;
  action: "copy" | "pricing" | "photos" | "availability" | "documents";
  note: string;
  createdAt: string;
};

export type ReviewSectionField = {
  field: string;
  label: string;
  value: string;
};

export type ReviewSection = {
  id: string;
  label: string;
  fields: ReviewSectionField[];
};

export type ReviewPacket = {
  product: "New Vision OS";
  mode: "local_review";
  generatedAt: string;
  source: string;
  overrides: SiteContentOverride[];
  annotations: ReviewAnnotation[];
  vehicleDrafts: VehicleDraftNote[];
};

export const reviewStorageKeys = {
  overrides: "nvs.review.overrides.v1",
  annotations: "nvs.review.annotations.v1",
  vehicleDrafts: "nvs.review.vehicleDrafts.v1",
};

export function makeReviewId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function buildReviewPacket(input: {
  source: string;
  overrides: SiteContentOverride[];
  annotations: ReviewAnnotation[];
  vehicleDrafts: VehicleDraftNote[];
}): ReviewPacket {
  return {
    product: "New Vision OS",
    mode: "local_review",
    generatedAt: new Date().toISOString(),
    source: input.source,
    overrides: input.overrides,
    annotations: input.annotations,
    vehicleDrafts: input.vehicleDrafts,
  };
}

export function summarizeReviewPacket(packet: ReviewPacket): string {
  const lines = [
    "New Vision OS review handoff",
    `Source: ${packet.source}`,
    `Generated: ${packet.generatedAt}`,
    `Content overrides: ${packet.overrides.length}`,
    `Annotations: ${packet.annotations.length}`,
    `Vehicle draft notes: ${packet.vehicleDrafts.length}`,
    "",
  ];

  for (const item of packet.overrides) {
    lines.push(`Content: ${item.sectionId}.${item.field} -> ${item.value}`);
  }
  for (const item of packet.annotations) {
    lines.push(`Annotation (${item.priority}): ${item.sectionId} -> ${item.note}`);
  }
  for (const item of packet.vehicleDrafts) {
    lines.push(`Vehicle draft (${item.action}): ${item.vehicleSlug} -> ${item.note}`);
  }

  return lines.join("\n");
}
