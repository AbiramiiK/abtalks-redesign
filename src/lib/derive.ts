import type { AppState } from "./types";

export interface DerivedStats {
  completed: number;
  missed: number;
  streak: number;
  longestStreak: number;
  commits: number;
  posts: number;
  progressPct: number;
  hasMissedToday: boolean;
}

/** Longest run of consecutive completed days anywhere in the archive. */
function longestRun(days: AppState["days"]): number {
  let best = 0;
  let run = 0;
  for (const d of days) {
    if (d.status === "completed") {
      run += 1;
      best = Math.max(best, run);
    } else if (d.status === "missed") {
      run = 0;
    }
  }
  return best;
}

/** Consecutive completed days ending right before the current day. */
function liveStreak(days: AppState["days"], currentDay: number): number {
  let count = 0;
  for (let d = currentDay - 1; d >= 1; d--) {
    const rec = days.find((r) => r.day === d);
    if (rec?.status === "completed") count += 1;
    else break;
  }
  return count;
}

export function derive(state: AppState): DerivedStats {
  const completed = state.days.filter((d) => d.status === "completed").length;
  const missed = state.days.filter((d) => d.status === "missed").length;
  const streak = liveStreak(state.days, state.currentDay);
  const dayBefore = state.days.find((r) => r.day === state.currentDay - 1);
  const hasMissedToday = !!dayBefore && dayBefore.status !== "completed";
  return {
    completed,
    missed,
    streak,
    longestStreak: Math.max(longestRun(state.days), streak),
    commits: state.days.filter((d) => d.proof?.commitUrl).length,
    posts: state.days.filter((d) => d.proof?.postUrl).length,
    progressPct: Math.round((state.currentDay - 1) / state.totalDays * 100),
    hasMissedToday,
  };
}

export type MomentumLevel = "strong" | "steady" | "starting" | "at-risk" | "fresh";

export interface Momentum {
  level: MomentumLevel;
  label: string;
  headline: string;
  body: string;
  /** 0..1 used for the fill of the momentum strip */
  fill: number;
  /** small mono footer line under the strip */
  footer?: string;
}

const toNextBadge = (s: number) => Math.ceil(s / 7) * 7;

export function getMomentum(state: AppState): Momentum {
  const { completed, streak, longestStreak } = derive(state);
  const name = state.profile.name?.split(" ")[0];

  if (completed === 0) {
    return {
      level: "fresh",
      label: "Fresh",
      headline: "Every streak starts here.",
      body: "No days shipped yet. Day 1 makes it real - and it only takes an evening.",
      fill: 0.04,
      footer: "no streak yet · that is exactly how every streak begins",
    };
  }
  if (state.days.some((d) => d.status === "missed" && d.day < state.currentDay)) {
    return {
      level: "at-risk",
      label: "At risk",
      headline: "One miss doesn't erase the work.",
      body: `You missed a day. Today's build puts you back on the grid. Previous best: ${longestStreak} days.`,
      fill: 0.18,
      footer: "recovery builds tomorrow's best run",
    };
  }
  if (streak === 0) {
    return {
      level: "at-risk",
      label: "At risk",
      headline: "The streak broke. The challenge didn't.",
      body: `Shipped ${completed} days so far. Longest run: ${longestStreak}. Beat it from here.`,
      fill: 0.18,
      footer: "one build restarts the clock",
    };
  }
  if (streak >= 7) {
    return {
      level: "strong",
      label: "Strong",
      headline: `You're on your longest streak yet.`,
      body: `${streak} straight days shipped${name ? `, ${name}` : ""}. This is exactly what momentum feels like.`,
      fill: Math.min(0.9, 0.55 + streak * 0.03),
      footer: "the grid below is your recent rhythm",
    };
  }
  if (streak >= 4) {
    return {
      level: "steady",
      label: "Steady",
      headline: "A rhythm is forming.",
      body: `${streak} days in. ${toNextBadge(streak)} days unlocks the next badge - one build at a time.`,
      fill: 0.3 + streak * 0.04,
      footer: "momentum = recent days, not hype",
    };
  }
  return {
    level: "starting",
    label: "Starting",
    headline: "The hard part is the first three days.",
    body: `${streak} shipped. One more keeps the chain alive.`,
    fill: 0.12 + streak * 0.07,
    footer: "after day 4 the rhythm starts showing",
  };
}

export function greetingFor(now: Date): string {
  const h = now.getHours();
  if (h < 5) return "Up late";
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}