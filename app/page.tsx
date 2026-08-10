"use client";

import { useEffect } from "react";
import { useSimulatedStream } from "@/lib/useSimulatedStream";
import { AmbientListener } from "@/components/AmbientListener";
import { LiveCaseSheet } from "@/components/LiveCaseSheet";
import { RiyaWidget } from "@/components/RiyaWidget";

export default function Home() {
  const { transcript, fields, agentState, running, start, flashKey } = useSimulatedStream();

  useEffect(() => {
    start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="min-h-screen bg-background px-6 py-6 flex flex-col gap-5">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">NexovAI Triage Room</h1>
          <p className="text-xs font-mono text-muted mt-0.5">Ambient ED voice agent · session-based, no login</p>
        </div>
        <button
          onClick={start}
          className="text-xs font-mono px-3 py-2 rounded-lg border border-border bg-surface hover:bg-surface-raised transition-colors disabled:opacity-40"
          disabled={running}
        >
          {running ? "Encounter in progress…" : "Replay encounter"}
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 flex-1 min-h-[70vh]">
        <AmbientListener transcript={transcript} agentState={agentState} />
        <LiveCaseSheet fields={fields} flashKey={flashKey} />
      </div>

      <RiyaWidget state={agentState} />
    </main>
  );
}
