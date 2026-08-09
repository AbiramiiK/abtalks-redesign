import { Btn } from "@/components/ui/wordmark";

export function FinalCta() {
  return (
    <section className="night-grid relative overflow-hidden bg-night text-night-paper">
      <div className="mx-auto w-full max-w-3xl px-5 py-16 text-center md:py-24">
        <p className="eyebrow mb-4 text-night-paper/50">Day 60 exists.</p>
        <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
          Your streak starts with
          <span className="text-accent"> one build</span>.
        </h2>
        <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-night-paper/65">
          Sixty evenings from now you either have a proof page a recruiter could open - or
          you're still watching tutorials. Pick one.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Btn href="/dashboard?state=first-day" variant="paper" size="lg" icon="arrow">
            Start the 60-day challenge
          </Btn>
          <Btn href="#how" variant="ghost" size="lg" className="text-night-paper hover:bg-night-paper/10">
            Re-read how it works
          </Btn>
        </div>
        <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.16em] text-night-paper/40">
          No credit card · No commitment · No group where nothing gets shipped
        </p>
      </div>
    </section>
  );
}