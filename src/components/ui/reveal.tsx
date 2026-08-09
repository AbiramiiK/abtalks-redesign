"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Scroll reveal that is safe for screenshot bots:
 * content is visible in the server HTML; JS only hides elements
 * that are below the fold, then reveals them on scroll.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "span";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const rect = el.getBoundingClientRect();
    const belowFold = rect.top > window.innerHeight * 0.92;
    if (!belowFold) return;
    setHidden(true);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setHidden(false);
            io.disconnect();
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={className}
      style={{
        transition: `opacity 600ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 600ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        opacity: hidden ? 0 : 1,
        transform: hidden ? "translateY(16px)" : "none",
      }}
    >
      {children}
    </Tag>
  );
}