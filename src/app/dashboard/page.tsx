import type { Metadata } from "next";
import { DashboardShell } from "@/components/dash/dashboard-page";
import { parsePreset } from "@/lib/preset";

export const metadata: Metadata = {
  title: "Dashboard — ABTalks 60-Day Build Challenge",
  description: "Your challenge command center: today's build, streak, momentum, proof of work.",
};

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ state?: string }>;
}) {
  const { state: raw } = await searchParams;
  const preset = parsePreset(raw ?? null);
  // key remounts the shell when ?state= changes via the demo widget, so the
  // store seeds fresh instead of keeping the previous preset's state.
  return <DashboardShell key={preset ?? "saved"} preset={preset} />;
}