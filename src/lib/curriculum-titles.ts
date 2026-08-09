export const TOTAL_DAYS = 60;

export interface Phase {
  from: number;
  to: number;
  name: string;
  blurb: string;
}

export const PHASES: Phase[] = [
  { from: 1, to: 10, name: "Foundation", blurb: "Terminals, markdown and small real tools - built and shipped from day one." },
  { from: 11, to: 24, name: "Ship the Web", blurb: "HTML, CSS and JavaScript that actually does something." },
  { from: 25, to: 38, name: "Full-stack & Depth", blurb: "Local APIs, state and bigger systems. Projects become products." },
  { from: 39, to: 52, name: "Go Deeper", blurb: "Tooling and craft. Spend a week making a few things genuinely good." },
  { from: 53, to: 60, name: "Public Portfolio", blurb: "Turn every build into a page a recruiter actually wants to open." },
];

export function phaseForDay(day: number): Phase {
  for (const p of PHASES) if (day >= p.from && day <= p.to) return p;
  return PHASES[0];
}

/** One line per day: title + tagline, used as fallback content. */
export const TITLES: { day: number; title: string; tagline: string }[] = [
  { day: 1, title: "A static page about you, deployed", tagline: "your name, on the internet, tonight" },
  { day: 2, title: "A readable CLI about page", tagline: "your story, rendered in a terminal" },
  { day: 3, title: "A typing speed meter", tagline: "measure the speed of you" },
  { day: 4, title: "A markdown to HTML renderer", tagline: "write like a developer, render like one too" },
  { day: 5, title: "A password strength evaluator", tagline: "estimate strength, argue with it" },
  { day: 6, title: "A meme text generator", tagline: "captions, but with a backend of zero" },
  { day: 7, title: "A habit tracker in one HTML file", tagline: "consistency, file size 14KB" },
  { day: 8, title: "A git cheat-sheet page", tagline: "the commands you actually need, one screen" },
  { day: 9, title: "A todo CLI with priorities", tagline: "what you should do before noon, ranked" },
  { day: 10, title: "First milestone: 10 builds", tagline: "review the first week in public" },
  { day: 11, title: "A live markdown previewer", tagline: "type left, rendered right" },
  { day: 12, title: "A weather dashboard", tagline: "live data, 3-day forecast, zero excuses" },
  { day: 13, title: "A Pomodoro timer with focus stats", tagline: "25 minutes and a graph is a strong duo" },
  { day: 14, title: "A URL shortener (local engine)", tagline: "share a link, keep it short" },
  { day: 15, title: "A GitHub profile card generator", tagline: "make your profile easier to stare at" },
  { day: 16, title: "An image to emoji mosaic", tagline: "pictures, pixel by pixel, emoji by emoji" },
  { day: 17, title: "A CSS-only day counter", tagline: "no JavaScript, many rectangles" },
  { day: 18, title: "A quiz builder for your classmates", tagline: "questions with two wrong answers and one right" },
  { day: 19, title: "A one-page portfolio, no glitter", tagline: "the hard version of minimalism" },
  { day: 20, title: "A web fetch playground", tagline: "curl in the browser minus the memorised flags" },
  { day: 21, title: "A local REST API for books", tagline: "CRUD on paper, literally" },
  { day: 22, title: "A photo warmth slider", tagline: "any image, warmer or cooler, instantly" },
  { day: 23, title: "A keyboard-first navigation demo", tagline: "never touch a mouse for a day" },
  { day: 24, title: "A landing page in 24 sections", tagline: "one long page, twenty-four stacks" },
  { day: 25, title: "A fantasy dice set", tagline: "d4 to d20, rendered with love" },
  { day: 26, title: "A clock with personality", tagline: "analog, digital, Wednesday" },
  { day: 27, title: "A CSV to JSON converter", tagline: "the moment spreadsheets become code" },
  { day: 28, title: "A markdown resume from JSON", tagline: "one source of truth, infinite careers" },
  { day: 29, title: "A local notes app with search", tagline: "your second brain, self-hosted" },
  { day: 30, title: "A public API for your portfolio", tagline: "endpoints even strangers can hit" },
  { day: 31, title: "A small state machine lab", tagline: "states, transitions, tests, calm" },
  { day: 32, title: "A web scraper for college notices", tagline: "the information was always there" },
  { day: 33, title: "A quiz leaderboard with streaks", tagline: "competition and consistency combined" },
  { day: 34, title: "A free-weather API wrapper", tagline: "with docs you wrote yourself" },
  { day: 35, title: "A queued image compressor", tagline: "slow it down to make it better" },
  { day: 36, title: "A budget splitter for hostels", tagline: "settle up without the awkward" },
  { day: 37, title: "A portfolio dark-mode pass", tagline: "the gallery begins" },
  { day: 38, title: "A backup script you would trust", tagline: "for science, and for your sem project" },
  { day: 39, title: "A localStorage resume builder", tagline: "export JSON, import anywhere" },
  { day: 40, title: "A keyboard shortcut sheet", tagline: "the tool you can't remember, remembered" },
  { day: 41, title: "A read-aloud notes player", tagline: "let your notes read themselves to you" },
  { day: 42, title: "A git log visualizer", tagline: "your history as a map" },
  { day: 43, title: "A tiny pipeline runner", tagline: "a mini engine for mini workflows" },
  { day: 44, title: "An RSS reader that respects you", tagline: "a feed you actually skim" },
  { day: 45, title: "A single-file browser extension", tagline: "code that hides inside the browser" },
  { day: 46, title: "A week-three personal retro", tagline: "honest, private, useful" },
  { day: 47, title: "A no-spam contact page", tagline: "one button, zero inbox rot" },
  { day: 48, title: "A local file globber", tagline: "match files with brains" },
  { day: 49, title: "A static site builder for one folder", tagline: "markdown goes in, HTML walks out" },
  { day: 50, title: "A JSON playground", tagline: "validate, transform, iterate fast" },
  { day: 51, title: "A focus heatmap calendar", tagline: "data about you, that you actually like" },
  { day: 52, title: "Refactor day: delete more than you add", tagline: "the quietest week of the year" },
  { day: 53, title: "Portfolio page v2", tagline: "the page that sells the 59 builds before it" },
  { day: 54, title: "An impossible 404 page", tagline: "the detail recruiters notice" },
  { day: 55, title: "A public projects index", tagline: "every build, one link" },
  { day: 56, title: "Performance notes on your portfolio", tagline: "measure before you polish" },
  { day: 57, title: "A lighthouse report, honestly", tagline: "scores, screens, a plan" },
  { day: 58, title: "A build diary, final week", tagline: "write the story people will cite" },
  { day: 59, title: "Proof sections under every build", tagline: "commit links behave like citations" },
  { day: 60, title: "Day 60: your proof page", tagline: "the whole 60 days, on one scroll" },
];