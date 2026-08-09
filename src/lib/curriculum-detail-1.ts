import type { ChallengeSpec } from "./types";

/** Hand-written, detailed briefs for the days a student will actually open. */
export const DETAIL_1_6: Record<number, ChallengeSpec> = {
  1: {
    day: 1,
    title: "A static page about you, deployed",
    tagline: "your name, on the internet, tonight",
    description:
      "Build a one-page site about you or your field. Plain HTML and CSS - no frameworks, no excuses. Deploy it, push it, prove it.",
    whyItMatters:
      "Most beginners never reach the internet. This day makes the internet yours: a URL you control, built by you, in one evening.",
    whatToShip: [
      "A single page with your name and one story you are proud of",
      "Valid semantic HTML and body text that is genuinely readable",
      "One responsive breakpoint that does not look broken at 390px",
      "A contact link that actually works",
      "Deployed URL in your README, repo pushed to GitHub",
    ],
    difficulty: "warmup",
    estimatedMinutes: 45,
    skill: "HTML, CSS, deployment",
    phase: "Foundation",
  },
  2: {
    day: 2,
    title: "A readable CLI about page",
    tagline: "your story, rendered in a terminal",
    description:
      "Write a script that prints a formatted 'about you' page in a terminal: headers, rows, a footer - with colour, alignment and no copy-paste mistakes.",
    whyItMatters:
      "Terminal literacy is the quiet skill that separates real developers from tutorial developers. Day 2 turns the terminal into a publishing tool.",
    whatToShip: [
      "A script that prints a styled page about you",
      "At least one colour and one aligned table",
      "A --json flag that emits the same facts as data",
      "Pushed to a public GitHub repo with a README",
    ],
    difficulty: "easy",
    estimatedMinutes: 45,
    skill: "CLI, scripting, formatting",
    phase: "Foundation",
  },
  3: {
    day: 3,
    title: "A typing speed meter",
    tagline: "measure the speed of you",
    description:
      "A minimal typing test: pick a phrase, start typing, and get words-per-minute, accuracy, and the exact keys you fumbled. Vanilla JS only.",
    whyItMatters:
      "It forces you to coordinate DOM events, timing and input state - the exact trio every real app trusts, without a framework to hide it.",
    whatToShip: [
      "A phrase shown, typed, and compared live",
      "A WPM and accuracy result screen",
      "A top-5 local leaderboard (localStorage is fine)",
      "Keyboard-driven: Restart must respect the R key",
    ],
    difficulty: "easy",
    estimatedMinutes: 60,
    skill: "JavaScript, DOM events, timing",
    phase: "Foundation",
  },
  4: {
    day: 4,
    title: "A markdown to HTML renderer",
    tagline: "write like a developer, render like one too",
    description:
      "Take markdown text and render it as HTML: headings, bold, lists, links and code blocks. No library - your own tiny parser.",
    whyItMatters:
      "Parsing is where 'I can code UI' becomes 'I understand programs'. A 200-line parser teaches you more than a 2000-line course.",
    whatToShip: [
      "Headings, bold/italic, lists and links render correctly",
      "Inline code plus fenced code blocks",
      "A paste-and-render page with live output",
      "One screenshot in the README, honestly taken",
    ],
    difficulty: "intermediate",
    estimatedMinutes: 75,
    skill: "Parsing, regex, module design",
    phase: "Foundation",
  },
  5: {
    day: 5,
    title: "A password strength evaluator",
    tagline: "estimate strength, argue with it",
    description:
      "Take a password, score it, and explain why. Show cracking-time estimates and a bar that moves. Never store a single character after the score.",
    whyItMatters:
      "A tiny security product teaches validation, state, and trust. The bar that moves is the same skill as the graphs you will ship later.",
    whatToShip: [
      "A live score bar as you type",
      "An explanation list: why the score is what it is",
      "Cut-off message for overly long strings; a 256-char cap",
      "README with your scoring rules documented",
    ],
    difficulty: "easy",
    estimatedMinutes: 60,
    skill: "Validation, UX state, security basics",
    phase: "Foundation",
  },
  6: {
    day: 6,
    title: "A meme text generator",
    tagline: "captions, but with a backend of zero",
    description:
      "Pick a template or two, type a caption, and download a ready-to-post image. A tiny canvas-based machine for the always-need-one-meme problem.",
    whyItMatters:
      "Canvas drawing, exports, and a product that is genuinely fun - proof that shipping small things people like is a core developer skill.",
    whatToShip: [
      "Two classic templates, rendered on canvas",
      "Wrapped caption text that never leaves the frame",
      "A download button producing a clean image",
      "Max font size auto-fit so text is always readable",
    ],
    difficulty: "easy",
    estimatedMinutes: 60,
    skill: "Canvas 2D, export, layout",
    phase: "Foundation",
  },
};