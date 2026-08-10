# NexovAI Triage Room

An ambient AI dashboard concept for the ER, built for NexovAI's frontend internship assignment. Simulates a voice assistant (**RIYA**) that listens to a doctor-patient conversation and auto-fills a live case sheet in real time — no audio/backend required, driven entirely by a scripted mock timeline.

## Features

- **Ambient Listener** — live scrolling transcript with a simulated audio waveform
- **Live Case Sheet** — vitals, demographics, and action items auto-populate as the "conversation" progresses, with a flash animation on update
- **RIYA Widget** — persistent floating agent with 4 visual states: Idle, Listening, Processing, Alerting
- Dark-mode clinical UI, built for a high-stress ER context

## Tech Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- No backend — mock data engine using `setInterval` + a scripted event timeline

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the simulation starts automatically.

## Project Structure
