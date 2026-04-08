"use client";

import { useState, useEffect } from "react";

// ── Demo Modal ─────────────────────────────────────────────────────────────────

function DemoModal({ onClose }: { onClose: () => void }) {
  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl"
        style={{ height: "80vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mac browser chrome */}
        <div className="flex h-full flex-col rounded-xl overflow-hidden border border-[#e2e8f0] shadow-2xl">
          {/* Chrome bar */}
          <div className="flex-shrink-0 bg-[#f8fafc] border-b border-[#e2e8f0] px-4 py-2.5 flex items-center gap-3">
            <div className="flex gap-1.5">
              <button
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#e0443e] transition-colors"
                aria-label="Close"
              />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex-1 bg-white border border-[#e2e8f0] rounded px-3 py-1 text-xs text-[#4b5563] font-mono">
              app.olev.io/demo
            </div>
          </div>

          {/* iframe */}
          <iframe
            src="https://olev-wheat.vercel.app/demo"
            className="flex-1 w-full bg-white"
            title="OLEV live demo"
          />
        </div>
      </div>
    </div>
  );
}

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
      <div className="relative max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <img src="/olevlogo.png" alt="OLEV" className="h-8 w-auto" />
        </a>

        {/* Center links — pinned to true center of container */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-7 text-sm text-[#4b5563] font-medium">
          <a href="#how-it-works" className="hover:text-[#111827] transition-colors">How it works</a>
          <a href="#features" className="hover:text-[#111827] transition-colors">Features</a>
          <a href="#faq" className="hover:text-[#111827] transition-colors">FAQ</a>
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-2">
          <a
            href="https://calendly.com/neudestifanoes/30min"
            className="hidden md:inline-flex items-center px-3 py-1.5 text-sm font-medium text-[#2563eb] border border-[#2563eb] rounded-md hover:bg-[#2563eb]/5 transition-colors"
          >
            Book a demo
          </a>
          <a
            href="#waitlist"
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-[#2563eb] rounded-md hover:bg-[#1d4ed8] transition-colors"
          >
            Request early access
          </a>
        </div>
      </div>
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  const [showDemo, setShowDemo] = useState(false);

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
          Know the moment AI touches your code.
        </h1>

        {/* Subheadline */}
        <p className="text-lg text-[#4b5563] max-w-xl mx-auto leading-relaxed mb-9">
          Canary tokens follow your code into any environment. The OS agent monitors file reads at the kernel level. Two layers, zero blind spots.
        </p>

        {/* CTAs */}
        <div className="flex items-center justify-center">
          <button
            onClick={() => setShowDemo(true)}
            className="relative overflow-hidden inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-[#111827] border border-[#e2e8f0] rounded-md bg-white hover:border-[#2563eb] hover:text-[#2563eb] transition-colors"
          >
            {/* Scan line */}
            <span
              className="pointer-events-none absolute inset-y-0 w-8"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.25), transparent)",
                animation: "scan 2.4s ease-in-out infinite",
              }}
            />
            Take a peek
          </button>
        </div>
      </div>
      {showDemo && <DemoModal onClose={() => setShowDemo(false)} />}
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
              olev.com/dashboard
            </div>
          </div>

          {/* Video area */}
          <div className="aspect-video">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/37cbDa6ZT3s?rel=0&modestbranding=1"
              title="OLEV Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        <p className="text-center text-xs text-[#9ca3af] mt-3">
          Watch live detection fire in under 2 seconds, no editing, no cuts
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
      "Install the OLEV GitHub App on your org in one click. Your repos appear in the dashboard instantly, no PAT, no config files, no manual setup.",
    video: "/videos/step-01-github.mp4",
  },
  {
    num: "02",
    title: "Inject canary policies",
    description:
      "Select the files you want to monitor. OLEV injects invisible canary lines, single-line additions that don't affect behavior, don't break tests, and are undetectable to normal code review.",
    video: "/videos/step-02-inject.mp4",
  },
  {
    num: "03",
    title: "Deploy the OS watcher",
    description:
      "Run one install command from your Settings page. The OLEV agent monitors kernel file-open syscalls in real time, catching AI tools that read your code even without executing it.",
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
          <p className="text-[#4b5563] mt-2 text-sm">Four steps. No new infrastructure.</p>
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


function AlertFeed() {
  return (
    <section className="px-6 pb-28">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-semibold text-[#111827] tracking-tight">What alerts look like</h2>
          <p className="text-[#4b5563] mt-2 text-sm">Plain English. Every alert tells you who, what, where, and how risky.</p>
        </div>

        {/* Screenshot composite — list view with detail panel overlapping */}
        <div className="relative">
          {/* Main: alerts list */}
          <div className="rounded-xl overflow-hidden border border-[#e2e8f0] shadow-md">
            <img
              src="/alerts-list.png"
              alt="OLEV alerts dashboard"
              className="w-full block"
            />
          </div>

          {/* Overlay: expanded alert detail panel — matches height of list */}
          <div className="absolute top-0 right-4 sm:right-8 h-full rounded-xl overflow-hidden border border-[#e2e8f0] shadow-2xl">
            <img
              src="/alert-detail.png"
              alt="OLEV alert detail"
              className="h-full w-auto block"
            />
          </div>
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
    description: "Kernel syscall monitoring. Catches AI reads before any network call is made.",
  },
  {
    icon: "⬡",
    title: "Cloud IP detection",
    description: "AWS, GCP, and Azure ASN resolution. Know immediately if execution happened on cloud infrastructure, not a human.",
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
    description: "Detects when an AI agent removes a canary line from your code, a high-signal indicator of adversarial behavior.",
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
    a: "Cursor, GitHub Copilot, Claude Code, Aider, Devin, Sourcegraph Cody, and Continue.dev, as well as any process that executes injected canary code, including raw scripts and CI agents. Expanding soon to cover tracked copy-paste detection for web LLMs including ChatGPT, Gemini, and Claude.ai.",
  },
  {
    q: "Does this require changes to my codebase?",
    a: "Canary injection adds a single silent line per file. It doesn't affect behavior, doesn't show up in tests, and doesn't change any logic. The OS agent runs separately and requires no code changes at all.",
  },
  {
    q: "What about raw pastes into ChatGPT?",
    a: "Coming in the next update: silent read detection via Apple ESF on macOS and ETW on Windows, catching file access before anything is pasted or sent. Right now, if code is pasted without execution the canary won't fire. The OS agent covers reads on managed devices.",
  },
  {
    q: "What does pricing look like?",
    a: "We're in pilot pricing right now. Early access companies set the pricing, reach out and we'll talk through what makes sense for your team size and risk profile.",
  },
  {
    q: "Is my source code ever sent to OLEV servers?",
    a: "No. OLEV never sees your source code. Canary tokens fire a minimal beacon (token ID, IP, timestamp, user agent) when executed. The OS agent reports file paths and process names, not file contents.",
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
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, company, companyUrl }),
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 mb-6 text-left">
            <input
              type="text"
              placeholder="Full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2.5 text-sm border border-[#e2e8f0] rounded-md outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition"
            />
            <input
              type="email"
              required
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 text-sm border border-[#e2e8f0] rounded-md outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition"
            />
            <input
              type="text"
              placeholder="Company name (optional)"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-4 py-2.5 text-sm border border-[#e2e8f0] rounded-md outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition"
            />
            <input
              type="text"
              placeholder="Company website (optional)"
              value={companyUrl}
              onChange={(e) => setCompanyUrl(e.target.value)}
              className="w-full px-4 py-2.5 text-sm border border-[#e2e8f0] rounded-md outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full px-5 py-2.5 text-sm font-semibold text-white bg-[#2563eb] rounded-md hover:bg-[#1d4ed8] transition-colors disabled:opacity-60"
            >
              {status === "loading" ? "Joining..." : "Join waitlist"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="text-xs text-[#dc2626] mb-4">Something went wrong. Email us at founders@tryolev.com</p>
        )}

        <div className="flex items-center gap-3 text-xs text-[#9ca3af] mb-6">
          <div className="flex-1 h-px bg-[#e2e8f0]" />
          or
          <div className="flex-1 h-px bg-[#e2e8f0]" />
        </div>

        <a
          href="https://calendly.com/neudestifanoes/30min"
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
          <img src="/olevlogo.png" alt="OLEV" className="h-6 w-auto" />
          <span className="text-[#9ca3af]">© 2026</span>
        </div>
        <div className="flex items-center gap-5">
          <a href="/privacy" className="hover:text-[#111827] transition-colors">Privacy</a>
          <a href="/terms" className="hover:text-[#111827] transition-colors">Terms</a>
          <a href="mailto:founders@tryolev.com" className="hover:text-[#111827] transition-colors">founders@tryolev.com</a>
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
        <div className="relative">
          {/* Grid background — fades out by bottom of demo video */}
          <div
            className="absolute inset-0 pointer-events-none -z-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(37,99,235,0.07) 1px, transparent 1px), linear-gradient(to right, rgba(37,99,235,0.07) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
              WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 50%, transparent 100%)",
              maskImage: "linear-gradient(to bottom, black 0%, black 50%, transparent 100%)",
            }}
          />
          <Hero />
          <DemoVideo />
        </div>
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
