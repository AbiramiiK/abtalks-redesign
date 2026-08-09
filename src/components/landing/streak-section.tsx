import { Icon } from "@/components/icons";
import { ProgressRing } from "@/components/ui/progress";

const EKS = ["M", "T", "W", "T", "F", "S", "S"];

export function StreakSection() {
  return (
    <section id="streak" className="border-b border-line bg-paper">
      <div className="mx-auto w-full max-w-5xl px-5 py-12 md:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <div className="min-w-0">
            <p className="eyebrow mb-3">The engine</p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              After day 20, the streak
              <span className="text-accent"> does the motivating</span>.
            </h2>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-mut">
              Discipline is unreliable. Streaks aren't - they are systems with a gentle threat:
              break it and you start the count over. That small wedge keeps thousands of students
              opening the app at 11pm with a build already in their hands.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-ink">
              {[
                "Every day ends with a committed-receipt you can point at",
                "Missed a day? Recovery beats quitting, and the UI says so",
                "Your streak is public - pride, knowingly and honestly",
              ].map((line) => (
                <li key={line} className="flex items-start gap-2.5">
                  <Icon name="check" size={15} className="mt-0.5 shrink-0 text-good" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div className="card min-w-0 p-6">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-ink">
                Somebody's week 2
              </p>
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-accent">
                <Icon name="flame" size={14} /> streak 11
              </span>
            </div>
            <div className="mt-4 flex gap-1.5">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="flex-1">
                  <span className="mb-1 block text-center font-mono text-[10px] uppercase text-faint">{EKS[i]}</span>
                  <span
                    className={`block aspect-square rounded-md ${i < 4 ? "bg-ink" : i === 4 ? "bg-accent" : "bg-ink/8"}`}
                  />
                </div>
              ))}
            </div>
            <div className="mt-1.5 flex gap-2.5">
              {[0, 1, 2, 3, 4].map((w) => (
                <div key={w} className="grid flex-1 grid-cols-5 gap-1.5">
                  {Array.from({ length: 5 }).map((_, d) => (
                    <span
                      key={d}
                      className={`aspect-square rounded-[3px] ${w === 4 && d === 0 ? "bg-accent" : "bg-ink/8"}`}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-end justify-between border-t border-line pt-5">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mut">Progress</p>
                <p className="font-display text-3xl font-bold text-ink tnum">
                  11<span className="text-faint">/60</span>
                </p>
              </div>
              <ProgressRing value={18} size={72} stroke={6} label="18%" sublabel="done" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}