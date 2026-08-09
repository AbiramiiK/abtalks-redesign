import type { AppState, DayRecord, DayStatus, Profile } from "./types";
import { TOTAL_DAYS } from "./curriculum-titles";

type MockKey = "active" | "first-day" | "missed-day" | "empty";

const PROFILE: Profile = {
  filled: true,
  name: "Sanjay",
  college: "PSG College of Technology",
  collegeCity: "Coimbatore",
  githubHandle: "sanjay-iyer",
  linkedinHandle: "sanjayiyer",
};

function daysArchive(completedUpto: number, opts?: { missingPosts?: number[]; missed?: number[] }): DayRecord[] {
  const records: DayRecord[] = [];
  const completed = Math.min(completedUpto, TOTAL_DAYS);
  for (let d = 1; d <= TOTAL_DAYS; d++) {
    let status: DayStatus = "upcoming";
    if (d <= completed) status = "completed";
    if (opts?.missed?.includes(d)) status = "missed";
    let proof: DayRecord["proof"];
    if (status === "completed") {
      const post = !opts?.missingPosts?.includes(d);
      proof = {
        repoUrl: `https://github.com/sanjay-iyer/abtalks-day-${d}`,
        commitUrl: `https://github.com/sanjay-iyer/abtalks-day-${d}/commit/9f2c${d.toString().padStart(2, "0")}1a`,
        postUrl: post
          ? `https://www.linkedin.com/feed/update/urn:li:activity:72${d.toString().padStart(2, "0")}1842`
          : undefined,
        submittedAt: new Date(Date.UTC(2026, 6, 20 + d, 18, 30)).toISOString(),
      };
    }
    records.push({ day: d, status, proof });
  }
  return records;
}

function baseState(overrides: Partial<AppState>): AppState {
  return {
    preset: "active",
    profile: PROFILE,
    currentDay: 12,
    days: daysArchive(11),
    startedAt: "2026-07-19T09:00:00.000Z",
    totalDays: TOTAL_DAYS,
    ...overrides,
  };
}

/** The flagship experience: 11 days shipped, streak alive, day 12 in front. */
export function activeState(): AppState {
  return baseState({
    preset: "active",
    days: daysArchive(11, { missingPosts: [4, 10] }),
  });
}

/** Brand-new student: nothing shipped yet, day 1 waiting. */
export function firstDayState(): AppState {
  return baseState({
    preset: "first-day",
    currentDay: 1,
    days: daysArchive(0),
    startedAt: new Date().toISOString(),
  });
}

/** Missed day 11. Previous best 10. Empathetic recovery state. */
export function missedDayState(): AppState {
  return baseState({
    preset: "missed-day",
    days: daysArchive(10, { missingPosts: [3, 8], missed: [11] }),
  });
}

/** Everything active, but the profile is empty. */
export function emptyProfileState(): AppState {
  return baseState({
    preset: "empty",
    profile: { filled: false },
  });
}

export const STATE_BUILDERS: Record<MockKey, () => AppState> = {
  active: activeState,
  "first-day": firstDayState,
  "missed-day": missedDayState,
  empty: emptyProfileState,
};

export const STATE_LABELS: Record<MockKey, { label: string; hint: string }> = {
  active: { label: "Active student", hint: "11-day streak, mid-challenge" },
  "first-day": { label: "First day", hint: "0 streak, no builds yet" },
  "missed-day": { label: "Missed day", hint: "streak broken, recovery" },
  empty: { label: "Empty profile", hint: "no profile data" },
};