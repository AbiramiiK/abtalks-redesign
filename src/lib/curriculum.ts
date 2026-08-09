import type { ChallengeSpec } from "./types";
import { phaseForDay, TITLES } from "./curriculum-titles";
import { DETAIL_1_6 } from "./curriculum-detail-1";
import { DETAILS_7_12 } from "./curriculum-detail-2";

const DETAILS: Record<number, ChallengeSpec> = {
  ...DETAIL_1_6,
  ...DETAILS_7_12,
};

const FALLBACK_WHY = [
  "Small, well-scoped builds beat long, abandoned ones. This project teaches a repeatable pattern: pick, ship, prove, move on.",
  "Consistency compounds. Today is one brick - tomorrow it is a portfolio that earns its place in an interview.",
  "A beginner trembling at the terminal learns more in one build than in ten hour-long videos.",
  "This build is deliberately small. Small is shippable, and shippable beats perfect.",
  "Every build here feeds a streak, and a streak is a story a recruiter can read in two seconds.",
];

const FALLBACK_SHIP = [
  "A clean, working core - no half-finished features",
  "At least one edge case handled (empty, error, or long input)",
  "README with a one-line title and a screenshot",
  "Pushed to a public GitHub repo",
  "One LinkedIn post with the link and what you learned",
];

const FALLBACK_DESC_READ = [
  "For this build you work with real inputs, real constraints and one strong output, then you ship it cold in public.",
  "Scope it to an evening. The trick is deciding what NOT to build.",
  "Keep it honest: plain tools first, frameworks when they save time.",
];

const DIFFICULTY_RULE: Record<number, ChallengeSpec["difficulty"]> = {
  16: "easy",
  21: "intermediate",
  25: "intermediate",
  30: "intermediate",
  34: "intermediate",
  38: "hard",
  43: "intermediate",
  45: "intermediate",
  49: "intermediate",
  53: "hard",
  56: "hard",
  60: "hard",
};

const MINUTE_RULE: Record<number, number> = {
  4: 75,
  9: 75,
  11: 75,
  12: 60,
  20: 45,
  26: 45,
  30: 60,
  36: 60,
  44: 45,
  53: 75,
  56: 60,
  57: 45,
  60: 75,
};

export function getChallenge(day: number): ChallengeSpec {
  const clamped = Math.max(1, Math.min(60, day));
  const hand = DETAILS[clamped];
  if (hand) return hand;

  const line = TITLES.find((t) => t.day === clamped);
  if (!line) return DETAILS[12];

  const idx = (clamped * 7) % FALLBACK_WHY.length;
  const descIdx = (clamped * 3) % FALLBACK_DESC_READ.length;
  const difficulty = DIFFICULTY_RULE[clamped] ?? (clamped % 5 === 0 ? "intermediate" : "easy");
  const estimatedMinutes = MINUTE_RULE[clamped] ?? (clamped % 4 === 0 ? 75 : 60);

  return {
    day: clamped,
    title: line.title,
    tagline: line.tagline,
    description:
      "Today you build it in the open. " +
      line.tagline +
      ". " +
      FALLBACK_DESC_READ[descIdx],
    whyItMatters: FALLBACK_WHY[idx],
    whatToShip: FALLBACK_SHIP,
    difficulty,
    estimatedMinutes,
    skill: difficulty === "intermediate" ? "systems & data" : "core front-end",
    phase: phaseForDay(clamped).name,
  };
}