"use client";

import { AppHeader, StickyBar } from "@/components/layout/app-header";
import { DemoWidget } from "@/components/layout/demo-widget";
import type { DemoPreset } from "@/lib/types";
import { useAppState } from "@/lib/use-app-state";
import { DashboardContent } from "./dashboard-shell";

function initials(name?: string) {
  if (!name) return "AB";
  return name
    .split(" ")
    .map((s) => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function DashboardShell({ preset }: { preset?: DemoPreset }) {
  const { state, dispatch } = useAppState({ preset });

  return (
    <div className="min-h-dvh">
      <AppHeader
        center={
          <span className="hidden items-center gap-2 sm:flex">
            <span className="rounded-md bg-ink/5 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-mut">
              Cohort 06
            </span>
          </span>
        }
        right={
          <span className="grid h-10 w-10 place-items-center rounded-full border border-line bg-card font-display text-[11px] font-bold text-ink">
            {initials(state.profile.name)}
          </span>
        }
      />
      <main>
        <DashboardContent
          state={state}
          onSaveProfile={(p) =>
            dispatch({
              type: "save-profile",
              profile: { filled: true, ...p },
            })
          }
        />
      </main>
      <StickyBar className="md:hidden">
        <span className="min-w-0 flex-1 truncate font-mono text-[11px] uppercase tracking-[0.14em] text-mut">
          Day {state.currentDay} · unfinished
        </span>
        <a
          href={`/day/${state.currentDay}`}
          className="btn-press shrink-0 rounded-lg bg-ink px-5 py-2.5 text-[13px] font-semibold text-paper transition-colors hover:bg-night-2"
        >
          Continue build
        </a>
      </StickyBar>
      <DemoWidget />
    </div>
  );
}