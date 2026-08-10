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
      className="fixed w-88 top-4 right-148 z-50 flex items-center gap-3 rounded-full border border-border bg-surface-raised/90 backdrop-blur px-4 py-3 shadow-2xl"
      role="status"
      aria-live="polite"
    >
      <div className="relative flex h-8 w-10 items-center justify-center">
        {meta.ring && (
          <span
            className="absolute inline-flex h-full w-full rounded-full animate-pulse-ring"
            style={{ backgroundColor: meta.color }}
          />
        )}
        <span
          className="relative inline-flex h-9 w-9 items-center justify-center rounded-full text-[11px] font-mono font-semibold text-background transition-colors duration-500"
          style={{ backgroundColor: meta.color }}
        >
          R
        </span>
      </div>
      <div className="pr-1">
        <div className="text-sm font-medium leading-tight">RIYA</div>
        <div
          className="text-xs font-mono leading-tight transition-colors duration-500"
          style={{ color: meta.color }}
        >
          {meta.label} · <span className="text-muted">{meta.sub}</span>
        </div>
      </div>
    </div>
  );
}
