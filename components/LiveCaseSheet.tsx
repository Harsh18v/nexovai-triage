"use client";

import { FieldUpdate } from "@/lib/types";

const SECTIONS: { key: FieldUpdate["section"]; label: string }[] = [
  { key: "demographics", label: "Demographics" },
  { key: "vitals", label: "Vitals" },
  { key: "actions", label: "Action Items" },
];

function FieldRow({ field, flashing, }: { field: FieldUpdate; flashing: boolean; }) {
  return (
    <div
      className={`flex items-center justify-between rounded-2xl border px-3 py-2.5 transition-colors duration-500 ${field.critical ? "border-red-400 bg-red-50/60 dark:border-red-500/60 dark:bg-red-950/20" : "border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/70"} ${flashing ? "animate-field-flash" : ""}`}
      style={flashing ? ({ "--flash-color": field.critical ? "var(--color-alerting)" : "var(--color-processing)" } as React.CSSProperties) : undefined}
    >
      <span className="text-[12px] text-slate-600 dark:text-zinc-300">{field.label}</span>
      <span className={`text-sm font-semibold ${field.critical ? "text-red-600 dark:text-red-400" : "text-slate-900 dark:text-zinc-100"}`}>
        {field.value}
      </span>
    </div>
  );
}

function EmptyRow({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-dashed border-slate-200 bg-white px-3 py-2.5 dark:border-zinc-700 dark:bg-zinc-900/70">
      <span className="text-[11px] text-slate-300 dark:text-zinc-500">{label}</span>
      <span className="text-sm text-slate-300 dark:text-zinc-500">— pending —</span>
    </div>
  );
}

export function LiveCaseSheet({ fields, flashKey, }: { fields: Record<string, FieldUpdate>; flashKey: string | null; }) {

  const bySection = (section: FieldUpdate["section"]) =>
    Object.entries(fields).filter(([key]) => key.startsWith(section + "."));

  return (
    <section className="flex h-128 flex-col overflow-hidden rounded-4xl border border-slate-300 bg-white backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/90">
      <header className="border-b border-slate-300 bg-white px-6 py-4.5 dark:border-zinc-800 dark:bg-zinc-950/90">
        <h2 className="text-md font-semibold tracking-tight text-slate-600 dark:text-zinc-200">Live case sheet</h2>
        <p className="mt-1 text-[11px] text-slate-500 dark:text-zinc-400">Auto-populated from ambient audio</p>
      </header>

      <div className="flex-1 space-y-5 overflow-y-auto px-5 py-4">
        {SECTIONS.map((section) => {
          const entries = bySection(section.key);
          return (
            <div key={section.key} className="space-y-2 rounded-2xl border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/70" >
              <h3 className="mb-2 text-[10px] font-medium uppercase tracking-wide text-slate-600 dark:text-zinc-300">
                {section.label}
              </h3>
              <div className="space-y-2">
                {entries.length === 0 && <EmptyRow label="Awaiting data" />}
                {entries.map(([key, field]) => (
                  <FieldRow key={key} field={field} flashing={flashKey === key} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
