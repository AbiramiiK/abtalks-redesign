import { Icon, type IconName } from "@/components/icons";

const BADGES: { icon: IconName; name: string; hint: string }[] = [
  { icon: "rocket", name: "First Ship", hint: "Day 1 completed" },
  { icon: "flame", name: "7-Day Streak", hint: "a week without a break" },
  { icon: "trophy", name: "10 Builds", hint: "double digits done" },
  { icon: "eye", name: "Build in Public", hint: "12 posts & counting" },
];

export function Achievements({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <section className={`${dark ? "bg-night text-night-paper" : "border-b border-line bg-paper"}`}>
      <div className="mx-auto w-full max-w-5xl px-5 py-12 md:py-20">
        <div className={`flex flex-col gap-6 ${dark ? "" : "sm:flex-row sm:items-end sm:justify-between"}`}>
          <div className={dark ? "max-w-md" : "max-w-md"}>
            <p className={`eyebrow mb-3 ${dark ? "text-night-paper/50" : ""}`}>The rewards</p>
            <h2 className={`font-display text-3xl font-bold tracking-tight ${dark ? "text-night-paper" : "text-ink"} sm:text-4xl`}>
              Achievements you can't unlock with a certificate.
            </h2>
          </div>
          <div className="card-night inline-flex shrink-0 items-center gap-3 rounded-xl border border-night-paper/10 bg-night-2 px-5 py-4">
            <p className="font-display text-3xl font-bold text-night-paper tnum">9,012</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] leading-relaxed text-night-paper/55">
              students already
              <br /> past Day 10
            </p>
          </div>
        </div>
        <ul className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {BADGES.map((b) => (
            <li
              key={b.name}
              className={`rounded-xl border p-5 ${
                dark ? "border-night-paper/10 bg-night-2" : "border-line bg-card"
              }`}
            >
              <span
                className={`inline-grid h-11 w-11 place-items-center rounded-lg ${
                  dark ? "bg-night-paper/10 text-night-paper" : "bg-ink text-paper"
                }`}
              >
                <Icon name={b.icon} size={21} />
              </span>
              <h3 className={`mt-4 text-sm font-bold ${dark ? "text-night-paper" : "text-ink"}`}>{b.name}</h3>
              <p className={`mt-1 font-mono text-[10px] uppercase tracking-wider ${dark ? "text-night-paper/45" : "text-mut"}`}>
                {b.hint}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}