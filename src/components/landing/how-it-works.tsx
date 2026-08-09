import { PHASES } from "@/lib/curriculum-titles";

const RULES = [
  { k: "One build", v: "per day, for 60 days straight" },
  { k: "45-90 min", v: "per build. scope stays humane" },
  { k: "Proof", v: "GitHub commit + LinkedIn post, daily" },
  { k: "Offline-safe", v: "every prompt works on a hostel network" },
];

export function HowItWorks() {
  return (
    <section id="how" className="border-b border-line bg-paper">
      <div className="mx-auto w-full max-w-5xl px-5 py-12 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
<p className="eyebrow mb-3">
                How the 60 days work
              </p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              A challenge that's small enough to win.
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-mut">
              The challenge is designed around one honest constraint: a normal evening. Every
              build fits in it, every proof takes two clicks, and the curriculum ramps from
              "first HTML" to "portfolio a recruiter opens".
            </p>
            <ul className="mt-6 space-y-3">
              {RULES.map((r) => (
                <li key={r.k} className="flex items-baseline gap-3">
                  <span className="w-28 shrink-0 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-accent-deep">
                    {r.k}
                  </span>
                  <span className="text-sm text-mut">{r.v}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-xl border border-line bg-card p-5">
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-mut">
                <span>Your first week</span>
                <span className="text-accent-deep">D1 - D14</span>
              </div>
              <div className="mt-4 flex items-center gap-1">
                {Array.from({ length: 14 }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-6 flex-1 rounded-[3px] ${i < 11 ? "bg-ink" : i === 11 ? "bg-accent" : "bg-ink/10"}`}
                  />
                ))}
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 font-mono text-[10px] uppercase tracking-wider text-mut">
                <span>11 shipped <span className="text-good">✓</span></span>
                <span className="text-center text-accent-deep">today →</span>
                <span className="text-right">12 ahead</span>
              </div>
            </div>
          </div>
          <div className="min-w-0 space-y-3">
            {PHASES.map((phase, i) => (
              <div key={phase.name} className="card p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-sm font-bold text-faint tnum">0{i + 1}</span>
                    <h3 className="font-display text-base font-bold text-ink sm:text-lg">{phase.name}</h3>
                  </div>
                  <span className="rounded-md bg-ink/5 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-mut">
                    D{String(phase.from).padStart(2, "0")} - D{phase.to}
                  </span>
                </div>
                <p className="mt-2 pl-8 text-sm leading-relaxed text-mut">{phase.blurb}</p>
              </div>
            ))}
            <p className="flex items-center gap-2 px-3 pt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-mut">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-good" />
              A quiet note: 60 days is long. Long is exactly the point.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}