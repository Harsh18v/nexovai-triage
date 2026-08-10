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
      className={`flex items-center justify-between rounded-lg px-3 py-2 border transition-colors duration-500 ${field.critical ? "border-alerting/50" : "border-transparent"
        } ${flashing ? "animate-field-flash" : ""}`}
      style={flashing ? ({ "--flash-color": field.critical ? "var(--color-alerting)" : "var(--color-processing)" } as React.CSSProperties) : undefined}
    >
      <span className="text-xs font-mono text-muted">{field.label}</span>
      <span className={`text-sm font-mono font-semibold ${field.critical ? "text-alerting" : "text-foreground"}`}>
        {field.value}
      </span>
    </div>
  );
}

function EmptyRow({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg px-3 py-2 border border-transparent">
      <span className="text-xs font-mono text-muted/50">{label}</span>
      <span className="text-sm font-mono text-muted/30">— pending —</span>
    </div>
  );
}

export function LiveCaseSheet({ fields, flashKey, }: { fields: Record<string, FieldUpdate>; flashKey: string | null; }) {

  const bySection = (section: FieldUpdate["section"]) =>
    Object.entries(fields).filter(([key]) => key.startsWith(section + "."));

  return (
    <section className="flex h-full flex-col rounded-xl border border-border bg-surface overflow-hidden">
      <header className="border-b border-border px-5 py-4">
        <h2 className="text-sm font-medium tracking-wide text-muted uppercase">Live Case Sheet</h2>
        <p className="font-mono text-xs text-muted mt-0.5">Auto-populated from ambient audio</p>
      </header>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
        {SECTIONS.map((section) => {
          const entries = bySection(section.key);
          return (
            <div key={section.key}>
              <h3 className="text-[11px] font-mono uppercase tracking-widest text-muted mb-2">
                {section.label}
              </h3>
              <div className="space-y-1">
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
