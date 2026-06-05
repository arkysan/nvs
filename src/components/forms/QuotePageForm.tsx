"use client";

import { useSearchParams } from "next/navigation";
import { QuoteForm } from "@/components/forms/QuoteForm";

export function QuotePageForm() {
  const searchParams = useSearchParams();
  const selectedVehicleSlug = searchParams.get("vehicle") ?? undefined;

  return <QuoteForm selectedVehicleSlug={selectedVehicleSlug} />;
}
