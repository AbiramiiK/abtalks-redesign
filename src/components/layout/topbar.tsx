import { Btn, Wordmark } from "../ui/wordmark";

const LINKS = [
  { href: "#how", label: "How it works" },
  { href: "#proof", label: "Proof of work" },
  { href: "#example", label: "A day in the challenge" },
];

export function Topbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-5">
        <Wordmark href="/" />
        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-mut transition-colors hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>
        <Btn href="/dashboard?state=first-day" size="sm" className="shrink-0 py-2.5">
          Start the challenge
          <span aria-hidden="true" className="ml-1 font-mono text-[10px] opacity-60">
            ↗
          </span>
        </Btn>
      </div>
    </header>
  );
}