import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/icons";
import { Wordmark } from "@/components/ui/wordmark";

export function AppHeader({
  backHref,
  backLabel = "Go back",
  center,
  right,
}: {
  backHref?: string;
  backLabel?: string;
  center?: ReactNode;
  right?: ReactNode;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-3 px-5">
        <div className="flex min-w-0 items-center gap-2.5">
          {backHref ? (
            <Link
              href={backHref}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-card text-ink transition-colors hover:border-ink"
              aria-label={backLabel}
            >
              <Icon name="arrow-left" size={16} />
            </Link>
          ) : (
            <Wordmark href="/dashboard" />
          )}
          {center ? <div className="hidden min-w-0 sm:block">{center}</div> : null}
        </div>
        {right ? <div className="flex shrink-0 items-center gap-2">{right}</div> : <Wordmark href="/dashboard" />}
      </div>
    </header>
  );
}

/** Sticky bottom action bar - mobile-first convenience, hidden on tall screens. */
export function StickyBar({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`sticky bottom-0 z-40 border-t border-line bg-paper/90 backdrop-blur ${className}`}
    >
      <div className="mx-auto flex w-full max-w-5xl items-center gap-3 px-5 py-3">{children}</div>
    </div>
  );
}