import { Wordmark, Btn } from "@/components/ui/wordmark";
import { Stamp } from "@/components/ui/stamp";

export default function NotFound() {
  return (
    <main className="min-h-dvh bg-paper">
      <header className="border-b border-line">
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center px-5">
          <Wordmark href="/" />
        </div>
      </header>
      <div className="mx-auto w-full max-w-3xl px-5 py-16 text-center md:py-24">
        <div className="inline-block">
          <Stamp solid className="text-base">404</Stamp>
        </div>
        <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          This page is your build #404.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-mut">
          Even ABTalks can't ship a page that doesn't exist. The three routes that do: the
          landing, the dashboard, and a challenge day.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Btn href="/" variant="primary" icon="arrow">
            Back to landing
          </Btn>
          <Btn href="/day/12" variant="outline">
            Jump to Day 12
          </Btn>
        </div>
        <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
          nav: / · /dashboard · /day/12
        </p>
      </div>
    </main>
  );
}