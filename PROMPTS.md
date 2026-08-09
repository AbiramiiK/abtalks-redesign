# PROMPTS.md — AI prompt log

> The hackathon checks whether this project was genuinely built during the event.
> This file records the actual prompts used, in order, with the commit/stage they map to.

| # | What I asked the AI | Where the work landed |
|---|---|---|
| 1 | Inspect the existing repo; if empty, initialize a Next.js app | `npx create-next-app` scaffold, moved to workspace root, `git init` — setup |
| 2 | Read the version-matched Next.js 16 docs bundled in `node_modules/next/dist/docs/` (layouts, params/searchParams, fonts) before writing any code | Noted async `params`/`searchParams`, `next/font` — used across all routes |
| 3 | "Establish a design system for ABTalks: warm paper background, ink type, one signal-orange accent, editorial + technical typography (Space Grotesk / Inter / JetBrains Mono), stamp language for 'proof of work', restrained motion, mobile-first at 390px" | `src/app/globals.css`, `layout.tsx` |
| 4 | "Write the mock data layer: types, a realistic 60-day Indian-college-student curriculum (full briefs each holding objective/why/ship-list/difficulty/effort), four demo states — active student, first day ever, missed day, empty profile" | `src/lib/types.ts`, `curriculum*.ts`, `mock.ts` |
| 5 | "Derive streak, longest streak, proof counts, progress and the Momentum feature (strong / steady / starting / at-risk / fresh) with empathetic copy" | `src/lib/derive.ts` |
| 6 | "Build the client-side store: localStorage persistence, ?state= presets, submit-proof and save-profile actions" | `src/lib/use-app-state.ts` |
| 7 | "Create a consistent icon system + UI primitives: buttons, chips, stamps (rotated mono proof labels), scroll reveals that are screenshot-safe, counters, progress bar/ring" | `src/components/icons.tsx`, `ui/*` |
| 8 | "Layout: sticky topbar, footer, app header with back, sticky bottom action bar, quiet dev-only demo switcher (bottom-right corner)" | `src/components/layout/*` |
| 9 | "Build the landing page in 10 sections: hero with proof-of-work card, deal pillars, how the 60 days work (phases + first-week strip), proof ledger, embedded example day workspace, streak visualization, achievements, recruiter page mock, final CTA" | `src/app/page.tsx`, `components/landing/*` |
| 10 | "Build the dashboard command center: greeting, momentum card with rhythm strip, today's build, 60-day progress with ring, proof-of-work stats, achievements state, recent builds archive, empty-profile form, sticky bottom 'continue today's build'" | `src/components/dash/*` |
| 11 | "Build the challenge-day workspace at routing /day/[id]: spec + why-it-matters + acceptance, interactive checklist that auto-completes from proof fields, validated GitHub repo/commit/LinkedIn submissions, success screen with stamp animation" | `src/components/day/*`, `src/app/day/[id]/page.tsx` |
| 12 | "QA like an evaluator: run the dev server, curl all routes, playwright sweep at 360/390/414/768/1440px for horizontal overflow and console errors; fix what breaks" | found & fixed: hero frame overflow, example-day grid min-width, client/server `parsePreset` split — all clean |
| 13 | "Write README + this file; polish copy and a 404 page matching the product voice" | `README.md`, `PROMPTS.md`, `src/app/not-found.tsx` |

## How the state/`demo` flag works

- `/dashboard?state=active` — the flagship "mid-challenge" experience
- `/dashboard?state=first-day` — brand-new student (0 builds, motivating empty state)
- `/dashboard?state=missed-day` — day-11 miss, empathetic recovery UI
- `/dashboard?state=empty` — no profile data, inline profile form

Add `?state=` to the dashboard; the corner switcher generates these links. All state lives
in `localStorage` under `abtalks:proof:v1`, so submissions persist across reloads.

## Time budget

- Design system + data layer ······ ~15%
- Landing page ···················· ~20%
- Dashboard + momentum + states ··· ~20%
- Challenge-day workspace + proof · ~20%
- Mobile/polish + the QA pass on actual runtimes · ~15%
- README / PROMPTS / final check ·· ~10%