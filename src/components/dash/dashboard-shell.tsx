"use client";

import { Chip } from "@/components/ui/wordmark";
import { Icon, type IconName } from "@/components/icons";
import { ProgressBar, ProgressRing } from "@/components/ui/progress";
import { derive, getMomentum, greetingFor, type DerivedStats, type Momentum } from "@/lib/derive";
import type { AppState } from "@/lib/types";
import { getChallenge } from "@/lib/curriculum";

export function DashboardContent({
  state,
  onSaveProfile,
}: {
  state: AppState;
  onSaveProfile: (p: { name: string; college: string; githubHandle: string; linkedinHandle: string }) => void;
}) {
  const stats = derive(state);
  const momentum = getMomentum(state);
  const shippedToday = state.days.some(
    (d) => d.day === state.currentDay && d.status === "completed"
  );

  return (
    <div className="mx-auto w-full max-w-3xl px-5 pb-24 pt-6 md:pb-14">
      <Greeting state={state} stats={stats} />
      {!state.profile.filled ? <ProfilePrompt onSaveProfile={onSaveProfile} /> : null}
      {stats.missed > 0 ? <MissedBanner state={state} stats={stats} /> : null}
      <MomentumCard momentum={momentum} />
      <TodayBuild state={state} shippedToday={shippedToday} />
      <ProgressCard state={state} stats={stats} />
      <ProofStats stats={stats} />
      <AchievementsCard stats={stats} />
      <CurrentArchive state={state} />
    </div>
  );
}

/* ---------------- Greeting ---------------- */

