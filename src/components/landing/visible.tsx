import { Chip } from "@/components/ui/wordmark";
import { Icon } from "@/components/icons";
import { Stamp } from "@/components/ui/stamp";
import { ProgressBar } from "@/components/ui/progress";

export function VisibleCard() {
  return (
    <section id="seen" className="border-b border-line bg-paper">
      <div className="mx-auto w-full max-w-5xl px-5 py-12 md:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="min-w-0">
            <p className="eyebrow mb-3">The portfolio you didn't plan for</p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              At the end, one page,<span className="text-accent"> fully earned</span>.
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-mut">
              Every day you fill, the page grows: 60 builds, 60 commits, 60 posts, live links
              under everything. It's the CV that doesn't need a "projects" section,
              because now the whole page is projects.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-ink">
              {[
                "Every repo link is a real public commit",
                "Same page works as a one-slide interview deck",
                "Recruiters click, not skim",
              ].map((line) => (
                <li key={line} className="flex items-start gap-2.5">
                  <Icon name="check" size={15} className="mt-0.5 shrink-0 text-good" />
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 overflow-hidden rounded-xl border border-line bg-card sm:rounded-2xl">
            <div className="flex items-center gap-2 border-b border-line bg-paper/80 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-accent" />
              <span className="ml-2 flex-1 truncate rounded-md bg-white px-3 py-1 font-mono text-[11px] text-mut">
                proof.abtalks.dev/sanjay-iyer
              </span>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-ink font-display text-sm font-bold text-paper">
                  S
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-ink">Sanjay Iyer</p>
                  <p className="truncate font-mono text-[11px] text-mut">
                    B.Tech CSE · PSG College of Technology
                  </p>
                </div>
                <Stamp rotate="4deg">Day 60</Stamp>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Chip tone="accent">60 builds shipped</Chip>
                <Chip tone="good">proof complete</Chip>
              </div>
              <div className="mt-4">
                <div className="mb-1.5 flex items-baseline justify-between">
                  <span className="font-display text-sm font-bold text-ink tnum">60 / 60</span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-mut">proof ledger</span>
                </div>
                <ProgressBar value={100} tone="good" />
              </div>
              <div className="mt-5 space-y-2">
                {[
                  { icon: "github" as const, t: "github", v: "60 repos · 60 commits · starred 128×" },
                  { icon: "linkedin" as const, t: "linkedin", v: "60 posts · 4.2k impressions/month" },
                ].map((r) => (
                  <div key={r.t} className="flex items-center gap-2.5 rounded-md border border-line px-3 py-2">
                    <Icon name={r.icon} size={15} className="shrink-0 text-ink" />
                    <span className="min-w-0 flex-1 font-mono text-[11px] text-mut">{r.v}</span>
                    <Icon name="arrow-up-right" size={13} className="shrink-0 text-faint" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}