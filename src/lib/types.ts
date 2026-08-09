export type DemoPreset = "active" | "first-day" | "missed-day" | "empty";
export type DemoState = DemoPreset;

export type DayStatus = "completed" | "missed" | "current" | "upcoming";

export type Difficulty = "Warm-up" | "Easy" | "Intermediate" | "Hard";

export interface DayProof {
  repoUrl?: string;
  commitUrl?: string;
  postUrl?: string;
  submittedAt?: string;
}

export interface DayRecord {
  day: number;
  status: DayStatus;
  proof?: DayProof;
}

export interface Profile {
  filled: boolean;
  name?: string;
  college?: string;
  collegeCity?: string;
  githubHandle?: string;
  linkedinHandle?: string;
}

export interface ChallengeSpec {
  day: number;
  title: string;
  tagline: string;
  description: string;
  whyItMatters: string;
  whatToShip: string[];
  difficulty: DayDifficulty;
  estimatedMinutes: number;
  skill: string;
  phase: string;
}

export type DayDifficulty = "warmup" | "easy" | "intermediate" | "hard";

export interface AppState {
  preset: DemoPreset;
  profile: Profile;
  currentDay: number;
  days: DayRecord[];
  startedAt: string;
  totalDays: number;
}

export type AppAction =
  | { type: "submit-proof"; day: number; proof: DayProof }
  | { type: "save-profile"; profile: Profile };