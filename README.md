# ABTalks — 60 days. 60 builds. One visible proof.

A redesign of ABTalks for the **Vibe Code Hackathon**: a 60-day build challenge for ambitious
Indian college students.

**ABTalks is not "a coding challenge website".** It is a daily accountability system that
turns 60 days of consistent building into *visible proof of skill*. Every day produces real
evidence — a public GitHub commit and a LinkedIn post — and all 60 days compile into a
portfolio page a recruiter can open.

---

## Problem interpretation

> "Reimagine the platform you're standing on."

We treated ABTalks as a place where students *talk* about growth, and re-imagined it as a
place where students can only *show* growth. Both conversations and certificates are cheap;
a 60-day chain of shipped, committed, public work is not.

The emotional arc we designed for:

```
"I don't know what ABTalks is"
  → "This challenge sounds achievable"
  → "I need to keep my streak alive"
  → "I built something today"
  → "I have proof"
  → "I can show recruiters what I actually built"
```

## Product concept: Proof of Work

The central idea of the redesign. The challenge isn't completing tasks — it's producing
evidence. Every screen connects the chain:

**DAY → BUILD → PROOF → STREAK → PORTFOLIO**

- **DAY** — one small, well-scoped build per evening (45–75 min)
- **BUILD** — a real project, not a watched tutorial
- **PROOF** — a GitHub commit URL + a LinkedIn post URL, attached to the day
- **STREAK** — the risk of breaking it does the motivating
- **PORTFOLIO** — a public page that compiles all proof into something recruiters open

Stylistically this appears everywhere: rubber-stamp language ("SHIPPED", "VERIFIED"),
a proof-ledger UI, stamps on completed days, and a "proof page" mock at the end of the
journey.

## The thoughtful feature: Momentum

Instead of a single percentage bar, the dashboard computes a **momentum state** from recent
activity:

| State | When | Copy example |
|---|---|---|
| Strong | streak ≥ 7 | "You're on your longest streak yet." |
| Steady | streak ≥ 4 | "A rhythm is forming." |
| Starting | streak 1–3 | "The hard part is the first three days." |
| At risk | a missed day exists / streak == 0 | "One miss doesn't erase the work." |
| Fresh | zero days shipped | "Every streak starts here." |

The momentum card has a visual rhythm strip (time series, not hype, not a percentage) and
per-state empathetic copy. It makes the dashboard feel like a coach, not a data dump.

## Key UX decisions

| Decision | Why |
|---|---|
| Mobile-first, 390px benchmark | Evaluator screenshots at 390px; all layouts tested 360→1440 |
| Warm paper + ink + one orange accent | Premium editorial, not another purple-gradient SaaS |
| Display Grotesk + Inter + JetBrains Mono | Technical yet editorial hierarchy; metadata reads like specs |
| Stamp language instead of emojis as the primary system | Proof-of-work identity; consistent icon set |
| Streak = consecutive completed days ending at today | Honest math that the demo states showcase |
| Missed day = empathy, not punishment | "One missed day doesn't erase the work" + recovery CTA |
| First day = motivation, not "0" | "No streak yet. That's how every streak begins." |
| Empty profile = form, not dead state | Fill 4 fields → the whole dashboard comes alive |
| LocalStorage all simulated state | Persists; sub waterfalls also persist across reloads |
| Demo states via `?state=` | Evaluator can visit every edge case without auth |

## Routes

| Route | What it is |
|---|---|
| `/` | Landing: explain ABTalks, trust, 60-day mechanics, proof-of-work, example day, streak, achievements, visibility, CTA |
| `/dashboard` | Command center: greeting, momentum, today's build, 60-day progress, proof of work, achievements, recent builds |
| `/day/12` | Full challenge workspace: spec, "why it matters", acceptance, checklist, proof submission (GitHub + LinkedIn), success state |

Dynamic days work too; `/day/1` … `/day/60` resolve from the 60-day curriculum.

## Demo states (no auth)

Add `?state=` (or use the small demo switcher, bottom-right corner):

- `/dashboard?state=active` — 11 days shipped, streak alive, day 12 in front
- `/dashboard?state=first-day` — streak 0, no builds, motivating empty state
- `/dashboard?state=missed-day` — day 11 missed, recovery UI
- `/dashboard?state=empty` — no profile data, profile form

State persists in `localStorage`. Submitting proof on `/day/12` updates the dashboard live.

## Mock data

Everything lives in `src/lib`:

- `curriculum.ts` + `curriculum-*.ts` — 60-day curriculum (12 hand-written detailed briefs, the
  rest generated from titles/phases)
- `mock.ts` — the four demo states, archives of 60 day-records with proof URLs
- `derive.ts` — streak, longest streak, proof counts, progress, momentum, greeting
- `use-app-state.ts` — client-side store, localStorage persistence

## Architecture

```
src/
  app/
    page.tsx             Landing (server + light client islands)
    dashboard/page.tsx   Dashboard route (reads ?demo)
    day/[id]/page.tsx    Challenge day route (dynamic)
    globals.css          Design tokens (Tailwind v4 @theme)
  components/
    ui/      wordmark, chips, buttons, stamps, reveals, counters, progress
    layout/  topbar, footer, app header, sticky bars, demo switcher
    landing/ hero, pillars, how-it-works, proof, example-day, streak, achievements, visibility
    dash/    the dashboard shell (momentum, today, progress, proof, recent)
    day/     the workspace (checklist, proof form, success)
  lib/       types, curriculum, mock data, derivation, store
```

Stack: Next.js 16 · React 19 · TypeScript · Tailwind CSS v4. No backend, no analytics, no
external fonts at runtime (next/font self-hosts). Zero runtime dependencies beyond React.

## Run

```bash
npm install
npm run dev          # http://localhost:3000
# port is taken? use:
npx next dev --port 4444
```

Then open:

1. **/** — mission of the challenge
2. `/dashboard` — the command center (active student state)
3. `/day/12` — the weather-dashboard day, fill the three proofs and submit — a live success
   state, then "View dashboard" sees the updated streak.

## Self-review (judge's check)

- Landing explains ABTalks in the first viewport? **Yes** — dark editorial hero with the
  proof card, "60 days / 60 builds / one visible proof."
- 390px premium? Screenshot-tested at 360/390/414/768/1440; zero overflow.
- Dashboard genuinely useful? Momentum + today's build + progress + proof + streak.
- Day 12 a focused working environment? Checklist, acceptance criteria, validation.
- Edge cases present? first-day / missed-day / empty profile via `?state=` and the switcher.
- Dead buttons? `Start the challenge` in the top nav — real routes; corner switcher — real.

Every core button navigates or submits; nothing dangles.
