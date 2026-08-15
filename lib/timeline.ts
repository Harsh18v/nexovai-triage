import { TimelineEvent } from "./types";

// A scripted ER encounter. `t` is milliseconds from simulation start.
// This is the single source of truth the whole demo is driven from.
export const timeline: TimelineEvent[] = [
  { t: 0, kind: "agent", payload: "listening" },
  {
    t: 500,
    kind: "transcript",
    payload: { id: "l1", speaker: "Dr. Rao", text: "Alright, what brings you in tonight?" },
  },
  {
    t: 2200,
    kind: "transcript",
    payload: {
      id: "l2",
      speaker: "Patient",
      text: "Chest pain, started about an hour ago. Feels tight, radiating to my left arm.",
    },
  },
  { t: 3800, kind: "agent", payload: "processing" },
  {
    t: 4300,
    kind: "field",
    payload: { section: "demographics", key: "chiefComplaint", label: "Chief Complaint", value: "Chest pain, radiating to left arm" },
  },
  { t: 4600, kind: "agent", payload: "listening" },
  {
    t: 5200,
    kind: "transcript",
    payload: { id: "l3", speaker: "Dr. Rao", text: "Can I get your full name and age?" },
  },
  {
    t: 6800,
    kind: "transcript",
    payload: { id: "l4", speaker: "Patient", text: "Rohan Mehta, I'm 36." },
  },
  { t: 8000, kind: "agent", payload: "processing" },
  { t: 8500, kind: "field", payload: { section: "demographics", key: "name", label: "Patient Name", value: "Rohan Mehta" } },
  { t: 8900, kind: "field", payload: { section: "demographics", key: "age", label: "Age", value: "36" } },
  { t: 9100, kind: "agent", payload: "listening" },
  {
    t: 9800,
    kind: "transcript",
    payload: { id: "l5", speaker: "Nurse", text: "BP is 158 over 96, heart rate 112, sats 94 on room air." },
  },
  { t: 11200, kind: "agent", payload: "processing" },
  { t: 11700, kind: "field", payload: { section: "vitals", key: "bp", label: "Blood Pressure", value: "158/96 mmHg" } },
  { t: 12000, kind: "field", payload: { section: "vitals", key: "hr", label: "Heart Rate", value: "112 bpm" } },
  {
    t: 12300,
    kind: "field",
    payload: { section: "vitals", key: "spo2", label: "SpO2", value: "94%", critical: true },
  },
  { t: 12600, kind: "agent", payload: "alerting" },
  {
    t: 13800,
    kind: "transcript",
    payload: { id: "l6", speaker: "Dr. Rao", text: "Let's get an ECG and a troponin, and start him on aspirin 300mg now." },
  },
  { t: 15200, kind: "agent", payload: "processing" },
  { t: 15700, kind: "field", payload: { section: "actions", key: "ecg", label: "Order", value: "12-lead ECG" } },
  { t: 16000, kind: "field", payload: { section: "actions", key: "troponin", label: "Order", value: "Troponin panel" } },
  { t: 16300, kind: "field", payload: { section: "actions", key: "aspirin", label: "Medication", value: "Aspirin 300mg PO" } },
  { t: 16700, kind: "agent", payload: "listening" },
  {
    t: 17500,
    kind: "transcript",
    payload: { id: "l7", speaker: "Patient", text: "Is it a heart attack, doctor?" },
  },
  {
    t: 19200,
    kind: "transcript",
    payload: {
      id: "l8",
      speaker: "Dr. Rao",
      text: "We're treating it as a possible cardiac event until the tests say otherwise. You're in good hands.",
    },
  },
  { t: 21500, kind: "agent", payload: "idle" },
];

export const TIMELINE_DURATION = timeline[timeline.length - 1].t + 2000;
