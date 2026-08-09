import type { Metadata } from "next";
import { DayWorkspace } from "@/components/day/day-workspace";
import { getChallenge } from "@/lib/curriculum";
import { parsePreset } from "@/lib/preset";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const day = Number(id);
  const spec = Number.isInteger(day) ? getChallenge(day) : null;
  return {
    title: spec ? `Day ${spec.day} — ${spec.title}` : "ABTalks Challenge Day",
    description: spec?.description,
  };
}

export default async function DayPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ state?: string }>;
}) {
  const [{ id }, sp] = await Promise.all([params, searchParams]);
  const day = Number(id);
  const safe = Number.isInteger(day) && day >= 1 && day <= 60 ? day : 12;
  const preset = parsePreset(sp.state ?? null);
  // key remounts the workspace when ?state= changes so the store reseeds.
  return <DayWorkspace key={`${safe}:${preset ?? "saved"}`} day={safe} preset={preset} />;
}