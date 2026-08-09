import type { ChallengeSpec } from "./types";

export const DETAILS_7_12: Record<number, ChallengeSpec> = {
  7: {
    day: 7,
    title: "A habit tracker in one HTML file",
    tagline: "consistency, file size 14KB",
    description:
      "One file, one habit, one purpose. A tiny tracker you can open by double-clicking: mark the habit, burn the streak, cop the grid. No setup, no install.",
    whyItMatters:
      "A full product shipped in a single file teaches scoping better than any tutorial. Day 7 is your week-one mini thesis: you can ship.",
    whatToShip: [
      "Mark / unmark today with minimal friction",
      "A 7-day strip showing the current streak",
      "State survives a refresh (localStorage)",
      "The whole app in a single HTML file",
    ],
    difficulty: "easy",
    estimatedMinutes: 45,
    skill: "Scope control, localStorage, pacing",
    phase: "Foundation",
  },
  8: {
    day: 8,
    title: "A git cheat-sheet page",
    tagline: "the commands you actually need, one screen",
    description:
      "A fast, filterable reference of the ~15 git commands a student actually uses, with plain-language examples. This becomes your own documentation system.",
    whyItMatters:
      "Documenting for yourself is a habit that compounds. A cheat-sheet you write by hand is the one you will actually remember.",
    whatToShip: [
      "A searchable list of commands with meaning + example",
      "Copy-to-clipboard on every snippet",
      "Keyboard-first: press / to focus search",
      "GitHub repo with the README as the docs",
    ],
    difficulty: "easy",
    estimatedMinutes: 60,
    skill: "Git literacy, search UI, docs",
    phase: "Foundation",
  },
  9: {
    day: 9,
    title: "A todo CLI with priorities",
    tagline: "what you should do before noon, ranked",
    description:
      "add, list, done, delete - but with priorities and a 'what now' command that reads the queue out loud. Data lives in a single JSON file.",
    whyItMatters:
      "Your own tools are the honest benchmark of a developer. If it annoys you, you'll fix it - that is product instinct, exercised.",
    whatToShip: [
      "add / list / done / rm / clear subcommands",
      "A priority column and a 'now' suggestion",
      "Persistence to ~/notes/todos.json",
      "README with usage examples, like real software",
    ],
    difficulty: "intermediate",
    estimatedMinutes: 75,
    skill: "CLI parsing, file I/O, data design",
    phase: "Foundation",
  },
  10: {
    day: 10,
    title: "First milestone: 10 builds",
    tagline: "review the first week in public",
    description:
      "No new feature today. Look at days 1-9: delete the worst commit, fix the best one, and write a one-page retro about what changed in you.",
    whyItMatters:
      "Milestones are where people quit. Ten days of proof makes you the 1% of students who actually reviewed their own work.",
    whatToShip: [
      "A retro page (or post) covering all ten builds",
      "At least one improvement shipped back",
      "The 10-day streak state, documented in public",
      "A screenshot row: day 1 vs day 10 code",
    ],
    difficulty: "easy",
    estimatedMinutes: 45,
    skill: "Reflection, refactoring, writing",
    phase: "Foundation",
  },
  11: {
    day: 11,
    title: "A live markdown previewer",
    tagline: "type left, rendered right",
    description:
      "A two-pane editor where the right side is your markdown, live. Split view, synchronized scrolling, and a searchable word count.",
    whyItMatters:
      "You built a renderer on day 4. This day turns it into a product: take what you built, and make it feel good. Composition beats starting over.",
    whatToShip: [
      "Two-pane split: type left, preview right",
      "Debounced rendering (no jank on long docs)",
      "A word count strip with a reading-time figure",
      "Reuse your own day-4 parser, not a library",
    ],
    difficulty: "intermediate",
    estimatedMinutes: 75,
    skill: "Composition, debouncing, layout",
    phase: "Ship the Web",
  },
  12: {
    day: 12,
    title: "A weather dashboard",
    tagline: "live data, 3-day forecast, zero excuses",
    description:
      "Search a city, get current weather and a three-day forecast in a clean dashboard. Real data, loading skeletons, graceful errors - production thinking.",
    whyItMatters:
      "APIs and their state machines (loading/error/empty) are where assignments become products. This is day 12 because it is the first 'real app' a recruiter scrolls past.",
    whatToShip: [
      "A city search that fetches and shows current weather",
      "A 3-day forecast strip with min/max temps",
      "Loading skeleton, error state, and an empty state",
      "A last-updated timestamp, and a units toggle (C/F)",
      "README with a deployed demo link",
    ],
    difficulty: "intermediate",
    estimatedMinutes: 60,
    skill: "APIs, data fetching, state",
    phase: "Ship the Web",
  },
};