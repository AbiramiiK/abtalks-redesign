"use client";

import { useEffect, useMemo, useState } from "react";
import type { AppAction, AppState, DemoPreset } from "./types";
import { STATE_BUILDERS } from "./mock";
import { parsePreset } from "./preset";

export const STORAGE_KEY = "abtalks:proof:v1";
export { parsePreset };

function loadSaved(): AppState | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw) as AppState;
    if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.days)) return undefined;
    return parsed;
  } catch {
    return undefined;
  }
}

function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "submit-proof": {
      const { day, proof } = action;
      const days = state.days.map((d) => {
        if (d.day !== day) return d;
        return { ...d, status: "completed" as const, proof: { ...proof, submittedAt: new Date().toISOString() } };
      });
      return {
        ...state,
        days,
        currentDay: Math.max(state.currentDay, day + 1),
      };
    }
    case "save-profile": {
      return { ...state, profile: action.profile };
    }
  }
}

interface Options {
  /** Seed preset passed from the server (from ?state=). Fresh when undefined. */
  preset?: DemoPreset;
}

export function useAppState({ preset }: Options = {}) {
  const [state, setState] = useState<AppState>(() => {
    if (preset) return STATE_BUILDERS[preset]();
    return loadSaved() ?? STATE_BUILDERS.active();
  });

  useEffect(() => {
    if (preset) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable - fine for a demo */
    }
  }, [state, preset]);

  const dispatch = useMemo<React.Dispatch<AppAction>>(() => {
    return (action) => setState((prev) => reducer(prev, action));
  }, []);

  return { state, dispatch };
}