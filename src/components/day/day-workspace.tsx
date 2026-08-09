"use client";

import { useState } from "react";
import { AppHeader, StickyBar } from "@/components/layout/app-header";
import { Chip } from "@/components/ui/wordmark";
import { Icon, type IconName } from "@/components/icons";
import { ProgressBar } from "@/components/ui/progress";
import { Stamp } from "@/components/ui/stamp";
import { getChallenge } from "@/lib/curriculum";
import { derive } from "@/lib/derive";
import { useAppState } from "@/lib/use-app-state";
import type { DemoPreset } from "@/lib/types";

const isUrl = (v: string) =>
  v.trim().length > 0 &&
  (/^https?:\/\/.+\..+/.test(v.trim()) || /^(github\.com|linkedin\.com)\//.test(v.trim()));

export function DayWorkspace({ day, preset }: { day: number; preset?: DemoPreset }) {
  const { state, dispatch } = useAppState({ preset });
  const spec = getChallenge(day);
  const record = state.days.find((d) => d.day === day);
  const stats = derive(state);
  const shipped = record?.status === "completed";
  const missedPrev = state.days.find((d) => d.day === day - 1)?.status === "missed";

  return (
    <div className="min-h-dvh">
      <AppHeader
        backHref="/dashboard"
        backLabel="Back to dashboard"
        center={
          <span className="hidden items-center gap-2 sm:flex">
            <Chip tone="dark">Day {day} / 60</Chip>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-mut">
              {spec.phase}
            </span>
          </span>
        }
      />
      <main className="mx-auto w-full max-w-3xl px-5 pb-28 pt-6 md:pb-16">
        {missedPrev ? <MissedBanner prevDay={day - 1} longest={stats.longestStreak} /> : null}
        {shipped ? <ShippedNote day={day} /> : null}
        <Workspace
          day={day}
          spec={spec}
          shipped={shipped}
          previous={record?.proof}
          dispatch={dispatch}
        />
      </main>
      <DayStickyBar day={day} shipped={shipped} />
    </div>
  );
}

type Dispatch = ReturnType<typeof useAppState>["dispatch"];

/* ---------- small banners ---------- */

function MissedBanner({ prevDay, longest }: { prevDay: number; longest: number }) {
  return (
    <div role="status" className="mb-4 flex items-start gap-2.5 rounded-xl border border-warn/35 bg-warn/[0.07] p-4">
      <Icon name="alert" size={16} className="mt-0.5 shrink-0 text-warn" />
      <p className="text-sm leading-relaxed text-ink">
        <span className="font-bold">You missed Day {prevDay}.</span>{" "}
        <span className="text-mut">
          Ship today and the streak restarts. Longest run so far: {longest} days.
        </span>
      </p>
    </div>
  );
}

function ShippedNote({ day }: { day: number }) {
  return (
    <div role="status" className="mb-4 flex items-start gap-2.5 rounded-xl border border-good/30 bg-good/[0.06] p-4">
      <Icon name="check" size={16} className="mt-0.5 shrink-0 text-good" />
      <p className="text-sm leading-relaxed text-ink">
        <span className="font-bold">Day {day} already shipped.</span>{" "}
        <span className="text-mut">Proof is on record. Update a link below if the build grew.</span>
      </p>
    </div>
  );
}

/* ---------- main workspace ---------- */

function Workspace({
  day,
  spec,
  shipped,
  previous,
  dispatch,
}: {
  day: number;
  spec: ReturnType<typeof getChallenge>;
  shipped: boolean;
  previous?: { repoUrl?: string; commitUrl?: string; postUrl?: string };
  dispatch: Dispatch;
}) {
  const [links, setLinks] = useState({
    repo: previous?.repoUrl ?? "",
    commit: previous?.commitUrl ?? "",
    post: previous?.postUrl ?? "",
  });
  const [manual, setManual] = useState<boolean[]>(() => spec.whatToShip.map(() => false));
  const [tried, setTried] = useState(false);
  const [done, setDone] = useState(false);

  const validity = {
    repo: isUrl(links.repo),
    commit: isUrl(links.commit),
    post: isUrl(links.post),
  };
  const allValid = validity.repo && validity.commit && validity.post;
  const total = spec.whatToShip.length + 3;
  const checked = [
    ...manual,
    validity.repo,
    validity.commit,
    validity.post,
  ].filter(Boolean).length;

  const setLink = (k: "repo" | "commit" | "post") => (v: string) =>
    setLinks((p) => ({ ...p, [k]: v }));

  const submit = () => {
    if (!allValid) {
      setTried(true);
      return;
    }
    dispatch({
      type: "submit-proof",
      day,
      proof: {
        repoUrl: links.repo.trim(),
        commitUrl: links.commit.trim(),
        postUrl: links.post.trim(),
      },
    });
    setDone(true);
  };

  if (done) {
    return <Success day={day} />;
  }

  return (
    <div className="space-y-5">
      {/* today's build */}
      <section className="card p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Chip tone="accent">{shipped ? "Shipped" : "Due today"}</Chip>
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-mut">
            {spec.estimatedMinutes} min · one evening
          </span>
        </div>
        <h1 className="mt-4 font-display text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl">
          {spec.title}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-mut">{spec.description}</p>

        <div className="mt-5">
          <p className="eyebrow mb-2.5">Why it matters</p>
          <p className="border-l-2 border-accent pl-4 text-[15px] font-medium leading-relaxed text-ink">
            {spec.whyItMatters}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2 font-mono text-[11px] uppercase tracking-wider text-mut">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-paper px-2.5 py-1.5">
            <Icon name="gauge" size={13} /> {spec.difficulty}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-md bg-paper px-2.5 py-1.5">
            <Icon name="bolt" size={13} /> {spec.skill}
          </span>
        </div>
      </section>

      {/* build checklist - the day's concrete deliverables */}
      <section className="card p-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <p className="eyebrow">Build checklist</p>
          <span className="font-mono text-[11px] uppercase tracking-wider text-faint tnum">
            {checked}/{total}
          </span>
        </div>
        <ProgressBar value={(checked / total) * 100} height="h-1.5" />
        <ul className="mt-4 space-y-1">
          {spec.whatToShip.map((item, i) => (
            <ManualCheck
              key={item}
              label={item}
              checked={manual[i] ?? false}
              onToggle={(v) => setManual((p) => p.map((old, j) => (j === i ? v : old)))}
            />
          ))}
          <AutoCheck label="Code pushed to a public GitHub repo" on={validity.repo} />
          <AutoCheck label="Commit published with a meaningful message" on={validity.commit} />
          <AutoCheck label="LinkedIn post published and public" on={validity.post} />
        </ul>
      </section>

      {/* proof of work */}
      <section id={`proof-${day}`} className="card p-5" aria-label="Proof of work">
        <div className="flex items-center justify-between gap-2">
          <p className="eyebrow">Proof of work</p>
          <Stamp rotate="3deg">Public URLs only</Stamp>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-mut">
          Paste the three links. They attach to {day}, become part of your proof ledger, and
          surface on your public page.
        </p>
        <div className="mt-4 space-y-3">
          <ProofField
            id="proof-repo"
            icon="github"
            label="GitHub repository"
            placeholder="git.io/… or github.com/user/repo"
            value={links.repo}
            onChange={setLink("repo")}
            error={tried && !validity.repo ? "Paste the full public repo URL." : undefined}
          />
          <ProofField
            id="proof-commit"
            icon="github"
            label="Commit (link to the commit)"
            placeholder="github.com/user/repo/commit/9f2c1a…"
            value={links.commit}
            onChange={setLink("commit")}
            error={tried && !validity.commit ? "Link the exact commit, not the branch." : undefined}
          />
          <ProofField
            id="proof-post"
            icon="linkedin"
            label="LinkedIn post"
            placeholder="linkedin.com/feed/update/…"
            value={links.post}
            onChange={setLink("post")}
            error={tried && !validity.post ? "Share the public post URL." : undefined}
          />
        </div>
        {tried && !allValid ? (
          <p role="alert" className="mt-3 flex items-center gap-2 text-[13px] font-medium text-warn">
            <Icon name="alert" size={14} /> Three public links ship this build.
          </p>
        ) : null}
        <button
          type="button"
          onClick={submit}
          className="btn-press mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-5 py-4 text-sm font-bold text-white transition-colors hover:bg-accent-deep"
        >
          {shipped ? "Update today's proof" : "Submit today's proof"}
          <Icon name="arrow-right" size={16} />
        </button>
        <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
          local mock · nothing leaves your browser
        </p>
      </section>
    </div>
  );
}

/* ---------- checklist + proof form controls ---------- */

function ManualCheck({ label, checked, onToggle }: {
  label: string;
  checked: boolean;
  onToggle: (v: boolean) => void;
}) {
  return (
    <li>
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={() => onToggle(!checked)}
        className={`flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left transition-colors ${checked ? "" : "hover:bg-paper"}`}
      >
        <span
          className={`grid h-5 w-5 shrink-0 place-items-center rounded-[5px] border transition-colors ${
            checked ? "border-ink bg-ink text-paper" : "border-line bg-card text-transparent"
          }`}
        >
          <Icon name="check" size={12} />
        </span>
        <span className={`text-sm ${checked ? "text-mut line-through decoration-mut/50" : "text-ink"}`}>
          {label}
        </span>
      </button>
    </li>
  );
}

function AutoCheck({ label, on }: { label: string; on: boolean }) {
  return (
    <li className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5">
      <span
        className={`grid h-5 w-5 shrink-0 place-items-center rounded-[5px] border transition-colors ${
          on ? "border-good/40 bg-good/10 text-good" : "border-dashed border-line bg-card text-transparent"
        }`}
      >
        <Icon name="check" size={12} />
      </span>
      <span className={`text-sm ${on ? "text-ink" : "text-faint"}`}>
        {label}
        {!on ? <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-faint">auto</span> : null}
      </span>
    </li>
  );
}

function ProofField({
  id,
  icon,
  label,
  placeholder,
  value,
  onChange,
  error,
}: {
  id: string;
  icon: IconName;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  const hasError = !!error;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex items-center gap-1.5 text-mut font-mono text-[11px] font-bold uppercase tracking-[0.14em]">
        <Icon name={icon} size={13} className={`${hasError ? "text-warn" : "text-ink"}`} />
        {label}
        {value ? <Icon name="check" size={12} className={hasError ? "hidden" : "text-good"} /> : null}
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        aria-invalid={hasError}
        aria-describedby={hasError ? `${id}-err` : undefined}
        className={`w-full rounded-lg border bg-card px-3.5 py-3 text-sm text-ink outline-none transition-colors placeholder:text-faint ${
          hasError ? "border-warn/60" : "border-line focus:border-ink"
        }`}
      />
      {hasError ? (
        <p id={`${id}-err`} className="mt-1.5 text-xs font-medium text-warn">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-card px-3 py-3">
      <p className="font-display text-xl font-bold text-ink tnum">{value}</p>
      <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-mut">{label}</p>
    </div>
  );
}

function DayStickyBar({ day, shipped }: { day: number; shipped: boolean }) {
  return (
    <StickyBar className="md:hidden">
      <span className="min-w-0 flex-1 truncate font-mono text-[11px] uppercase tracking-[0.14em] text-mut">
        Day {day} · proof links
      </span>
      <a
        href={`#proof-${day}`}
        className="btn-press shrink-0 rounded-lg bg-accent px-5 py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-accent-deep"
      >
        {shipped ? "Edit proof" : "Submit proof"}
      </a>
    </StickyBar>
  );
}

export function Success({ day }: { day: number }) {
  return (
    <div className="rise-fade card relative mt-2 overflow-hidden p-6" role="status">
      <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
        <Stamp solid className="stamp-anim text-[17px] px-3 py-1.5">
          Shipped
        </Stamp>
      </div>
      <div className="mt-8 grid h-14 w-14 place-items-center rounded-full bg-good/10 text-good">
        <Icon name="check" size={26} />
      </div>
      <h1 className="mt-5 font-display text-3xl font-bold tracking-tight text-ink">
        Day {day} shipped.
      </h1>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-mut">
        Another build added to your proof of work. The ledger entry is live and your public
        page just got a little more real.
      </p>
      <dl className="mt-6 grid gap-2 rounded-xl border border-line bg-paper p-4 sm:grid-cols-3">
        <Stat label="day completed" value="+1" />
        <Stat label="build shipped" value="+1" />
        <Stat label="streak" value="now alive" />
      </dl>
      <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
        <a
          href="/dashboard"
          className="btn-press inline-flex items-center justify-center gap-2 rounded-lg bg-ink px-5 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-night-2"
        >
          View dashboard <Icon name="arrow-right" size={15} />
        </a>
        <a
          href="/dashboard"
          className="btn-press inline-flex items-center justify-center gap-2 rounded-lg border border-line px-5 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-ink"
        >
          Proof ledger
        </a>
      </div>
    </div>
  );
}