function Greeting({ state, stats }: { state: AppState; stats: DerivedStats }) {
  const firstName = state.profile.name?.split(" ")[0];
  const week = Math.ceil(state.currentDay / 7);
  return (
    <header className="mb-6">
      <p className="eyebrow mb-2">
        Challenge day {state.currentDay} · week {week} of 9
      </p>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-[1.7rem] font-bold leading-tight tracking-tight text-ink sm:text-3xl">
            {greetingFor(new Date())}
            {firstName ? `, ${firstName}.` : "."}
          </h1>
          <p className="mt-1 text-sm text-mut">
            {state.profile.filled
              ? `${stats.completed} days shipped. Today keeps the chain alive.`
              : "Every streak starts with a day 1."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Chip tone="dark">Day {state.currentDay}/60</Chip>
          <Chip tone="accent">
            <Icon name="flame" size={13} className={stats.streak === 0 ? "opacity-50" : ""} />
            {stats.streak}-day streak
          </Chip>
        </div>
      </div>
    </header>
  );
}

/* ---------------- Momentum (thoughtful feature) ---------------- */

const TONE_UI: Record<Momentum["level"], string> = {
  strong: "border-accent/30 bg-card",
  steady: "border-ink/15 bg-card",
  starting: "border-ink/15 bg-card",
  "at-risk": "border-warn/40 bg-warn/[0.06]",
  fresh: "border-ink/15 bg-paper",
};

const TONE_TEXT: Record<Momentum["level"], string> = {
  strong: "text-accent-deep",
  steady: "text-ink",
  starting: "text-ink",
  "at-risk": "text-warn",
  fresh: "text-ink",
};

function MomentumCard({ momentum }: { momentum: Momentum }) {
  return (
    <section
      className={`mb-4 rounded-xl border p-5 ${TONE_UI[momentum.level]}`}
      aria-label="Momentum"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-mut">
          Momentum
        </p>
        <span
          className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.1em] ${TONE_TEXT[momentum.level]} bg-card/70`}
        >
          <Icon name={momentum.level === "at-risk" ? "alert" : "bolt"} size={12} />
          {momentum.label}
        </span>
      </div>
      <h2 className="mt-2.5 font-display text-xl font-bold leading-snug text-ink sm:text-2xl">
        {momentum.headline}
      </h2>
      <p className="mt-1.5 max-w-md text-sm leading-relaxed text-mut">{momentum.body}</p>
      <div className="mt-4" aria-hidden="true">
        <MomentumStrip fill={momentum.fill} />
      </div>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
        {momentum.footer}
      </p>
    </section>
  );
}

export function MomentumStrip({ fill }: { fill: number }) {
  const segments = 18;
  const lit = Math.max(1, Math.min(segments, Math.round(fill * segments)));
  return (
    <div className="flex gap-[3px]" aria-hidden="true">
      {Array.from({ length: segments }).map((_, i) => (
        <span key={i} className={`h-2.5 flex-1 rounded-[2px] ${i < lit ? "bg-ink" : "bg-ink/10"}`} />
      ))}
    </div>
  );
}

/* ---------------- Missed day ---------------- */

function MissedBanner({ state, stats }: { state: AppState; stats: DerivedStats }) {
  const missed = state.days.find((d) => d.status === "missed");
  return (
    <section
      className="mb-4 rounded-xl border border-warn/40 bg-warn/[0.07] p-5"
      role="status"
    >
      <div className="flex items-center gap-2">
        <Icon name="alert" size={15} className="text-warn" />
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-warn">
          Streak interrupted
        </p>
      </div>
      <h2 className="mt-2.5 font-display text-lg font-bold leading-snug text-ink">
        You missed {missed ? `Day ${missed.day}` : "a day"}.
      </h2>
      <p className="mt-1.5 max-w-md text-sm leading-relaxed text-mut">
        One missed day doesn't erase the work already done. Today's build starts the streak
        counting again.
      </p>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <StatTiny label="Previous best" value={`${stats.longestStreak} days`} />
        <StatTiny label="Now" value={`${stats.streak} days`} />
        <StatTiny label="To beat" value={`${stats.longestStreak + 1} days`} />
      </div>
      <p className="mt-3 text-xs leading-relaxed text-mut">
        One shipped build today restarts the count. Longest run so far: {stats.longestStreak}{" "}
        days.
      </p>
    </section>
  );
}

function StatTiny({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-warn/15 bg-card/80 px-3 py-2.5 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mut">{label}</p>
      <p className="mt-0.5 font-display text-base font-bold text-ink tnum">{value}</p>
    </div>
  );
}

/* ---------------- Today's build ---------------- */

function TodayBuild({ state, shippedToday }: { state: AppState; shippedToday: boolean }) {
  const today = getChallenge(state.currentDay);
  return (
    <section className="card mb-4 p-5" aria-label="Today's build">
      <div className="flex items-center justify-between gap-2">
        <p className="eyebrow">Today's build</p>
        {shippedToday ? (
          <Chip tone="good">
            <Icon name="check" size={12} /> Shipped
          </Chip>
        ) : (
          <Chip tone="accent">Due today</Chip>
        )}
      </div>
      <h3 className="mt-1.5 font-display text-xl font-bold leading-snug text-ink sm:text-2xl">
        {today.title}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-mut">{today.tagline}.</p>
      <div className="mt-4 flex flex-wrap gap-2 font-mono text-[11px] uppercase tracking-wider text-mut">
        <span className="inline-flex items-center gap-1.5 rounded-md bg-paper px-2.5 py-1.5">
          <Icon name="clock" size={13} /> {today.estimatedMinutes} min
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-md bg-paper px-2.5 py-1.5">
          <Icon name="gauge" size={13} /> {today.difficulty}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-md bg-paper px-2.5 py-1.5">
          <Icon name="bolt" size={13} /> {today.skill}
        </span>
      </div>
      <div className="mt-5">
        <a
          href={`/day/${state.currentDay}`}
          className="btn-press inline-flex w-full items-center justify-center gap-2 rounded-lg bg-ink px-5 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-night-2 sm:w-auto"
        >
          {shippedToday ? "Review today's build" : "Continue today's build"}
          <Icon name="arrow-right" size={15} />
        </a>
      </div>
    </section>
  );
}

/* ---------------- 60-day progress ---------------- */

function ProgressCard({ state, stats }: { state: AppState; stats: DerivedStats }) {
  const next = 15;
  const diff = next - stats.completed;
  return (
    <section className="card mb-4 p-5" aria-label="Overall progress">
      <div className="flex items-center justify-between gap-3">
        <p className="eyebrow">60-day progress</p>
        <p className="font-mono text-[11px] uppercase tracking-wider text-faint">
          next · day {next} <span className="text-accent-deep">(+{diff})</span>
        </p>
      </div>
      <div className="mt-3 flex items-center justify-between gap-4">
        <p className="font-display text-4xl font-bold tracking-tight text-ink tnum">
          {stats.completed}
          <span className="text-xl text-faint">/{state.totalDays}</span>
        </p>
        <ProgressRing value={Math.max(0, Math.min(100, stats.progressPct))} size={84} stroke={6} label={`${stats.progressPct}%`} sublabel="of run" className="hidden sm:inline-flex" />
        <Chip tone="neutral">{stats.progressPct}%</Chip>
      </div>
      <div className="mt-4">
        <ProgressBar value={stats.progressPct} />
        <div className="mt-2 flex items-center justify-between text-mut">
          <p className="text-xs">
            {stats.completed} shipped · {stats.missed} missed · {state.totalDays - stats.completed - stats.missed} to go
          </p>
          <p className="hidden text-xs sm:block">streak survives at midnight</p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Proof of work ---------------- */

function ProofStats({ stats }: { stats: DerivedStats }) {
  const rows: { icon: IconName; value: number; label: string }[] = [
    { icon: "box", value: stats.completed, label: "builds shipped" },
    { icon: "github", value: stats.commits, label: "github commits" },
    { icon: "linkedin", value: stats.posts, label: "linkedin posts" },
  ];
  return (
    <section className="card mb-4 p-5" aria-label="Proof of work">
      <div className="flex items-center justify-between">
        <p className="eyebrow">Proof of work</p>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-good">
          <Icon name="check" size={11} className="mr-1 inline" /> verified locally
        </span>
      </div>
      <ul className="mt-3 grid gap-2 sm:grid-cols-3">
        {rows.map((r) => (
          <li key={r.label} className="flex items-center gap-3 rounded-lg bg-paper px-3.5 py-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-ink text-paper">
              <Icon name={r.icon} size={16} />
            </span>
            <div>
              <p className="font-display text-lg font-bold leading-none text-ink tnum">{r.value}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-mut">{r.label}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------------- Achievements ---------------- */

interface BadgeDef {
  icon: IconName;
  title: string;
  hint: string;
  earned: boolean;
  progress?: number;
}

function badgeList(stats: DerivedStats): BadgeDef[] {
  return [
    {
      icon: "rocket",
      title: "First ship",
      hint: "day 1 completed",
      earned: stats.completed >= 1,
    },
    {
      icon: "flame",
      title: "7-day streak",
      hint: "a full week",
      earned: stats.longestStreak >= 7,
    },
    {
      icon: "box",
      title: "10 builds",
      hint: "double digits",
      earned: stats.completed >= 10,
      progress: stats.completed,
    },
    {
      icon: "trophy",
      title: "14 builds",
      hint: "quarter of the run",
      earned: stats.completed >= 14,
      progress: stats.completed,
    },
  ];
}

function AchievementsCard({ stats }: { stats: DerivedStats }) {
  const badges = badgeList(stats);
  return (
    <section className="card mb-4 p-5" aria-label="Achievements">
      <div className="flex items-center justify-between">
        <p className="eyebrow">Achievements</p>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
          {badges.filter((b) => b.earned).length} of {badges.length} earned
        </span>
      </div>
      <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {badges.map((b) => (
          <li
            key={b.title}
            className={`rounded-lg border p-3.5 ${b.earned ? "border-line bg-paper" : "border-dashed border-line bg-card"}`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`grid h-8 w-8 place-items-center rounded-md ${b.earned ? "bg-ink text-paper" : "bg-ink/5 text-faint"}`}
              >
                <Icon name={b.icon} size={15} />
              </span>
              {b.earned ? (
                <Icon name="check" size={14} className="text-good" />
              ) : b.progress !== undefined ? (
                <span className="font-mono text-[10px] text-faint tnum">
                  {b.progress}<span className="opacity-60">/{threshold(b.title)}</span>
                </span>
              ) : (
                <span className="font-mono text-[10px] text-faint">locked</span>
              )}
            </div>
            <p className="mt-3 text-[13px] font-bold text-ink">{b.title}</p>
            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-mut">{b.hint}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function threshold(title: string) {
  return title === "10 builds" ? 10 : 14;
}

/* ---------------- Recent archive ---------------- */

function CurrentArchive({ state }: { state: AppState }) {
  const recent = state.days
    .filter((d) => d.status === "completed" || d.status === "missed")
    .slice(-6)
    .reverse();
  const today = getChallenge(state.currentDay);
  return (
    <section className="card mb-4 p-5" aria-label="Recent builds">
      <div className="flex items-center justify-between">
        <p className="eyebrow">Recent builds</p>
        <a href={`/day/${state.currentDay}`} className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent-deep hover:underline">
          {today.title}
        </a>
      </div>
      <ul className="mt-3 divide-y divide-line">
        {recent.map((d) => (
          <ArchiveRow key={d.day} day={d} />
        ))}
      </ul>
    </section>
  );
}

function ArchiveRow({ day }: { day: AppState["days"][number] }) {
  const spec = getChallenge(day.day);
  const isMissed = day.status === "missed";
  return (
    <li className="group">
      <a
        href={`/day/${day.day}`}
        className="flex min-h-12 items-center gap-3 py-2"
        aria-label={`Day ${day.day}: ${spec.title}`}
      >
        <span
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-md font-mono text-[11px] font-bold tnum ${isMissed ? "bg-warn/10 text-warn" : "bg-ink text-paper"}`}
        >
          {day.day}
        </span>
        <div className="min-w-0 flex-1">
          <p className={`truncate text-sm font-semibold ${isMissed ? "text-warn" : "text-ink"}`}>
            {spec.title}
          </p>
          <p className="font-mono text-[11px] uppercase tracking-wider text-mut">
            {isMissed ? "missed" : proofStatus(day)}
          </p>
        </div>
        {!isMissed ? (
          <span className="flex shrink-0 items-center gap-1.5">
            <span className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${day.proof?.commitUrl ? "bg-good/10 text-good" : "bg-ink/5 text-faint"}`}>
              <Icon name="github" size={10} /> {day.proof?.commitUrl ? "✓" : "—"}
            </span>
            <span className={`hidden items-center gap-1 rounded px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider sm:inline-flex ${day.proof?.postUrl ? "bg-good/10 text-good" : "bg-ink/5 text-faint"}`}>
              <Icon name="linkedin" size={10} /> {day.proof?.postUrl ? "✓" : "—"}
            </span>
          </span>
        ) : null}
        <Icon name="arrow-right" size={13} className="shrink-0 text-faint" />
      </a>
    </li>
  );
}

function proofStatus(day: AppState["days"][number]) {
  const commit = !!day.proof?.commitUrl;
  const post = !!day.proof?.postUrl;
  if (commit && post) return "proof complete · commit + post";
  if (commit) return "proof partial · post missing";
  return "proof attached";
}

/* ---------------- Empty profile ---------------- */

function ProfilePrompt({
  onSaveProfile,
}: {
  onSaveProfile: (p: { name: string; college: string; githubHandle: string; linkedinHandle: string }) => void;
}) {
  return (
    <form
      className="card mb-4 p-5"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        onSaveProfile({
          name: String(data.get("name") ?? "").trim(),
          college: String(data.get("college") ?? "").trim(),
          githubHandle: String(data.get("github") ?? "").trim(),
          linkedinHandle: String(data.get("linkedin") ?? "").trim(),
        });
      }}
    >
      <div className="flex items-center gap-2">
        <Icon name="pen" size={15} className="text-accent" />
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-ink">
          Build your developer profile
        </p>
      </div>
      <h2 className="mt-2.5 font-display text-lg font-bold leading-snug text-ink">
        Turn this challenge into a public signal.
      </h2>
      <p className="mt-1.5 text-sm leading-relaxed text-mut">
        Four fields. Your streak and builds stay - they just gain a name, a college and two
        handles recruiters can click.
      </p>
      <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
        <Field name="name" label="Full name" placeholder="e.g. Sanjay Iyer" autoFocus />
        <Field name="college" label="College" placeholder="e.g. PSG College of Technology" />
        <Field name="github" label="GitHub handle" placeholder="sanjay-iyer" prefix="github.com/" />
        <Field name="linkedin" label="LinkedIn handle" placeholder="sanjayiyer" prefix="linkedin.com/in/" />
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          className="btn-press inline-flex items-center gap-2 rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-night-2"
        >
          Save profile <Icon name="check" size={15} />
        </button>
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
          saved locally · no account needed
        </span>
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  placeholder,
  prefix,
  autoFocus,
}: {
  name: string;
  label: string;
  placeholder: string;
  prefix?: string;
  autoFocus?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-mut">
        {label}
      </span>
      <span className="flex items-center rounded-lg border border-line bg-paper focus-within:border-ink">
        {prefix ? <span className="pl-3 font-mono text-[11px] text-faint">{prefix}</span> : null}
        <input
          name={name}
          defaultValue=""
          autoFocus={autoFocus}
          placeholder={placeholder}
          className="w-full bg-transparent px-3 py-2.5 text-sm text-ink outline-none placeholder:text-faint"
        />
      </span>
    </label>
  );
}