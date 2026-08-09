"use client";

import { useEffect, useState } from "react";

export function ProgressBar({
  value,
  tone = "accent",
  className = "",
  height = "h-2.5",
}: {
  /** 0..100 */
  value: number;
  tone?: "accent" | "ink" | "good";
  className?: string;
  height?: string;
}) {
  const [w, setW] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setW(Math.max(0, Math.min(100, value))), 60);
    return () => clearTimeout(t);
  }, [value]);
  const colors = { accent: "bg-accent", ink: "bg-ink", good: "bg-good" };
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={`w-full overflow-hidden rounded-full bg-ink/8 ${height} ${className}`}
    >
      <div
        className={`${colors[tone]} h-full rounded-full transition-[width] duration-700 ease-out`}
        style={{ width: `${w}%` }}
      />
    </div>
  );
}

export function ProgressRing({
  value,
  size = 92,
  stroke = 7,
  tone = "accent",
  label,
  sublabel,
  className = "",
}: {
  /** 0..100 */
  value: number;
  size?: number;
  stroke?: number;
  tone?: "accent" | "ink" | "good";
  label?: string;
  sublabel?: string;
  className?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const [dash, setDash] = useState(c);
  useEffect(() => {
    const t = setTimeout(() => setDash(c * (1 - Math.max(0, Math.min(100, value)) / 100)), 80);
    return () => clearTimeout(t);
  }, [value, c]);
  const colors = { accent: "text-accent", ink: "text-ink", good: "text-good" };
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} role="progressbar" aria-valuenow={Math.round(value)} aria-valuemin={0} aria-valuemax={100}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} className="stroke-ink/8" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          className={`${colors[tone]} transition-[stroke-dashoffset] duration-700 ease-out`}
          strokeDasharray={c}
          strokeDashoffset={dash}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {label ? (
          <span className="font-display text-xl font-bold text-ink tnum">{label}</span>
        ) : null}
        {sublabel ? <span className="text-[10px] font-mono uppercase tracking-wider text-mut">{sublabel}</span> : null}
      </div>
    </div>
  );
}