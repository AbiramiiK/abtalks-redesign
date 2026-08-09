import type { ReactNode } from "react";

export function SectionHead({
  eyebrow,
  title,
  lede,
  tone = "light",
  align = "left",
  id,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  id?: string;
  className?: string;
}) {
  const titleColor = tone === "dark" ? "text-night-paper" : "text-ink";
  const ledeColor = tone === "dark" ? "text-night-paper/60" : "text-mut";
  const eyebrowColor = tone === "dark" ? "text-night-paper/50" : "text-mut";
  const centered = align === "center";
  return (
    <div id={id} className={`${centered ? "text-center" : ""} ${className}`}>
      {eyebrow ? <p className={`eyebrow mb-3 ${eyebrowColor}`}>{eyebrow}</p> : null}
      <h2 className={`font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl ${titleColor}`}>
        {title}
      </h2>
      {lede ? (
        <p className={`mt-4 max-w-xl text-[15px] leading-relaxed ${centered ? "mx-auto" : ""} ${ledeColor}`}>
          {lede}
        </p>
      ) : null}
    </div>
  );
}