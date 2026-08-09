import { Icon } from "@/components/icons";
import { Stamp } from "@/components/ui/stamp";

const CHAIN = [
  { icon: "box" as const, t: "DAY", d: "one small build" },
  { icon: "bolt" as const, t: "BUILD", d: "made, not watched" },
  { icon: "shield" as const, t: "PROOF", d: "commit + post" },
  { icon: "flame" as const, t: "STREAK", d: "kept alive" },
  { icon: "eye" as const, t: "PORTFOLIO", d: "proof, public" },
];

const LEDGER = [
  { day: "D10", title: "First milestone: 10 builds", repo: "feat: 10 day retro", post: "posted", done: true },
  { day: "D11", title: "Live markdown previewer", repo: "feat: split preview", post: "posted", done: true },
  { day: "D12", title: "Weather dashboard", repo: "feat: 3-day forecast", post: "posted", done: true },
];

export function ProofSection() {
  return (
    <section id="proof" className="border-b border-line bg-paper">
      <div className="mx-auto w-full max-w-5xl px-5 py-12 md:py-20">
        <div className="max-w-xl">
          <p className="eyebrow mb-3">Proof of work</p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            A challenge about following through,{" "}
            <span className="text-accent">not collecting certificates</span>.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-mut">
            Every day produces evidence. The evidence compounds into a streak, the streak into a
            portfolio, and the portfolio into an interview that starts differently.
          </p>
        </div>

        <ol className="mt-8 flex flex-col gap-2 md:grid md:grid-cols-5">
          {CHAIN.map((c, i) => (
            <li key={c.t} className="flex items-center gap-3 md:relative md:flex-col md:items-start md:gap-2">
              <svg width="0" height="0" className="hidden" aria-hidden="true" />
              <span className={`font-display text-xs font-bold tracking-widest ${i < CHAIN.length - 1 ? "text-mut" : "text-accent"}`}>
                <span className="mr-1 text-faint tnum">{String(i + 1).padStart(2, "0")}</span>
                {c.t}
              </span>
              {i < CHAIN.length - 1 ? (
                <Icon name="arrow-right" size={14} className="text-faint md:absolute md:-right-2.5 md:top-1 md:mx-2 md:rotate-90" />
              ) : null}
              <span className="text-[13px] text-mut">{c.d}</span>
            </li>
          ))}
        </ol>

        <div className="mt-10 overflow-hidden rounded-xl border border-line bg-card">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-paper/70 px-4 py-3 sm:px-6">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-ink">
              Proof ledger
            </p>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-wider text-mut">
                <span className="text-good">12</span> / 60 entries
              </span>
              <Stamp>Verified</Stamp>
            </div>
          </div>
          <ul className="divide-y divide-line">
            {LEDGER.map((r) => (
              <li key={r.day} className="flex items-center gap-3 px-4 py-3.5 sm:gap-4 md:px-6">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-ink font-mono text-[10px] font-bold text-paper tnum">
                  {r.day}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">{r.title}</p>
                  <p className="truncate font-mono text-[11px] text-mut">{r.repo}</p>
                </div>
                <div className="hidden items-center gap-2 sm:flex">
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-good">
                    <Icon name="check" size={12} /> commit
                  </span>
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-good">
                    <Icon name="check" size={12} /> post
                  </span>
                </div>
                <Icon name="arrow-up-right" size={15} className="shrink-0 text-faint" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}