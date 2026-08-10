export type AgentState = "idle" | "listening" | "processing" | "alerting";

export type TranscriptLine = {
  id: string;
  speaker: "Dr. Rao" | "Patient" | "Nurse";
  text: string;
};

export type FieldUpdate = {
  section: "vitals" | "demographics" | "actions";
  key: string;
  label: string;
  value: string;
  critical?: boolean;
};

export type TimelineEvent =
  | { t: number; kind: "transcript"; payload: TranscriptLine }
  | { t: number; kind: "field"; payload: FieldUpdate }
  | { t: number; kind: "agent"; payload: AgentState };
