import type { ReactNode } from "react";

interface StampProps {
  children: ReactNode;
  tone?: "accent" | "ink" | "good" | "paper";
  solid?: boolean;
  className?: string;
  rotate?: string;
}

/** A proof stamp: bordered mono label, slightly rotated. */
export function Stamp({ children, tone = "accent", solid, className = "", rotate = "-3deg" }: StampProps) {
  const colors = {
    accent: "text-accent",
    ink: "text-ink",
    good: "text-good",
    paper: "text-night-paper",
  };
  return (
    <span
      className={`stamp ${solid ? "stamp-solid" : ""} ${colors[tone]} ${className}`}
      style={{ transform: `rotate(${rotate})` }}
    >
      {children}
    </span>
  );
}