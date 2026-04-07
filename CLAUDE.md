# OLEV Landing Page — Claude Code Context

## What OLEV Is
AI detection security platform for engineering teams. Think "canary tokens for AI."
When an AI coding tool (Cursor, Copilot, Claude Code, Devin, Aider) reads proprietary
source code, OLEV detects it — in real time, before it leaves the machine.

Two detection layers:
1. **Canary tokens** — invisible single-line code injections that fire an HTTP beacon
   when executed anywhere (local, CI, cloud AI agent). Works across all environments.
2. **OS-level agent** — wraps macOS fs_usage to monitor kernel file-open syscalls.
   Fires when an AI tool reads a file, even without executing it.

## Who The Customer Is
CTOs and engineering leaders at startups (10–200 engineers) who use AI coding tools
and are worried about proprietary code leaking into AI training data or being exfiltrated
by AI agents. The anxiety: "I don't know what my engineers are pasting into ChatGPT."

## The Pitch Angle That Works
Don't lead with features. Lead with the problem:
"Your developers use AI. Do you know what it reads?"
The detection moment (alert fires in <2 seconds on live dashboard) is the money shot.

## Live Product URLs
- Dashboard (app): https://olev-wheat.vercel.app
- Backend API: https://olev-production.up.railway.app

## Brand
- Primary blue: #2563eb (exact, pulled from product)
- Background: #f0f4ff (cool off-white with blue tint)
- Text: #111827, Muted: #4b5563, Border: #e2e8f0
- Font: Geist Sans + Geist Mono
- Radius: 6-8px, flat cards, no gradients, no decorative noise
- Reference aesthetic: tryinspector.com

## Landing Page Goal
Convert cold CTO/engineering outreach into:
1. Waitlist signups (email -> Loops)
2. Booked demo calls (Cal.com link)

## Page Structure
Nav -> Hero -> Demo video -> How it works (4 steps) -> Alert feed mockup ->
Features (6-up grid) -> FAQ (accordion) -> Waitlist CTA -> Footer

## Tech Stack
- Next.js (app router), TypeScript, Tailwind v4
- Waitlist: POST /api/waitlist -> Loops API (key in Vercel env: LOOPS_API_KEY)
- Demo booking: Cal.com link (update placeholder in page.tsx)
- Videos: <video autoplay loop muted playsinline> with src placeholders in /public/videos/

## Deployment
- Deploy to Vercel as a separate project from the main product
- Root domain olev.io -> this landing page
- app.olev.io -> the product dashboard

## Pending Drop-ins (founder will add after recording)
- /public/demo.mp4 — 60-90 second product demo video (hero section)
- /public/videos/step-01-github.mp4 — GitHub App install (10-15s loop)
- /public/videos/step-02-inject.mp4 — canary injection (10-15s loop)
- /public/videos/step-03-agent.mp4 — agent install + online flip (10-15s loop)
- /public/videos/step-04-alert.mp4 — alert firing in Cursor (10-15s loop)
- Cal.com link (replace https://cal.com/placeholder in page.tsx)
- Loops API key (add LOOPS_API_KEY to Vercel env vars)

## Founder Preferences
- Concise responses, no emojis
- Honest about limitations, don't oversell
- Never add Co-Authored-By to git commits
- Don't over-engineer

## Key Files
- app/page.tsx — entire landing page (all sections as components in one file)
- app/api/waitlist/route.ts — email capture -> Loops
- app/globals.css — brand colors, Geist font setup
- app/layout.tsx — metadata, font loading
