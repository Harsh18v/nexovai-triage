"use client";

import { AgentState } from "@/lib/types";

const STATE_META: Record<AgentState, { label: string; color: string; ring: boolean; sub: string }> = {
  idle: { label: "Idle", color: "var(--color-idle)", ring: false, sub: "Awaiting encounter" },
  listening: { label: "Listening", color: "var(--color-listening)", ring: true, sub: "Capturing conversation" },
  processing: { label: "Processing", color: "var(--color-processing)", ring: true, sub: "Extracting clinical data" },
  alerting: { label: "Alerting", color: "var(--color-alerting)", ring: true, sub: "Critical value detected" },
};

export function RiyaWidget({ state }: { state: AgentState }) {
  const meta = STATE_META[state];

  return (
    <div
      className="flex w-1/2 items-center gap-3 rounded-full border border-slate-300 bg-white px-3 py-2.5 backdrop-blur-xl transition-colors duration-300 dark:border-zinc-700 dark:bg-zinc-900/80 sm:right-6"
      role="status"
      aria-live="polite"
    >
      <div className="relative flex h-9 w-9 items-center justify-center">
        {meta.ring && (
          <span
            className="absolute inline-flex h-full w-full rounded-full animate-pulse-ring"
            style={{ backgroundColor: meta.color }}
          />
        )}
        <span
          className="relative inline-flex h-8 w-8 items-center justify-center rounded-full tracking-widest text-[10px] font-semibold text-white transition-colors duration-500"
          style={{ backgroundColor: meta.color }}
        >
          AI
        </span>
      </div>
      <div className="min-w-0 pr-1">
        <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-slate-800 dark:text-zinc-100">RIYA</div>
        <div className="text-[12px] font-medium leading-tight text-slate-400 dark:text-zinc-300" style={{ color: meta.color }}>
          {meta.label} · <span className="text-slate-400 dark:text-zinc-400">{meta.sub}</span>
        </div>
      </div>
    </div>
  );
}
