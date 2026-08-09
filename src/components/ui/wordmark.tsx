import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "../icons";

/** ABTalks wordmark: wordmark type with a signal-orange square. */
export function Wordmark({
  tone = "ink",
  href,
  className = "",
}: {
  tone?: "ink" | "paper";
  href?: string;
  className?: string;
}) {
  const text = tone === "paper" ? "text-night-paper" : "text-ink";
  const inner = (
    <span className={`inline-flex items-baseline gap-1.5 font-display font-bold tracking-tight select-none ${text}`}>
      <span className="text-[1.35em] leading-none">
        ab<span className="text-accent">t</span>alks
      </span>
      <span className="h-2 w-2 rounded-[3px] bg-accent" aria-hidden="true" />
    </span>
  );
  if (!href) return <span className={className}>{inner}</span>;
  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center ${className}`}
      aria-label="ABTalks home"
    >
      {inner}
    </Link>
  );
}

type ButtonVariant = "primary" | "accent" | "outline" | "ghost" | "paper" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface BtnProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: "arrow" | "arrow-up" | "check" | "none";
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-ink text-paper hover:bg-night-2",
  accent: "bg-accent text-white hover:bg-accent-deep",
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper",
  ghost: "text-ink hover:bg-ink/5",
  paper: "bg-paper text-ink hover:bg-white",
  danger: "border border-warn/40 text-warn hover:bg-warn/5",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "px-3.5 py-2 text-[13px] gap-1.5",
  md: "px-5 py-3 text-sm gap-2",
  lg: "px-6 py-3.5 text-[15px] gap-2",
};

export function Btn({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  icon = "none",
  type = "button",
  disabled = false,
  className = "",
  ariaLabel,
}: BtnProps) {
  const iconNode =
    icon === "arrow" ? (
      <Icon name="arrow-right" size={16} className="shrink-0" />
    ) : icon === "arrow-up" ? (
      <Icon name="arrow-up-right" size={16} className="shrink-0" />
    ) : icon === "check" ? (
      <Icon name="check" size={16} className="shrink-0" />
    ) : null;
  const cls = `btn-press inline-flex items-center justify-center rounded-lg font-semibold leading-none ${SIZES[size]} ${VARIANTS[variant]} ${disabled ? "pointer-events-none opacity-50" : ""} ${className}`;
  if (href) {
    return (
      <Link href={href} className={cls} onClick={onClick} aria-label={ariaLabel}>
        {children}
        {iconNode}
      </Link>
    );
  }
  return (
    <button type={type ?? "button"} className={cls} onClick={onClick} disabled={disabled} aria-label={ariaLabel}>
      {children}
      {iconNode}
    </button>
  );
}

export function Chip({
  children,
  tone = "neutral",
  className = "",
}: {
  children: ReactNode;
  tone?: "neutral" | "accent" | "good" | "dark" | "warn";
  className?: string;
}) {
  const tones: Record<string, string> = {
    neutral: "bg-ink/5 text-ink",
    accent: "bg-accent/10 text-accent-deep",
    good: "bg-good/10 text-good",
    dark: "bg-night text-paper",
    warn: "bg-warn/10 text-warn",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] ${tones[tone] ?? tones.neutral} ${className}`}
    >
      {children}
    </span>
  );
}