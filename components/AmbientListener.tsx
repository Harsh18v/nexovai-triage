"use client";

import { useEffect, useRef } from "react";
import { TranscriptLine, AgentState } from "@/lib/types";
import { AudioVisualizer } from "./AudioVisualizer";

const SPEAKER_COLOR: Record<TranscriptLine["speaker"], string> = {
  "Dr. Rao": "text-listening",
  Patient: "text-foreground",
  Nurse: "text-processing",
};

export function AmbientListener({ transcript, agentState, }: { transcript: TranscriptLine[]; agentState: AgentState; }) {

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [transcript.length]);

  return (
    <section className="flex h-full flex-col rounded-xl border border-border bg-surface">
      <header className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <h2 className="text-sm font-medium tracking-wide text-muted uppercase">Ambient Listener</h2>
          <p className="font-mono text-xs text-muted mt-0.5">Room 4 · Encounter #ED-2291</p>
        </div>
        <AudioVisualizer active={agentState === "listening"} />
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        {transcript.length === 0 && (
          <p className="text-sm text-muted font-mono">Waiting for conversation to begin…</p>
        )}
        {transcript.map((line, idx) => (
          <div
            key={line.id}
            className={idx === transcript.length - 1 ? "animate-rise-in" : ""}
          >
            <span className={`text-xs font-mono font-semibold ${SPEAKER_COLOR[line.speaker]}`}>
              {line.speaker}
            </span>
            <p className="text-sm leading-relaxed mt-0.5">{line.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
