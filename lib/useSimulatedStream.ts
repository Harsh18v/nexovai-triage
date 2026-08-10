"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { timeline, TIMELINE_DURATION } from "./timeline";
import { AgentState, TranscriptLine, FieldUpdate } from "./types";

export function useSimulatedStream() {
  const [transcript, setTranscript] = useState<TranscriptLine[]>([]);
  const [fields, setFields] = useState<Record<string, FieldUpdate>>({});
  const [agentState, setAgentState] = useState<AgentState>("idle");
  const [running, setRunning] = useState(false);
  const [flashKey, setFlashKey] = useState<string | null>(null);

  const startedAtRef = useRef<number | null>(null);
  const cursorRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const reset = useCallback(() => {
    setTranscript([]);
    setFields({});
    setAgentState("idle");
    cursorRef.current = 0;
    startedAtRef.current = null;
  }, []);

  const start = useCallback(() => {
    reset();
    setRunning(true);
    startedAtRef.current = performance.now();
  }, [reset]);

  useEffect(() => {
    if (!running) return;

    const tick = (now: number) => {
      const elapsed = now - (startedAtRef.current ?? now);

      while (cursorRef.current < timeline.length && timeline[cursorRef.current].t <= elapsed) {
        const evt = timeline[cursorRef.current];
        if (evt.kind === "transcript") {
          setTranscript((prev) => [...prev, evt.payload]);
        } else if (evt.kind === "agent") {
          setAgentState(evt.payload);
        } else if (evt.kind === "field") {
          const key = `${evt.payload.section}.${evt.payload.key}`;
          setFields((prev) => ({ ...prev, [key]: evt.payload }));
          setFlashKey(key);
          setTimeout(() => setFlashKey((k) => (k === key ? null : k)), 900);
        }
        cursorRef.current += 1;
      }

      if (elapsed >= TIMELINE_DURATION) {
        setRunning(false);
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [running]);

  return { transcript, fields, agentState, running, start, flashKey };
}
