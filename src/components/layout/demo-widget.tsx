"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "../icons";
import { STATE_LABELS } from "@/lib/mock";
import type { DemoPreset } from "@/lib/types";

const ORDER: DemoPreset[] = ["active", "first-day", "missed-day", "empty"];

/**
 * Dev-only demo state switcher (kept quiet: small corner trigger).
 * Lets an evaluator experience every state without auth.
 */
export function DemoWidget({ mode = "light" }: { mode?: "light" | "dark" }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Preview demo states"
        title="Demo: preview save states"
        className={`fixed bottom-20 right-4 z-50 grid h-11 w-11 place-items-center rounded-full border shadow-lg backdrop-blur transition hover:scale-105 active:scale-95 ${
          mode === "dark"
            ? "border-night-paper/20 bg-night-paper text-night"
            : "border-line bg-card text-mut"
        }`}
      >
        <Icon name="command" size={18} />
      </button>
      {open ? (
        <div className="fixed inset-x-0 bottom-20 z-50 mx-auto w-[calc(100%-2rem)] max-w-sm rounded-xl border border-line bg-card p-4 shadow-2xl">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-display text-sm font-bold text-ink">Preview demo states</p>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="text-mut hover:text-ink">
              <Icon name="x" size={18} />
            </button>
          </div>
          <p className="mb-3 text-xs leading-relaxed text-mut">
            Skip auth: jump into each product state to see how ABTalks behaves.
          </p>
          <ul className="space-y-1.5">
            {ORDER.map((k) => (
              <li key={k}>
                <Link
                  href={`/dashboard?state=${k}`}
                  onClick={() => setOpen(false)}
                  className="group flex items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 hover:border-line hover:bg-paper"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-md bg-ink/5 text-ink group-hover:bg-ink group-hover:text-paper">
                    <Icon name={k === "active" ? "flame" : k === "first-day" ? "play" : k === "missed-day" ? "alert" : "pen"} size={15} />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-ink">{STATE_LABELS[k].label}</span>
                    <span className="block text-xs text-mut">{STATE_LABELS[k].hint}</span>
                  </span>
                  <Icon name="arrow-right" size={15} className="ml-auto text-faint opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
}