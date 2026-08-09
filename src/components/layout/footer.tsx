import Link from "next/link";
import { Wordmark } from "@/components/ui/wordmark";
import { Icon } from "@/components/icons";

export function Footer({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  const linkCls = dark ? "text-night-paper/60 transition-colors hover:text-night-paper" : "text-mut transition-colors hover:text-ink";
  const subCls = dark ? "border-night-paper/15 text-night-paper/40" : "border-line text-faint";
  const body = dark ? "text-night-paper/60" : "text-mut";
  return (
    <footer className={`${dark ? "bg-night text-night-paper" : "border-t border-line text-ink"}`}>
      <div className="mx-auto w-full max-w-5xl px-5 py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <Wordmark tone={dark ? "paper" : "ink"} />
            <p className={`mt-3 text-sm leading-relaxed ${body}`}>
              A 60-day build challenge for India's college developers. Ship daily. Prove it.
              Become visible.
            </p>
          </div>
          <nav className="grid grid-cols-2 gap-x-10 gap-y-8 text-sm" aria-label="Footer">
            <div>
              <p className="eyebrow mb-3">Product</p>
              <ul className="space-y-2.5">
                <li><Link href="/" className={linkCls}>Landing</Link></li>
                <li><Link href="/dashboard" className={linkCls}>Dashboard</Link></li>
                <li><Link href="/day/12" className={linkCls}>Day 12</Link></li>
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-3">Demo states</p>
              <ul className="space-y-2.5">
                <li><Link href="/dashboard?state=first-day" className={linkCls}>First day</Link></li>
                <li><Link href="/dashboard?state=missed-day" className={linkCls}>Missed day</Link></li>
                <li><Link href="/dashboard?state=empty" className={linkCls}>Empty profile</Link></li>
              </ul>
            </div>
          </nav>
        </div>
        <div className={`mt-12 flex flex-col gap-3 border-t pt-6 text-xs sm:flex-row sm:items-center sm:justify-between ${subCls}`}>
          <p className="flex items-center gap-1.5">
            <Icon name="bolt" size={13} /> Built for the ABTalks Vibe Code Hackathon · 2026
          </p>
          <p className="font-mono tracking-wide">60 days · 60 builds · one visible streak</p>
        </div>
      </div>
    </footer>
  );
}