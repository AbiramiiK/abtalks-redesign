import { Icon } from "@/components/icons";

const PILLARS = [
  {
    icon: "box" as const,
    step: "01",
    title: "Ship daily",
    body: "One small real project every evening - never a video you watch, always a thing you build. Scope is designed so an evening is enough.",
  },
  {
    icon: "shield" as const,
    step: "02",
    title: "Prove your work",
    body: "Every build locks to public evidence: a GitHub commit and a LinkedIn post. Two clicks of proof, zero ways to cheat yourself.",
  },
  {
    icon: "eye" as const,
    step: "03",
    title: "Become visible",
    body: "All 60 builds compile into a public proof page. The thing you hand a recruiter instead of a paragraph about 'passion'.",
  },
];

export function Pillars() {
  return (
    <section className="border-b border-line bg-paper">
      <div className="mx-auto w-full max-w-5xl px-5 py-12 md:py-20">
        <div className="max-w-xl">
          <p className="eyebrow mb-3">The deal</p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Most students finish courses.
            <br />
            <span className="text-accent">None of them finish builds.</span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-mut">
            A college CV says what you <em>know</em>. A proof page shows what you've <em>done</em>.
            The challenge exists to make the second one inevitable.
          </p>
        </div>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {PILLARS.map((p) => (
            <li key={p.step} className="card p-5">
              <div className="flex items-start justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-ink text-paper">
                  <Icon name={p.icon} size={19} />
                </span>
                <span className="font-display text-sm font-bold text-faint tnum">/{p.step}</span>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mut">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}