import { Btn, Chip } from "@/components/ui/wordmark";
import { Icon } from "@/components/icons";
import { Stamp } from "@/components/ui/stamp";
import { Counter } from "@/components/ui/counter";

export function Hero() {
  return (
    <section className="night-grid relative overflow-hidden bg-night text-night-paper">
      <div className="mx-auto w-full max-w-5xl px-5 pb-12 pt-10 md:pb-20 md:pt-16">
        <div className="grid min-w-0 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="max-w-xl">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-night-paper/15 bg-night-2 px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-night-paper/70">
              <span className="h-1.5 w-1.5 rounded-full bg-accent pulse-dot" />
              ABTalks · 60-day build challenge
            </p>
            <h1 className="font-display text-[2.7rem] font-bold leading-[1.02] tracking-[-0.03em] sm:text-6xl md:text-[4rem]">
              60 days.
              <br />
              60 builds.
              <br />
              <span className="text-accent">One visible proof.</span>
            </h1>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-night-paper/65 sm:text-base">
              A daily challenge for India's college developers. Every day you ship one small
              real project and prove it with a public GitHub commit and a LinkedIn post. Sixty
              days later you don't say "I'm still learning" - you show a folder of receipts.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Btn href="/dashboard?state=first-day" variant="paper" size="lg" icon="arrow">
                Start the 60-day challenge
              </Btn>
              <Btn href="#how" variant="ghost" size="lg" className="text-night-paper hover:bg-night-paper/10">
                See how it works
              </Btn>
            </div>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-night-paper/45">
              Free · 60 evenings · No referrals · Every state in India
            </p>
          </div>
          <HeroProofCard />
        </div>
        <div className="mt-12 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-night-paper/10 bg-night-paper/10 md:mt-16">
          {[
            { value: 12480, suffix: "+", label: "builders in cohort 06" },
            { value: 417000, suffix: "+", label: "proofs logged" },
            { value: 60, suffix: "", label: "days, end to end" },
          ].map((s) => (
            <div key={s.label} className="bg-night px-4 py-4 md:px-6 md:py-6">
              <p className="font-display text-2xl font-bold tracking-tight text-night-paper tnum md:text-4xl">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-night-paper/50">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroProofCard() {
  return (
    <div className="relative mx-auto w-full max-w-md min-w-0">
      <div className="card-night relative rounded-xl border-night-paper/10 bg-night-2 p-5 shadow-[0_0_0_1px_rgba(255,75,0,0.22),0_0_0_10px_rgba(255,75,0,0.06)]">
        <div className="flex items-center justify-between gap-2">
          <Chip tone="accent" className="bg-accent/15">
            Day 12 / 60
          </Chip>
          <Stamp tone="paper" rotate="-4deg">
            Streak 11
          </Stamp>
        </div>
        <h3 className="mt-4 font-display text-xl font-bold text-night-paper sm:text-2xl">
          Build a weather dashboard
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-night-paper/60">
          Live data, 3-day forecast, loading and error states - a real app, not a tutorial.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-night-paper/55">
          <span className="inline-flex items-center gap-1.5">
            <Icon name="clock" size={13} /> 60 min
          </span>
          <span className="text-night-paper/25">·</span>
          <span>Intermediate</span>
          <span className="text-night-paper/25">·</span>
          <span className="inline-flex items-center gap-1.5 text-accent">
            <Icon name="bolt" size={13} /> APIs
          </span>
        </div>
        <div className="my-5 h-px bg-night-paper/10" />
        <p className="eyebrow mb-2.5" style={{ color: "rgba(242,236,223,.45)" }}>
          Proof attached
        </p>
        <ul className="space-y-2.5">
          <ProofRow label="github.com/sanjay-iyer/abtalks-day-12" icon="github" done />
          <ProofRow label="linkedin.com/feed/update/721842" icon="linkedin" done />
        </ul>
        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-night-paper/40">
            Proof ledger · #12
          </span>
          <Stamp solid className="stamp-anim">
            Shipped
          </Stamp>
        </div>
      </div>
    </div>
  );
}

function ProofRow({
  label,
  icon,
  done,
}: {
  label: string;
  icon: "github" | "linkedin";
  done?: boolean;
}) {
  return (
    <li className="flex items-center gap-2.5">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-night-paper/15 bg-night text-night-paper/80">
        <Icon name={icon} size={15} />
      </span>
      <span className="min-w-0 flex-1 truncate font-mono text-xs text-night-paper/70">{label}</span>
      {done ? <Icon name="check" size={15} className="shrink-0 text-accent" /> : null}
    </li>
  );
}