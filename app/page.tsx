"use client";

import { useEffect, useState } from "react";
import { useSimulatedStream } from "@/lib/useSimulatedStream";
import { AmbientListener } from "@/components/AmbientListener";
import { LiveCaseSheet } from "@/components/LiveCaseSheet";

type ThemeMode = "light" | "dark";

const stats = [
  { label: "Arrived", value: "20:45" },
  { label: "Triage", value: "Level 2" },
  { label: "Attending", value: "Dr. Rao" },
  { label: "Allergies", value: "Penicillin" },
];

export default function Home() {
  const { transcript, fields, agentState, running, start, flashKey } = useSimulatedStream();
  const [theme, setTheme] = useState<ThemeMode>("dark");

  useEffect(() => {
    start();
    const savedTheme = window.localStorage.getItem("nexovai-theme") as ThemeMode | null;
    const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const nextTheme = savedTheme ?? preferredTheme;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    document.documentElement.style.colorScheme = nextTheme;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem("nexovai-theme", theme);
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <main className={`min-h-screen px-4 py-6 transition-colors duration-300 sm:px-6 lg:px-8 ${isDark ? "bg-[#050505] text-zinc-100" : "bg-transparent text-slate-900"}`}>
      <div className="mx-auto max-w-7xl">
        <header className={`mb-6 flex items-center justify-between rounded-full border px-4 py-3 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl ${isDark ? "border-zinc-800 bg-zinc-950/80 shadow-[0_10px_30px_rgba(0,0,0,0.35)]" : "border-slate-300 bg-white/80"}`}>
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-full border text-[11px] font-semibold shadow-sm ${isDark ? "border-zinc-700 bg-zinc-100 text-zinc-950" : "border-slate-300 bg-slate-950 text-white"}`}>
              Nexov
            </div>
            <div>
              <div className={`text-md font-semibold tracking-wide ${isDark ? "text-zinc-100" : "text-slate-900"}`}>NexovAI</div>
              <div className={`text-[10px] font-medium uppercase tracking-wide ${isDark ? "text-zinc-400" : "text-slate-500"}`}>triage room</div>
            </div>
          </div>

          <nav className={`hidden cursor-pointer items-center gap-6 rounded-full border px-3.5 py-2 text-sm font-medium md:flex ${isDark ? "border-zinc-800 bg-zinc-900/80 text-zinc-300" : "border-slate-300 bg-white text-slate-700"}`}>
            <span className={`transition-colors ${isDark ? "hover:text-white" : "hover:text-slate-900"}`}>Overview</span>
            <span className={`transition-colors ${isDark ? "hover:text-white" : "hover:text-slate-900"}`}>Signals</span>
            <span className={`transition-colors ${isDark ? "hover:text-white" : "hover:text-slate-900"}`}>Summary</span>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={start}
              className={`rounded-full cursor-pointer border px-3.5 py-2 text-xs font-medium shadow-sm transition disabled:cursor-not-allowed disabled:opacity-60 ${isDark ? "border-zinc-700 bg-zinc-900 text-zinc-100 hover:border-zinc-600 hover:text-white" : "border-slate-300 bg-white text-slate-800 hover:border-slate-300 hover:text-slate-950"}`}
              disabled={running}
            >
              {running ? "Live…" : "Replay encounter"}
            </button>
            <button
              type="button"
              aria-label="Toggle color theme"
              onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
              className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-medium transition ${isDark ? "border-zinc-700 bg-zinc-900 text-zinc-100 hover:bg-zinc-800" : "border-slate-300 bg-white text-slate-800 hover:bg-slate-50"}`}
            >
              {isDark ? "☀" : "☾"}
            </button>


          </div>
        </header>

        <section className={`mb-6 overflow-hidden rounded-[28px] border p-5 shadow-[0_20px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl sm:p-6 lg:p-7 ${isDark ? "border-zinc-800 bg-zinc-950/80 shadow-[0_20px_50px_rgba(0,0,0,0.32)]" : "border-slate-300 bg-white"}`}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p>Patient name:</p>
              <h1 className={`text-3xl font-semibold tracking-tight sm:text-4xl ${isDark ? "text-white" : "text-slate-950"}`}>
                Rohan Mehta
              </h1>
              <p className={`mt-3 max-w-lg text-sm leading-6 ${isDark ? "text-zinc-300" : "text-slate-700"}`}>
                36 years · Male · ED-2048
              </p>
            </div>

            <div className="grid max-w-md grid-cols-2 gap-2 sm:max-w-lg sm:grid-cols-8 lg:max-w-none lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className={`rounded-2xl border p-3 ${isDark ? "border-zinc-800 bg-zinc-900/80" : "border-slate-300 bg-white"}`}>
                  <div className={`text-[10px] font-medium uppercase tracking-[0.18em] ${isDark ? "text-zinc-400" : "text-slate-700"}`}>{stat.label}</div>
                  <div className={`mt-2 text-xl font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <AmbientListener transcript={transcript} agentState={agentState} />
          <LiveCaseSheet fields={fields} flashKey={flashKey} />
        </div>
      </div>
    </main>
  );
}
