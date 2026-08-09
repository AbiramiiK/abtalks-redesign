import type { DemoPreset } from "./types";

export function parsePreset(raw: string | null | undefined): DemoPreset | undefined {
  if (!raw) return undefined;
  return raw === "active" || raw === "first-day" || raw === "missed-day" || raw === "empty"
    ? raw
    : undefined;
}