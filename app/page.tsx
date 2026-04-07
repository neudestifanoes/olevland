"use client";

import { useState, useEffect } from "react";

// ── Nav ───────────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? "bg-[#f0f4ff]/95 backdrop-blur border-b border-[#e2e8f0]" : "bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#2563eb] rounded-[4px] flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="4" cy="4" r="2" fill="white" />
              <circle cx="10" cy="4" r="2" fill="white" opacity="0.5" />
              <circle cx="4" cy="10" r="2" fill="white" opacity="0.5" />
              <circle cx="10" cy="10" r="2" fill="white" opacity="0.25" />
            </svg>
          </div>
          <span className="font-semibold text-[#111827] tracking-tight text-[15px]">OLEV</span>
        </a>

        {/* Center links */}
        <div className="hidden md:flex items-center gap-7 text-sm text-[#4b5563] font-medium">
          <a href="#how-it-works" className="hover:text-[#111827] transition-colors">How it works</a>
          <a href="#features" className="hover:text-[#111827] transition-colors">Features</a>
          <a href="#faq" className="hover:text-[#111827] transition-colors">FAQ</a>
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-2">
          <a
            href="https://cal.com/placeholder"
            className="hidden md:inline-flex items-center px-3 py-1.5 text-sm font-medium text-[#2563eb] border border-[#2563eb] rounded-md hover:bg-[#2563eb]/5 transition-colors"
          >
            Book a demo
          </a>
          <a
            href="#waitlist"
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-[#2563eb] rounded-md hover:bg-[#1d4ed8] transition-colors"
          >
            Request access
          </a>
        </div>
      </div>
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#e2e8f0] text-xs font-medium text-[#4b5563] mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2563eb] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2563eb]"></span>
          </span>
          Now in early access
        </div>

        {/* Headline */}
        <h1 className="text-[2.6rem] sm:text-5xl font-semibold tracking-tight text-[#111827] leading-[1.1] mb-5">
          Your developers use AI.
          <br />
          Do you know what it reads?
        </h1>

        {/* Subheadline */}
        <p className="text-lg text-[#4b5563] max-w-xl mx-auto leading-relaxed mb-9">
          OLEV detects when Cursor, Copilot, or any AI coding tool reads your proprietary source code — at the OS level, before it leaves the machine.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#waitlist"
            className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-[#2563eb] rounded-md hover:bg-[#1d4ed8] transition-colors"
          >
            Request early access
          </a>
          <a
            href="https://cal.com/placeholder"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1 px-5 py-2.5 text-sm font-medium text-[#111827] border border-[#e2e8f0] rounded-md bg-white hover:border-[#2563eb] hover:text-[#2563eb] transition-colors"
          >
            Book a 20-min demo
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 7h10M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Demo Video ────────────────────────────────────────────────────────────────

function DemoVideo() {
  return (
    <section className="px-6 pb-24">
      <div className="max-w-3xl mx-auto">
        {/* Browser chrome wrapper */}
        <div className="rounded-xl overflow-hidden border border-[#e2e8f0] shadow-lg bg-white">
          {/* Chrome bar */}
          <div className="bg-[#f8fafc] border-b border-[#e2e8f0] px-4 py-2.5 flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#fee2e2]" />
              <div className="w-3 h-3 rounded-full bg-[#fef9c3]" />
              <div className="w-3 h-3 rounded-full bg-[#dcfce7]" />
            </div>
            <div className="flex-1 bg-white border border-[#e2e8f0] rounded px-3 py-1 text-xs text-[#4b5563] font-mono">
              olev-wheat.vercel.app/dashboard/alerts
            </div>
          </div>

          {/* Video area */}
          <div className="relative bg-[#f0f4ff] aspect-video flex items-center justify-center">
            {/* Placeholder until real video is dropped in */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#2563eb] flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-[#1d4ed8] transition-colors">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="white">
                  <path d="M7 4l12 7-12 7V4z" />
                </svg>
              </div>
              <p className="text-sm text-[#4b5563]">Demo video coming soon</p>
              <p className="text-xs text-[#9ca3af] mt-1">Replace this div with a &lt;video&gt; or Loom embed</p>
            </div>

            {/* Uncomment and replace src when video is ready: */}
            {/* <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              src="/demo.mp4"
            /> */}
          </div>
        </div>

        <p className="text-center text-xs text-[#9ca3af] mt-3">
          Watch live detection fire in under 2 seconds — no editing, no cuts
        </p>
      </div>
    </section>
  );
}

// ── How It Works ──────────────────────────────────────────────────────────────

const STEPS = [
  {
    num: "01",
    title: "Connect your repos",
    description:
      "Install the OLEV GitHub App on your org in one click. Your repos appear in the dashboard instantly — no PAT, no config files, no manual setup.",
    video: "/videos/step-01-github.mp4",
  },
  {
    num: "02",
    title: "Inject canary policies",
    description:
      "Select the files you want to monitor. OLEV injects invisible canary lines — single-line additions that don't affect behavior, don't break tests, and are undetectable to normal code review.",
    video: "/videos/step-02-inject.mp4",
  },
  {
    num: "03",
    title: "Deploy the OS watcher",
    description:
      "Run one install command from your Settings page. The OLEV agent monitors kernel file-open syscalls in real time — catching AI tools that read your code even without executing it.",
    video: "/videos/step-03-agent.mp4",
  },
  {
    num: "04",
    title: "AI reads your code. Both layers catch it.",
    description:
      "The moment an AI tool touches a monitored file, both detection layers fire. The dashboard logs the file accessed, the tool identified, the IP, geo, and whether it's cloud infrastructure or a local machine. Slack gets notified instantly.",
    video: "/videos/step-04-alert.mp4",
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 pb-28">
      <div className="max-w-5xl mx-auto">
        <div className="mb-14 text-center">
          <h2 className="text-2xl font-semibold text-[#111827] tracking-tight">How it works</h2>
          <p className="text-[#4b5563] mt-2 text-sm">Four steps. No new infrastructure. No agent on every machine to start.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {STEPS.map((step) => (
            <div key={step.num} className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden">
              {/* Video placeholder */}
              <div className="relative bg-[#f0f4ff] aspect-video flex items-center justify-center">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  src={step.video}
                  // poster is shown when video src isn't available yet
                />
                {/* Fallback overlay shown while video src is missing */}
                <div className="absolute inset-0 flex items-center justify-center bg-[#f0f4ff]">
                  <p className="text-xs text-[#9ca3af] font-mono">step-{step.num}.mp4</p>
                </div>
              </div>

              {/* Text */}
              <div className="p-5">
                <div className="text-xs font-mono text-[#2563eb] mb-1.5">Step {step.num}</div>
                <h3 className="text-[15px] font-semibold text-[#111827] mb-2">{step.title}</h3>
                <p className="text-sm text-[#4b5563] leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Live Alert Feed ───────────────────────────────────────────────────────────

const ALERTS = [
  {
    severity: "CRITICAL",
    severityColor: "#dc2626",
    severityBg: "#fef2f2",
    file: "src/auth/middleware.ts",
    description: "Canary executed on AWS us-east-1 — Cursor — not a human",
    tags: ["Cursor", "AWS us-east-1", "54.80.42.11"],
    time: "2 min ago",
  },
  {
    severity: "HIGH",
    severityColor: "#d97706",
    severityBg: "#fffbeb",
    file: "src/payments/stripe.ts",
    description: "Canary token deleted from file — AI agent covering tracks",
    tags: ["Deletion", "GitHub App", "PR #214"],
    time: "18 min ago",
  },
  {
    severity: "INFO",
    severityColor: "#2563eb",
    severityBg: "#eff6ff",
    file: "lib/db/schema.prisma",
    description: "File read on local IP — Claude Code — low risk, local dev",
    tags: ["Claude Code", "192.168.1.12", "Local"],
    time: "1 hr ago",
  },
];

function AlertFeed() {
  return (
    <section className="px-6 pb-28">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-semibold text-[#111827] tracking-tight">What alerts look like</h2>
          <p className="text-[#4b5563] mt-2 text-sm">Plain English. Every alert tells you who, what, where, and how risky.</p>
        </div>

        <div className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden divide-y divide-[#f1f5f9]">
          {ALERTS.map((a, i) => (
            <div key={i} className="px-5 py-4 flex items-start gap-4">
              {/* Severity dot */}
              <div className="mt-0.5 flex-shrink-0">
                <span
                  className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold"
                  style={{ color: a.severityColor, backgroundColor: a.severityBg }}
                >
                  {a.severity}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[13px] font-mono text-[#111827] truncate">{a.file}</span>
                  <span className="text-[11px] text-[#9ca3af] flex-shrink-0">{a.time}</span>
                </div>
                <p className="text-sm text-[#4b5563] mt-1">{a.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {a.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 bg-[#f1f5f9] rounded text-[11px] text-[#4b5563] font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Features ──────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: "⬡",
    title: "Canary token injection",
    description: "Invisible single-line tokens injected into your source files. Fire the moment they're executed anywhere.",
  },
  {
    icon: "⬡",
    title: "OS-level file watcher",
    description: "Kernel syscall monitoring via fs_usage. Catches AI reads before any network call is made.",
  },
  {
    icon: "⬡",
    title: "Cloud IP detection",
    description: "AWS, GCP, and Azure ASN resolution. Know immediately if execution happened on cloud infrastructure — not a human.",
  },
  {
    icon: "⬡",
    title: "GitHub App integration",
    description: "One-click install on your GitHub org. No personal access tokens, no service accounts, no manual webhook config.",
  },
  {
    icon: "⬡",
    title: "Slack notifications",
    description: "Real-time alerts in your security channel the moment a canary fires. Zero delay.",
  },
  {
    icon: "⬡",
    title: "Canary deletion alerts",
    description: "Detects when an AI agent removes a canary line from your code — a high-signal indicator of adversarial behavior.",
  },
];

function Features() {
  return (
    <section id="features" className="px-6 pb-28">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-semibold text-[#111827] tracking-tight">What you get</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <div key={f.title} className="bg-white rounded-xl border border-[#e2e8f0] p-5">
              <div className="w-8 h-8 bg-[#eff6ff] rounded-md flex items-center justify-center mb-3">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="3" fill="#2563eb" />
                  <circle cx="8" cy="8" r="6" stroke="#2563eb" strokeWidth="1.5" />
                </svg>
              </div>
              <h3 className="text-[14px] font-semibold text-[#111827] mb-1.5">{f.title}</h3>
              <p className="text-sm text-[#4b5563] leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    q: "What AI tools does OLEV detect?",
    a: "Cursor, GitHub Copilot, Claude Code, Aider, Devin, Sourcegraph Cody, and Continue.dev — as well as any process that executes injected canary code, including raw scripts and CI agents.",
  },
  {
    q: "Does this require changes to my codebase?",
    a: "Canary injection adds a single silent line per file. It doesn't affect behavior, doesn't show up in tests, and doesn't change any logic. The OS agent runs separately and requires no code changes at all.",
  },
  {
    q: "What about raw pastes into ChatGPT?",
    a: "If the code is pasted without execution, the canary token won't fire — that's an accepted gap. The OS-level agent covers file reads on managed devices. Execution-based canaries cover everything that runs.",
  },
  {
    q: "Is the OS agent production-ready?",
    a: "The current agent is a macOS prototype using fs_usage. It's demo-quality and suitable for pilots. Production-grade cross-platform monitoring (using Apple ESF and eBPF on Linux) is on the roadmap post-funding.",
  },
  {
    q: "What does pricing look like?",
    a: "We're in pilot pricing right now. Early access companies set the pricing — reach out and we'll talk through what makes sense for your team size and risk profile.",
  },
  {
    q: "Is my source code ever sent to OLEV servers?",
    a: "No. OLEV never sees your source code. Canary tokens fire a minimal beacon (token ID, IP, timestamp, user agent) when executed. The OS agent reports file paths and process names — not file contents.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="px-6 pb-28">
      <div className="max-w-2xl mx-auto">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-semibold text-[#111827] tracking-tight">Frequently asked</h2>
        </div>

        <div className="space-y-2">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 text-sm font-medium text-[#111827] hover:bg-[#f8fafc] transition-colors"
              >
                {item.q}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className={`flex-shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`}
                >
                  <path d="M3 6l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {open === i && (
                <div className="px-5 pb-4 text-sm text-[#4b5563] leading-relaxed border-t border-[#f1f5f9]">
                  <div className="pt-3">{item.a}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Waitlist ──────────────────────────────────────────────────────────────────

function Waitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="waitlist" className="px-6 pb-28">
      <div className="max-w-lg mx-auto bg-white rounded-2xl border border-[#e2e8f0] px-8 py-10 text-center shadow-sm">
        <h2 className="text-2xl font-semibold text-[#111827] tracking-tight mb-2">
          Get early access to OLEV
        </h2>
        <p className="text-sm text-[#4b5563] leading-relaxed mb-8">
          We&apos;re onboarding a small pilot cohort. Join the waitlist or book a demo with the founders.
        </p>

        {status === "done" ? (
          <div className="py-4 text-sm font-medium text-[#16a34a]">
            You&apos;re on the list. We&apos;ll be in touch shortly.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mb-6">
            <input
              type="email"
              required
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-2.5 text-sm border border-[#e2e8f0] rounded-md outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-[#2563eb] rounded-md hover:bg-[#1d4ed8] transition-colors disabled:opacity-60"
            >
              {status === "loading" ? "Joining..." : "Join waitlist"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="text-xs text-[#dc2626] mb-4">Something went wrong. Email us at founders@olev.ai</p>
        )}

        <div className="flex items-center gap-3 text-xs text-[#9ca3af] mb-6">
          <div className="flex-1 h-px bg-[#e2e8f0]" />
          or
          <div className="flex-1 h-px bg-[#e2e8f0]" />
        </div>

        <a
          href="https://cal.com/placeholder"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2563eb] hover:underline"
        >
          Book a 20-min demo with the founders
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M2 7h10M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-[#e2e8f0] px-6 py-6 bg-white">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#4b5563]">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-[#2563eb] rounded-[3px] flex items-center justify-center">
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
              <circle cx="4" cy="4" r="2" fill="white" />
              <circle cx="10" cy="4" r="2" fill="white" opacity="0.5" />
              <circle cx="4" cy="10" r="2" fill="white" opacity="0.5" />
              <circle cx="10" cy="10" r="2" fill="white" opacity="0.25" />
            </svg>
          </div>
          <span className="font-medium text-[#111827]">OLEV</span>
          <span className="text-[#9ca3af]">© 2026</span>
        </div>
        <div className="flex items-center gap-5">
          <a href="/privacy" className="hover:text-[#111827] transition-colors">Privacy</a>
          <a href="/terms" className="hover:text-[#111827] transition-colors">Terms</a>
          <a href="mailto:founders@olev.ai" className="hover:text-[#111827] transition-colors">founders@olev.ai</a>
        </div>
      </div>
    </footer>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <DemoVideo />
        <HowItWorks />
        <AlertFeed />
        <Features />
        <FAQ />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
