import { Btn, Chip } from "@/components/ui/wordmark";
import { Icon } from "@/components/icons";
import { getChallenge } from "@/lib/curriculum";

const CHECKLIST = [
  "City search fetches a forecast",
  "Loading, error, and empty states handled",
  "Units toggle (C / F) works end to end",
];

export function ExampleDay() {
  const c = getChallenge(12);
  return (
    <section id="example" className="border-b border-line bg-paper">
      <div className="mx-auto w-full max-w-5xl px-5 py-12 md:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div className="order-2 min-w-0 lg:order-1">
            <p className="eyebrow mb-3">Inside a challenge day</p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Day 12 looks like a real workspace. Because it is.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-mut">
              No vague "learn APIs today". You get a spec: what to build, why it matters, what
              counts as shipped, and a checklist that closes. Then you paste two links and it's
              official - your proof ledger accepts entry #12.
            </p>
            <ul className="mt-6 space-y-3">
              {CHECKLIST.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-ink">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-[5px] border border-line bg-card">
                    <Icon name="check" size={12} className="text-accent" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Btn href="/day/12" variant="outline" icon="arrow">
                Open the real Day 12
              </Btn>
            </div>
          </div>

          <div className="order-1 min-w-0 lg:order-2">
            <div className="card relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-line px-4 py-3 text-mut">
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em]">
                  Day 12 / 60
                </span>
                <div className="flex items-center gap-2">
                  <span className="hidden font-mono text-[10px] uppercase tracking-wider text-mut sm:block">
                    Build workspace
                  </span>
                  <Chip tone="accent">In progress</Chip>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm font-bold text-ink">
                  <span className="mb-1 block font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-mut">
                    Today's build
                  </span>
                  {c.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-mut">{c.description}</p>
                <div className="mt-4 grid grid-cols-2 gap-2 font-mono text-[11px] uppercase tracking-wider text-mut">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-paper px-2.5 py-2">
                    <Icon name="clock" size={13} /> {c.estimatedMinutes} min
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-paper px-2.5 py-2">
                    <Icon name="gauge" size={13} /> {c.difficulty}
                  </span>
                </div>
                <div className="mt-5 rounded-lg border border-dashed border-line bg-paper p-4">
                  <p className="eyebrow mb-2.5">Proof of work</p>
                  <div className="space-y-2">
                    <ProofField icon="github" value="github.com/sanjay-iyer/abtalks-day-12" />
                    <ProofField icon="linkedin" value="linkedin.com/feed/update/721842" />
                  </div>
                  <div className="mt-4">
                    <span className="btn-press inline-flex w-full items-center justify-center gap-2 rounded-lg bg-ink py-2.5 text-sm font-semibold text-paper">
                      Enter proof of work
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProofField({
  icon,
  value,
}: {
  icon: "github" | "linkedin";
  value: string;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-md border border-line bg-card px-3 py-2.5">
      <Icon name={icon} size={15} className="shrink-0 text-ink" />
      <span className="min-w-0 flex-1 truncate font-mono text-[11px] text-mut">{value}</span>
      <Icon name="check" size={13} className="shrink-0 text-good" />
    </div>
  );
}