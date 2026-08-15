"use client";

import { useEffect, useRef } from "react";
import { TranscriptLine, AgentState } from "@/lib/types";
import { RiyaWidget } from "./RiyaWidget";

const SPEAKER_COLOR: Record<TranscriptLine["speaker"], string> = {
  "Dr. Rao": "text-emerald-600",
  Patient: "text-slate-700",
  Nurse: "text-indigo-600",
};

export function AmbientListener({ transcript, agentState, }: { transcript: TranscriptLine[]; agentState: AgentState; }) {

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [transcript.length]);

  return (
    <section className="flex h-128 flex-col overflow-hidden rounded-4xl border border-slate-300 bg-white backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/90">
      <header className="flex items-center justify-between border-b border-slate-300 bg-white px-5 py-3 dark:border-zinc-800 dark:bg-zinc-950/90">
        <div>
          <h2 className="text-md font-semibold uppercase tracking-tight text-slate-700 dark:text-zinc-200">Ambient listener</h2>
        </div>
        <RiyaWidget state={agentState} />
      </header>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
        {transcript.length === 0 && (
          <p className="text-sm text-slate-500 dark:text-zinc-400">Waiting for conversation to begin…</p>
        )}
        {transcript.map((line, idx) => (
          <div
            key={line.id}
            className={`${idx === transcript.length - 1 ? "animate-rise-in" : ""} rounded-2xl border border-slate-300 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900/75`}
          >
            <span className={`text-sm font-semibold ${SPEAKER_COLOR[line.speaker]}`}>
              {line.speaker}
            </span>
            <p className="mt-2 text-sm leading-6 text-slate-800 dark:text-zinc-200">{line.text}</p>
          </div>
        ))}
      </div>

    </section>
  );
}
