"use client";

import { useState, useEffect, useLayoutEffect, useRef, type MutableRefObject } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import BorderGlow from "./components/BorderGlow";

// ── Nav ───────────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const demoClasses =
    "items-center font-medium text-primary border border-primary rounded-md hover:bg-primary/5 transition-colors whitespace-nowrap";
  const waitlistClasses =
    "items-center font-medium text-primary-foreground bg-primary rounded-md hover:bg-[var(--primary-hover)] transition-colors whitespace-nowrap";

  return (
    <nav
      className={`fixed left-0 right-0 z-50 flex justify-center transition-[top,padding] duration-300 ease-out ${
        scrolled ? "top-3 sm:top-4" : "top-2 sm:top-3"
      }`}
    >
      <div
        className={`relative flex w-full items-center justify-between transition-all duration-300 ease-out ${
          scrolled
            ? "h-11 max-w-[min(100vw-1.25rem,22rem)] rounded-lg border border-border bg-background/95 px-3 shadow-md backdrop-blur-md sm:h-12 sm:max-w-[26rem] sm:px-4"
            : "h-14 max-w-[min(100vw-1.25rem,48rem)] rounded-lg border border-border bg-background/95 px-3 shadow-md backdrop-blur-md sm:h-16 sm:max-w-[52rem] sm:px-5"
        }`}
      >
        <a href="#" className="flex shrink-0 items-center">
          <img
            src="/olevlogo.png"
            alt="OLEV"
            className={`w-auto transition-[height] duration-300 ${scrolled ? "h-6 sm:h-7" : "h-7 sm:h-8"}`}
          />
        </a>

        <div className="ml-auto flex min-w-0 shrink-0 items-center gap-1.5 sm:gap-2">
          <a
            href="https://calendly.com/neudestifanoes/30min"
            className={`inline-flex ${waitlistClasses} ${
              scrolled
                ? "px-2 py-1.5 text-[11px] sm:px-2.5 sm:py-1.5 sm:text-xs"
                : "px-2.5 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm"
            }`}
          >
            Book a demo
          </a>

        </div>
      </div>
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

/** Typing reveal for the tail of the headline — setTimeout-per-char (no extra deps). */
function HeroTypedSuffix({ text, charDelayMs = 55 }: { text: string; charDelayMs?: number }) {
  const reduceMotion = useReducedMotion();
  const [len, setLen] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setLen(text.length);
      return;
    }
    if (len >= text.length) return;
    const id = window.setTimeout(() => setLen((n) => n + 1), charDelayMs);
    return () => window.clearTimeout(id);
  }, [len, text, charDelayMs, reduceMotion]);

  const typing = len < text.length;

  return (
    <span className="text-primary">
      {text.slice(0, len)}
      {typing && (
        <span
          className="ml-0.5 inline-block h-[0.92em] w-[2px] translate-y-[0.06em] bg-primary align-middle opacity-90 motion-reduce:animate-none animate-pulse"
          aria-hidden
        />
      )}
    </span>
  );
}

function Hero() {
  const [heroEmail, setHeroEmail] = useState("");
  const [heroEmailError, setHeroEmailError] = useState("");
  const [heroWaitlistStatus, setHeroWaitlistStatus] = useState<
    "idle" | "loading" | "done" | "error"
  >("idle");

  async function handleHeroWaitlist(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = heroEmail.trim();
    if (!trimmed) {
      setHeroEmailError("Please enter email");
      return;
    }
    setHeroEmailError("");
    setHeroWaitlistStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmed,
          fullName: "",
          company: "",
          companyUrl: "",
        }),
      });
      if (!res.ok) throw new Error();
      setHeroWaitlistStatus("done");
      setHeroEmail("");
    } catch {
      setHeroWaitlistStatus("error");
    }
  }

  return (
    <section className="relative px-6 pt-32 pb-16 sm:pb-20">
      <div className="max-w-3xl mx-auto text-center h-120">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border text-xs font-medium text-muted-foreground mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Now in early access
        </div>

        {/* Headline — typed suffix; full string in aria-label for SR / SEO */}
        <h1
          className="text-[2.1rem] sm:text-5xl font-semibold tracking-tight text-foreground leading-[1.1] mb-5"
          aria-label="Prove Your Code is Secure. Win Bigger Enterprise Contracts."
        >
          <span className="block">Prove Your Code is Secure.</span>
          <span className="mt-1 block sm:mt-2">
            <HeroTypedSuffix text="Win Bigger Enterprise Contracts." />
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-l text-muted-foreground max-w-xl mx-auto leading-relaxed mb-8">
        Enterprise clients fear AI data leaks. Attach OLEV's local AI audit reports to your next RFP to guarantee IP safety and win the bid.
        </p>

        <div className="mx-auto w-full max-w-lg">
          {heroWaitlistStatus === "done" ? (
            <div className="flex flex-col gap-3">
              <p className="text-sm font-medium text-success">
                You&apos;re on the list. We&apos;ll be in touch shortly.
              </p>
              <a
                href="https://calendly.com/neudestifanoes/30min"
                className="inline-flex w-full items-center justify-center rounded-md border border-primary px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary/5 transition-colors"
              >
                Book a 15-min Demo
              </a>
            </div>
          ) : (
            <>
              <form onSubmit={handleHeroWaitlist} className="flex flex-col gap-0">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-2">
                  <input
                    type="text"
                    name="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder={"What's your work email?"}
                    value={heroEmail}
                    onChange={(e) => {
                      setHeroEmail(e.target.value);
                      if (heroEmailError) setHeroEmailError("");
                      if (heroWaitlistStatus === "error") setHeroWaitlistStatus("idle");
                    }}
                    className="min-h-[42px] min-w-0 flex-1 px-4 py-2.5 text-sm border border-border rounded-md bg-card outline-none focus:border-primary focus:ring-1 focus:ring-primary transition placeholder:text-muted-foreground/80"
                  />
                  <button
                    type="submit"
                    disabled={heroWaitlistStatus === "loading"}
                    className="shrink-0 px-5 py-2.5 text-sm font-semibold text-primary-foreground bg-primary rounded-md hover:bg-[var(--primary-hover)] transition-colors disabled:opacity-60 sm:w-auto w-full"
                  >
                    {heroWaitlistStatus === "loading" ? "Joining…" : "Request Access"}
                  </button>
                </div>
                {heroEmailError && <p className="mt-3 text-xs text-destructive">{heroEmailError}</p>}
              </form>
              <a
                href="https://calendly.com/neudestifanoes/30min"
                className="mt-2.5 inline-flex w-full items-center justify-center rounded-md border border-primary px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary/5 transition-colors"
              >
                Book a 15-min Demo
              </a>
              {heroWaitlistStatus === "error" && (
                <p className="text-xs text-destructive mt-3">
                  Something went wrong. Try again or email founders@tryolev.com
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

// ── Product showcase (zig-zag, above How it works) ────────────────────────────

const PRODUCT_SHOWCASE = [
  {
    kicker: "Coverage",
    headline: "Surgical precision. Only protect the Crown Jewels.",
    body: "Keep your developers moving fast. Deploy invisible monitoring strictly to sensitive client repositories without blocking workflows or asking enterprise clients for heavy cloud permissions.",
    imageSrc: "/showcase/coverage.png",
    imageAlt: "OLEV coverage view: file tree with canary and agent status",
    placeholderHint: "File tree with lightning (canary), eye (agent), and live badges",
    fileName: "coverage.png",
  },
  {
    kicker: "Alerts",
    headline: "Zero-noise alerts. Instant developer context.",
    body: "Get the full story instantly. Know exactly which file was accessed, which AI tool was used, and who triggered the read on a protected client project the second it happens.",
    imageSrc: "/showcase/alerts.png",
    imageAlt: "OLEV alerts table with detail panel and actor data",
    placeholderHint: "Alerts table, slide-out with IP / actor / JSON",
    fileName: "alerts.png",
  },
  {
    kicker: "Directory",
    headline: "Map AI activity directly to your team.",
    body: "Stop guessing who is using which tool. Automatically track AI IDE usage across your developers' local machines to ensure your entire team stays within strict client compliance.",
    imageSrc: "/showcase/directory.png",
    imageAlt: "OLEV directory: people vs devices and AI tool labels",
    placeholderHint: "Assigned People vs Unidentified Devices, AI tool pills",
    fileName: "directory.png",
  },
] as const;

function IconFolderSmall({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className ?? "shrink-0 text-muted-foreground"}
    >
      <path
        d="M3 8a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconFileSmall({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className ?? "shrink-0 text-muted-foreground"}
    >
      <path
        d="M14 2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8l-6-6Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CoverageCheckbox({ checked }: { checked: boolean }) {
  return (
    <motion.span
      className="flex h-4 w-4 shrink-0 items-center justify-center rounded border"
      initial={false}
      animate={{
        backgroundColor: checked ? "var(--primary)" : "rgba(255,255,255,0)",
        borderColor: checked ? "var(--primary)" : "var(--border)",
      }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      <motion.svg
        width="10"
        height="10"
        viewBox="0 0 12 12"
        fill="none"
        initial={false}
        animate={{ opacity: checked ? 1 : 0, scale: checked ? 1 : 0.5 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </motion.svg>
    </motion.span>
  );
}

function CoverageMotionPanel() {
  const reduceMotion = useReducedMotion();
  const [crownChecked, setCrownChecked] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => setCrownChecked((c) => !c), 3000);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const crownCanary = reduceMotion ? false : crownChecked;
  const crownOs = reduceMotion ? false : crownChecked;

  return (
    <div
      className="flex w-full max-w-[min(100%,36rem)] overflow-hidden rounded-xl border border-border bg-card shadow-sm"
      role="img"
      aria-label="Coverage dashboard mockup: projects sidebar and file tree with canary and OS status"
    >
      <aside className="w-[34%] max-w-[10.5rem] shrink-0 border-r border-border bg-muted/25 p-3 sm:max-w-[11.5rem] sm:p-3.5">
        <p className="text-xs font-semibold tracking-tight text-foreground">Projects</p>
        <div className="mt-3 space-y-1">
          <div className="flex items-center gap-2 rounded-md bg-primary/10 px-2 py-2">
            <span className="size-1.5 shrink-0 rounded-full bg-success" aria-hidden />
            <span className="truncate text-xs font-medium text-foreground">atlas-capital</span>
          </div>
          <div className="rounded-md px-2 py-2 text-xs text-muted-foreground bg-primary/4">loca-cole</div>
          <div className="rounded-md px-2 py-4 text-xs text-muted-foreground bg-primary/3 "></div>
          <div className="rounded-md px-2 py-4 text-xs text-muted-foreground bg-primary/2 "></div>
          <div className="rounded-md px-2 py-4 text-xs text-muted-foreground bg-primary/1 "></div>
        </div>
      </aside>

      <div className="min-w-0 flex-1 p-3 sm:p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <span className="text-sm font-semibold tracking-tight text-foreground">atlas-capital</span>
            <span className="shrink-0 rounded-full border border-success/30 bg-success/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-success">
              Safe
            </span>
          </div>
          <div className="h-7 w-[5.5rem] shrink-0 rounded-md border border-dashed border-border bg-muted/40" aria-hidden />
        </div>

        <div
          className="grid grid-cols-[minmax(0,1fr)_2.25rem_2.25rem] items-center gap-x-2 border-b border-border py-2 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground sm:gap-x-3"
          role="presentation"
        >
          <span />
          <span className="text-center">Canary</span>
          <span className="text-center">OS</span>
        </div>

        <div className="divide-y divide-border">
          <div className="grid grid-cols-[minmax(0,1fr)_2.25rem_2.25rem] items-center gap-x-2 py-2.5 sm:gap-x-3">
            <div className="flex min-w-0 items-center gap-2">
              <IconFolderSmall />
              <div className="h-2 min-w-0 flex-1 max-w-[88%] rounded-sm bg-muted" />
            </div>
            <span className="mx-auto h-4 w-4 rounded border border-border bg-card" aria-hidden />
            <span className="mx-auto h-4 w-4 rounded border border-border bg-card" aria-hidden />
          </div>
          <div className="grid grid-cols-[minmax(0,1fr)_2.25rem_2.25rem] items-center gap-x-2 py-2.5 sm:gap-x-3">
            <div className="flex min-w-0 items-center gap-2">
              <IconFolderSmall />
              <div className="h-2 min-w-0 flex-1 max-w-[72%] rounded-sm bg-muted" />
            </div>
            <span className="mx-auto h-4 w-4 rounded border border-border bg-card" aria-hidden />
            <span className="mx-auto h-4 w-4 rounded border border-border bg-card" aria-hidden />
          </div>
          <div className="grid grid-cols-[minmax(0,1fr)_2.25rem_2.25rem] items-center gap-x-2 py-2.5 sm:gap-x-3">
            <div className="flex min-w-0 items-center gap-2">
              <IconFolderSmall />
              <div className="h-2 min-w-0 flex-1 max-w-[80%] rounded-sm bg-muted" />
            </div>
            <span className="mx-auto h-4 w-4 rounded border border-border bg-card" aria-hidden />
            <span className="mx-auto h-4 w-4 rounded border border-border bg-card" aria-hidden />
          </div>

          <div className="grid grid-cols-[minmax(0,1fr)_2.25rem_2.25rem] items-center gap-x-2 py-2.5 sm:gap-x-3">
            <div className="flex min-w-0 items-center gap-2">
              <IconFileSmall className="shrink-0 text-primary" />
              <span className="truncate font-mono text-[11px] text-foreground sm:text-xs">stripe_webhook.py</span>
              <span className="shrink-0 rounded border border-primary/30 bg-primary/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-primary">
                live
              </span>
            </div>
            <div className="flex justify-center">
              <CoverageCheckbox checked={crownCanary} />
            </div>
            <div className="flex justify-center">
              <CoverageCheckbox checked={crownOs} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CoverageShowcaseVisual({ imageAlign }: { imageAlign: "inner-start" | "inner-end" }) {
  const rowJustify =
    imageAlign === "inner-start"
      ? "justify-center md:justify-start"
      : "justify-center md:justify-end";

  return (
    <div className={`flex w-full ${rowJustify}`}>
      <div className="relative w-full max-w-full sm:max-w-none">
        <CoverageMotionPanel />
      </div>
    </div>
  );
}

function IconDownloadSmall({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className ?? "shrink-0 text-foreground"}
    >
      <path d="M12 3v12M8 11l4 4 4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 21h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function AlertsMotionPanel() {
  const reduceMotion = useReducedMotion();
  const [pulseKey, setPulseKey] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => setPulseKey((k) => k + 1), 4000);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <div
      className="w-full max-w-[min(100%,44rem)] overflow-hidden rounded-xl border border-border bg-card shadow-sm"
      role="img"
      aria-label="Alerts dashboard mockup: severity, actor, target file, and time"
    >
      <div className="border-b border-border px-4 py-4 sm:px-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">Alerts</h3>
            <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">Filter and triage security events.</p>
          </div>
          <button
            type="button"
            className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-md border border-border bg-card px-2.5 py-2 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-muted/60"
          >
            <IconDownloadSmall />
            Export Current View
          </button>
        </div>
        <div className="mt-3 h-9 w-full rounded-md bg-muted/80" aria-hidden />
      </div>

      <div className="overflow-x-auto px-1 sm:px-2">
        <table className="w-full min-w-[32rem] table-fixed border-collapse text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-border text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              <th className="w-[18%] px-3 py-2.5 sm:px-4">Severity</th>
              <th className="w-[26%] px-3 py-2.5 sm:px-4">Actor</th>
              <th className="w-[36%] px-3 py-2.5 sm:px-4">Target</th>
              <th className="w-[20%] px-3 py-2.5 sm:px-4">Time</th>
            </tr>
          </thead>
          <tbody>
            <motion.tr
              key={reduceMotion ? "alerts-row1-static" : pulseKey}
              className="border-b border-border"
              initial={
                reduceMotion
                  ? false
                  : {
                      y: -18,
                      opacity: 0,
                      backgroundColor: "rgba(254, 202, 202, 0.72)",
                    }
              }
              animate={
                reduceMotion
                  ? { y: 0, opacity: 1, backgroundColor: "rgba(255,255,255,0)" }
                  : {
                      y: 0,
                      opacity: 1,
                      backgroundColor: ["rgba(254, 202, 202, 0.55)", "rgba(254, 226, 226, 0.2)", "rgba(255, 255, 255, 0)"],
                    }
              }
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : {
                      y: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
                      opacity: { duration: 0.38 },
                      backgroundColor: { duration: 1.15, ease: "easeOut", times: [0, 0.35, 1] },
                    }
              }
            >
              <td className="px-3 py-3 align-middle sm:px-4">
                <span className="inline-block rounded-full border border-destructive/25 bg-destructive/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-destructive">
                  Critical
                </span>
              </td>
              <td className="px-3 py-3 align-middle text-foreground sm:px-4">
                <span className="font-medium">Cursor</span>
              </td>
              <td className="px-3 py-3 align-middle font-mono text-[11px] text-foreground sm:text-xs sm:px-4">
                src/auth/models.py
              </td>
              <td className="whitespace-nowrap px-3 py-3 align-middle text-muted-foreground sm:px-4">Just now</td>
            </motion.tr>

            <tr className="border-b border-border bg-card">
              <td className="px-3 py-3 align-middle sm:px-4">
                <span className="inline-block rounded-full border border-orange-200 bg-orange-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-orange-800">
                  High
                </span>
              </td>
              <td className="px-3 py-3 align-middle text-foreground sm:px-4">Copilot</td>
              <td className="px-3 py-3 align-middle font-mono text-[11px] text-foreground sm:text-xs sm:px-4">
                apps/billing/stripe.ts
              </td>
              <td className="whitespace-nowrap px-3 py-3 align-middle text-muted-foreground sm:px-4">16 mins ago</td>
            </tr>

            <tr className="border-b border-border bg-card">
              <td className="px-3 py-3 align-middle sm:px-4">
                <span className="inline-block rounded-full border border-yellow-200 bg-yellow-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-yellow-900">
                  Medium
                </span>
              </td>
              <td className="px-3 py-3 align-middle text-foreground sm:px-4">Claude Code</td>
              <td className="px-3 py-3 align-middle font-mono text-[11px] text-foreground sm:text-xs sm:px-4">
                packages/cli/main.ts
              </td>
              <td className="whitespace-nowrap px-3 py-3 align-middle text-muted-foreground sm:px-4">1 hr ago</td>
            </tr>

            <tr className="border-b border-border bg-card" aria-hidden>
              <td className="px-3 py-2.5 sm:px-4" colSpan={4}>
                <div className="h-2 w-full rounded-sm bg-muted/70" />
              </td>
            </tr>
            <tr className="border-b border-border bg-card" aria-hidden>
              <td className="px-3 py-2.5 sm:px-4" colSpan={4}>
                <div className="h-2 w-[92%] rounded-sm bg-muted/55" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AlertsShowcaseVisual({ imageAlign }: { imageAlign: "inner-start" | "inner-end" }) {
  const rowJustify =
    imageAlign === "inner-start"
      ? "justify-center md:justify-start"
      : "justify-center md:justify-end";

  return (
    <div className={`flex w-full ${rowJustify}`}>
      <div className="relative w-full max-w-full sm:max-w-none">
        <AlertsMotionPanel />
      </div>
    </div>
  );
}

function IconSearchSmall({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className ?? "shrink-0 text-muted-foreground"}
    >
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.75" />
      <path d="M20 20l-4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function IconLaptopInCircle({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className ?? "text-muted-foreground"}
    >
      <rect x="3" y="5" width="18" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 18h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 18v1M15 18v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function DirectoryMotionPanel() {
  const reduceMotion = useReducedMotion();
  const [mapped, setMapped] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => setMapped((m) => !m), 3000);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const showMapped = reduceMotion ? true : mapped;

  return (
    <div
      className="w-full max-w-[min(100%,44rem)] overflow-hidden rounded-xl border border-border bg-card shadow-sm"
      role="img"
      aria-label="Directory mockup: people list with AI tools and device mapping"
    >
      <div className="border-b border-border px-4 py-4 sm:px-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">Directory</h3>
            <div className="mt-2.5 flex flex-wrap gap-2">
              <span className="inline-flex rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                People
              </span>
              <span className="inline-flex rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground">
                Unidentified Devices
              </span>
            </div>
          </div>
          <div
            className="flex h-9 min-w-[10rem] max-w-xs flex-1 items-center gap-2 rounded-md border border-border bg-muted/50 px-2.5 sm:min-w-[12rem]"
            aria-hidden
          >
            <IconSearchSmall />
            <div className="h-2 flex-1 rounded-sm bg-muted" />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto px-1 sm:px-2">
        <table className="w-full min-w-[28rem] table-fixed border-collapse text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-border text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              <th className="w-[34%] px-3 py-2.5 sm:px-4">User</th>
              <th className="w-[38%] px-3 py-2.5 sm:px-4">AI tools</th>
              <th className="w-[28%] px-3 py-2.5 sm:px-4">Last active</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-3 py-3 sm:px-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-600">
                    JS
                  </span>
                  <span className="font-medium text-foreground">James Smith</span>
                </div>
              </td>
              <td className="px-3 py-3 sm:px-4">
                <div className="flex flex-wrap gap-1.5">
                  <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-600">
                    cursor
                  </span>
                  <span className="inline-flex rounded-full border border-orange-100 bg-orange-50 px-2 py-0.5 text-[10px] font-medium text-orange-600">
                    claude
                  </span>
                </div>
              </td>
              <td className="px-3 py-3 text-muted-foreground sm:px-4">
                <span className="flex items-center gap-2">
                  <span className="size-1.5 shrink-0 rounded-full bg-muted-foreground/50" aria-hidden />
                  32 mins ago
                </span>
              </td>
            </tr>

            <tr className="border-b border-border">
              <td className="px-3 py-3 sm:px-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-purple-100 text-xs font-semibold text-purple-600">
                    PN
                  </span>
                  <span className="font-medium text-foreground">Priya Nair</span>
                </div>
              </td>
              <td className="px-3 py-3 sm:px-4">
                <span className="inline-flex rounded-full border border-purple-100 bg-purple-50 px-2 py-0.5 text-[10px] font-medium text-purple-600">
                  copilot
                </span>
              </td>
              <td className="px-3 py-3 text-muted-foreground sm:px-4">
                <span className="flex items-center gap-2">
                  <span className="size-1.5 shrink-0 rounded-full bg-muted-foreground/50" aria-hidden />
                  2 hours ago
                </span>
              </td>
            </tr>

            <tr className="border-b border-border bg-muted/[0.04]">
              <td className="px-3 py-3 align-top sm:px-4">
                <div className="relative min-h-[2.5rem]">
                  <AnimatePresence mode="wait">
                    {!showMapped ? (
                      <motion.div
                        key="device"
                        className="flex items-center gap-2.5"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted">
                          <IconLaptopInCircle />
                        </span>
                        <span className="font-mono text-[11px] text-foreground sm:text-xs">MacBook-Pro-14</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="person"
                        className="flex items-center gap-2.5"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-600">
                          AC
                        </span>
                        <span className="font-medium text-foreground">Teddy Perkins</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </td>
              <td className="px-3 py-3 align-top sm:px-4">
                <div className="flex min-h-[2.5rem] items-center">
                  <AnimatePresence>
                    {showMapped && (
                      <motion.span
                        key="cursor-badge"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-600"
                      >
                        cursor
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </td>
              <td className="px-3 py-3 align-top text-muted-foreground sm:px-4">
                <div className="flex min-h-[2.5rem] items-center">
                  {!showMapped ? (
                    <span className="flex items-center gap-2">
                      <motion.span
                        aria-hidden
                        className="size-2 shrink-0 rounded-full bg-yellow-400"
                        animate={
                          reduceMotion
                            ? { opacity: 1 }
                            : { opacity: [1, 0.35, 1] }
                        }
                        transition={
                          reduceMotion
                            ? { duration: 0 }
                            : { duration: 1.1, repeat: Infinity, ease: "easeInOut" }
                        }
                      />
                      <span className="text-xs">Pending</span>
                    </span>
                  ) : (
                    <motion.span
                      className="flex items-center gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="size-1.5 shrink-0 rounded-full bg-success" aria-hidden />
                      <span className="text-xs">Just now</span>
                    </motion.span>
                  )}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DirectoryShowcaseVisual({ imageAlign }: { imageAlign: "inner-start" | "inner-end" }) {
  const rowJustify =
    imageAlign === "inner-start"
      ? "justify-center md:justify-start"
      : "justify-center md:justify-end";

  return (
    <div className={`flex w-full ${rowJustify}`}>
      <div className="relative w-full max-w-full sm:max-w-none">
        <DirectoryMotionPanel />
      </div>
    </div>
  );
}

// ── Platform: Artifact (motion canvas, no raster assets) ────────────────────

function ArtifactMotionPanel() {
  const reduceMotion = useReducedMotion();
  const scan = reduceMotion ? { duration: 0 } : { duration: 3.2, repeat: Infinity, ease: "easeInOut" as const };

  return (
    <div
      className="relative w-full max-w-[min(100%,36rem)] overflow-hidden rounded-xl border border-border bg-card shadow-sm"
      role="img"
      aria-label="Compliance export mockup: AI access audit with verified clean status"
    >
      <div className="p-4 sm:p-5">
        <div className="mb-1 flex items-start justify-between gap-4 border-b border-border pb-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Compliance export</p>
            <p className="mt-0.5 text-sm font-semibold text-foreground">AI access audit</p>
          </div>
          <span className="shrink-0 rounded-md border border-border bg-card px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-success">
            Verified clean
          </span>
        </div>

        <div className="relative min-h-[152px] divide-y divide-border">
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-2 right-2 top-0 z-20 h-0.5 rounded-full bg-primary"
            animate={reduceMotion ? { y: 0 } : { y: [0, 124, 0] }}
            transition={scan}
          />

          <div className="flex items-center gap-2.5 py-3 font-mono text-[11px] leading-tight sm:text-xs">
            <span className="size-1.5 shrink-0 rounded-full bg-success" aria-hidden />
            <span className="min-w-0 flex-1 truncate text-foreground">internal/auth/signing_key.pem</span>
            <span className="shrink-0 text-muted-foreground">--&gt;</span>
            <span className="shrink-0 tabular-nums text-success">0</span>
          </div>
          <div className="flex items-center gap-2.5 py-3">
            <span className="size-1.5 shrink-0 rounded-full bg-success" aria-hidden />
            <div className="h-2 min-w-0 flex-1 max-w-[92%] rounded-sm bg-muted" />
            <span className="h-2 w-9 shrink-0 rounded-sm bg-border" />
          </div>
          <div className="flex items-center gap-2.5 py-3">
            <span className="size-1.5 shrink-0 rounded-full bg-success" aria-hidden />
            <div className="h-2 min-w-0 flex-1 max-w-[78%] rounded-sm bg-muted" />
            <span className="h-2 w-11 shrink-0 rounded-sm bg-border" />
          </div>
          <div className="flex items-center gap-2.5 py-3">
            <motion.span
              aria-hidden
              className="size-1.5 shrink-0 rounded-full bg-primary"
              animate={reduceMotion ? { opacity: 1 } : { opacity: [0.45, 1, 0.55, 1, 0.45] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="h-2 min-w-0 flex-1 max-w-[70%] rounded-sm bg-muted" />
            <span className="h-2 w-10 shrink-0 rounded-sm bg-border" />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-[11px] text-muted-foreground">
          <span>Generated for review</span>
          <span className="font-mono tabular-nums text-foreground/80">v1.4.2</span>
        </div>
      </div>
    </div>
  );
}

function ArtifactShowcaseVisual({ imageAlign }: { imageAlign: "inner-start" | "inner-end" }) {
  const rowJustify =
    imageAlign === "inner-start"
      ? "justify-center md:justify-start"
      : "justify-center md:justify-end";

  return (
    <div className={`flex w-full ${rowJustify}`}>
      <div className="relative w-full max-w-full sm:max-w-none">
        <ArtifactMotionPanel />
      </div>
    </div>
  );
}

function ProductShowcaseRowVisual({
  block,
  imageAlign,
}: {
  block: (typeof PRODUCT_SHOWCASE)[number];
  imageAlign: "inner-start" | "inner-end";
}) {
  switch (block.kicker) {
    case "Coverage":
      return <CoverageShowcaseVisual imageAlign={imageAlign} />;
    case "Alerts":
      return <AlertsShowcaseVisual imageAlign={imageAlign} />;
    case "Directory":
      return <DirectoryShowcaseVisual imageAlign={imageAlign} />;
  }
}

function ProductShowcase() {
  return (
    <section className="border-t border-border bg-background px-6 pt-20 sm:pt-28" aria-labelledby="product-showcase-heading">
      <div className="mx-auto max-w-7xl pb-12 sm:pb-16">
        <h2 id="product-showcase-heading" className="mb-3 text-center text-base font-semibold uppercase tracking-wide text-primary sm:text-lg">
          Platform
        </h2>
        <p className="mx-auto mb-20 max-w-3xl text-center text-2xl font-semibold tracking-tight text-foreground sm:mb-35 sm:text-4xl">
          Turn AI transparency as a billable asset.
        </p>

        <div className="flex flex-col gap-28 sm:gap-42">
          {[
            { key: "artifact", kind: "artifact" as const },
            ...PRODUCT_SHOWCASE.map((block) => ({ key: block.kicker, kind: "product" as const, block })),
          ].map((row, i) => {
            const reverse = i % 2 === 1;
            const imageAlign = reverse ? "inner-end" : "inner-start";
            const rowClass = `flex flex-col items-center gap-10 md:gap-16 lg:gap-20 ${reverse ? "md:flex-row-reverse" : "md:flex-row"}`;

            if (row.kind === "artifact") {
              return (
                <div
                  key={row.key}
                  id="artifact"
                  className={rowClass}
                  aria-labelledby="artifact-heading"
                >
                  <div className="w-full min-w-0 shrink-0 md:max-w-md lg:max-w-lg xl:max-w-xl">
                    <p className="mb-3 text-base font-semibold text-primary sm:text-lg">The Artifact</p>
                    <h2
                      id="artifact-heading"
                      className="mb-5 text-xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
                    >
                      The piece of paper that wins the deal.
                    </h2>
                    <p className="text-base leading-relaxed text-muted-foreground sm:text-xl">
                    OLEV translates raw local AI telemetry into a client-facing compliance report. Promise it in the pitch. Deliver it when the job is done. No other agency can offer that.
                    </p>
                  </div>
                  <div className="w-full min-w-0 flex-1 md:max-w-none">
                    <ArtifactShowcaseVisual imageAlign={imageAlign} />
                  </div>
                </div>
              );
            }

            const { block } = row;
            return (
              <div key={row.key} className={rowClass}>
                <div className="w-full min-w-0 shrink-0 md:max-w-md lg:max-w-lg xl:max-w-xl">
                  <p className="mb-3 text-base font-semibold text-primary sm:text-lg">{block.kicker}</p>
                  <h3 className="mb-5 text-xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                    {block.headline}
                  </h3>
                  <p className="text-base leading-relaxed text-muted-foreground sm:text-xl">{block.body}</p>
                </div>
                <div className="w-full min-w-0 flex-1 md:max-w-none">
                  <ProductShowcaseRowVisual block={block} imageAlign={imageAlign} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── How it works (three-column overview, before step scroll) ────────────────

function IconLocalAgent() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden className="text-primary">
      <rect x="2" y="4" width="20" height="13" rx="2" stroke="currentColor" strokeWidth="1.75" />
      <path d="M8 21h8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M12 17v4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function IconCloudTripwires() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden className="text-primary">
      <circle cx="6" cy="6" r="2.25" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="18" cy="6" r="2.25" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="12" cy="18" r="2.25" stroke="currentColor" strokeWidth="1.75" />
      <path d="M7.5 7.5 10.5 15M16.5 7.5l-3 7.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function IconComplianceExport() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden className="text-primary">
      <path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M14 2v6h6M8 13h8M8 17h8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

const HOW_IT_WORKS_GRID_COLUMNS = [
  {
    icon: <IconLocalAgent />,
    title: "1. Seamless Background Monitoring",
    body: "A lightweight agent runs natively on your developers' machines. We track local AI file reads in real time without proxying traffic or blocking IDEs.",
  },
  {
    icon: <IconCloudTripwires />,
    title: "2. Automated GitHub Canaries",
    body: "We inject invisible tripwires directly into your repositories. Get instant alerts the second an AI tool indexes proprietary client code.",
  },
  {
    icon: <IconComplianceExport />,
    title: "3. Bid-Winning Compliance Reports",
    body: "Attach our AI audit logs directly to your sales proposals. Prove your IP security upfront and beat competitors who cannot guarantee compliance.",
  },
] as const;

/**
 * Subtle gray track through the three icon centers + glowing blue laser (md+).
 * Insets match three `1fr` columns with `gap-x-10` / `lg:gap-x-14`.
 */
function HowItWorksFlowConnector() {
  const reduceMotion = useReducedMotion();

  const rail =
    "absolute top-1/2 left-[calc((100%-5rem)/6)] right-[calc((100%-5rem)/6)] -translate-y-1/2 lg:left-[calc((100%-7rem)/6)] lg:right-[calc((100%-7rem)/6)]";

  return (
    <div className="pointer-events-none absolute inset-x-0 top-5 z-0 hidden h-10 md:block" aria-hidden>
      <div className="relative h-full w-full">
        {/* The subtle light gray thin horizontal line */}
        <div className={`${rail} h-[1px] bg-border`} />
        {/* The frictionless trace track */}
        <div className={`${rail} h-6 overflow-hidden`}>
          <motion.div
            className="absolute top-1/2 z-[1] h-[2px] w-24 -translate-y-1/2"
            style={{
              background: "linear-gradient(90deg, transparent 0%, var(--primary) 50%, transparent 100%)",
              boxShadow: "0 0 12px 3px color-mix(in srgb, var(--primary) 20%, transparent)",
            }}
            initial={false}
            animate={
              reduceMotion
                ? { left: "50%", x: "-50%" }
                : { left: ["-10%", "110%"], x: "-50%" }
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 0.2,
                    ease: "easeInOut",
                    repeatType: "loop",
                  }
            }
          />
        </div>
      </div>
    </div>
  );
}

function HowItWorksGridSection() {
  return (
    <section
      id="how-olev-works"
      className="relative overflow-hidden border-t border-border bg-background px-6 pt-16 sm:pt-40"
      aria-labelledby="how-it-works-grid-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-3 bg-gradient-to-b from-primary/2 to-transparent sm:h-28"
      />

      <div className="relative z-10 mx-auto mt-4 max-w-6xl pb-10 sm:pb-12">
        <h2
          id="how-it-works-grid-heading"
          className="mx-auto max-w-3xl text-center text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          Zero friction for developers. Zero blind spots for you.
        </h2>


        <div className="relative mt-12 sm:mt-14">
          
          <div className="relative z-10 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-10 lg:gap-14">
            {HOW_IT_WORKS_GRID_COLUMNS.map((col, idx) => (
              <motion.div 
                key={col.title} 
                className="flex flex-col md:items-center md:text-center"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.2, ease: "easeOut" }}
              >
                <div className="relative z-10 mb-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-card">
                  {col.icon}
                </div>
                <h3 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">{col.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground sm:text-base">{col.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Full-bleed blend into brand blue — meets horizontal How it works scroll */}
      <div
        aria-hidden
        className="pointer-events-none relative left-1/2 hidden w-screen max-w-none -translate-x-1/2 sm:block"
        style={{
          height: "clamp(22rem, 42vh, 34rem)",
          background:
            "linear-gradient(180deg, var(--background) 0%, var(--background) 22%, #ecf0fd 38%, #dfe8fc 52%, #c8d7fa 66%, #9db6f4 78%, #6b93ec 88%, var(--primary) 100%)",
        }}
      />
    </section>
  );
}

// ── How It Works ──────────────────────────────────────────────────────────────

const STEPS = [
  {
    num: "01",
    title: "Connect your repos",
    video: "/videos/step-01-github.mp4",
  },
  {
    num: "02",
    title: "Inject canary policies",
    video: "/videos/step-02-inject.mp4",
  },
  {
    num: "03",
    title: "Deploy the OS watcher",
    video: "/videos/step-03-agent.mp4",
  },
  {
    num: "04",
    title: "AI reads your code. Both layers catch it.",
    video: "/videos/step-04-alert.mp4",
  },
];

function HowItWorksVideo({
  src,
  index,
  videoRefs,
}: {
  src: string;
  index: number;
  videoRefs: MutableRefObject<(HTMLVideoElement | null)[]>;
}) {
  const [missing, setMissing] = useState(false);

  if (missing) {
    return (
      <div className="flex aspect-video min-h-[12rem] w-full flex-col items-center justify-center gap-2 rounded-lg border border-white/25 bg-[#1e3a8a]/40 px-4 text-center text-sm text-blue-100">
        <span className="font-medium text-white">Step video</span>
        <span className="max-w-sm text-xs text-blue-200/90 leading-relaxed">
          This loop isn&apos;t on the server yet. Place the MP4 at{" "}
          <code className="rounded bg-black/20 px-1 py-0.5 font-mono text-[11px] text-blue-100">
            public{src}
          </code>{" "}
          and refresh.
        </span>
      </div>
    );
  }

  return (
    <video
      ref={(el) => {
        videoRefs.current[index] = el;
      }}
      className="h-full w-full object-cover"
      loop
      muted
      playsInline
      preload="metadata"
      src={src}
      onError={() => setMissing(true)}
    />
  );
}

function HowItWorks() {
  const targetRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstItemRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [maxShiftPx, setMaxShiftPx] = useState(0);
  const [sidePadPx, setSidePadPx] = useState(0);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Multiply progress by measured distance; state in closure updates when layout is measured (ResizeObserver / delayed remeasure).
  const x = useTransform(scrollYProgress, (p) => -p * maxShiftPx);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;

    const measure = () => {
      requestAnimationFrame(() => {
        const vw = viewport.clientWidth;
        const first = firstItemRef.current;
        const itemW = first ? first.getBoundingClientRect().width : 0;
        const pad = itemW > 0 ? Math.max(0, (vw - itemW) / 2) : 0;
        setSidePadPx(pad);

        // Re-read after padding state would apply — measure track after layout; use double rAF for post-paint scrollWidth
        requestAnimationFrame(() => {
          const sw = track.scrollWidth;
          const next = Math.max(0, sw - vw);
          setMaxShiftPx(next);
        });
      });
    };

    measure();
    const roTrack = new ResizeObserver(measure);
    const roVp = new ResizeObserver(measure);
    roTrack.observe(track);
    roVp.observe(viewport);
    window.addEventListener("resize", measure, { passive: true });

    const t = window.setTimeout(measure, 100);
    const t2 = window.setTimeout(measure, 500);

    return () => {
      roTrack.disconnect();
      roVp.disconnect();
      window.removeEventListener("resize", measure);
      window.clearTimeout(t);
      window.clearTimeout(t2);
    };
  }, []);
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const idx = Math.min(STEPS.length - 1, Math.floor(value * STEPS.length));
    setActiveStep((prev) => (prev === idx ? prev : idx));
  });

  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (!video) return;
      if (idx === activeStep) {
        const playPromise = video.play();
        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch(() => {});
        }
      } else {
        video.pause();
      }
    });
  }, [activeStep]);

  return (
    <section id="how-it-works" className="hidden sm:block">
      {/* Scroll track (tall) + sticky window + motion horizontal track */}
      <div
        ref={targetRef}
        className="relative w-full bg-primary"
        style={{ height: `${(STEPS.length + 0.8) * 100}vh` }}
      >
        <div
          ref={viewportRef}
          className="sticky top-0 self-start flex h-svh w-full flex-col justify-center overflow-hidden bg-primary pt-20 sm:pt-24 md:pt-28"
        >
          <motion.div
            ref={trackRef}
            style={{
              x,
              display: "flex",
              gap: "100px",
              paddingLeft: sidePadPx,
              paddingRight: sidePadPx,
            }}
            className="h-full w-max will-change-transform"
          >
            {STEPS.map((step) => {
              const caption = `Step ${step.num}: ${step.title}${step.title.endsWith(".") ? "" : "."}`;
              return (
                <div
                  key={step.num}
                  ref={step.num === "01" ? firstItemRef : undefined}
                  className="shrink-0 px-2 py-2 sm:px-3 sm:py-3"
                >
                  <div className="w-full max-w-[min(86vw,42rem)] md:max-w-[min(84vw,46rem)] lg:max-w-[min(82vw,50rem)]">
                    <p className="mb-1 text-left text-base font-semibold leading-snug tracking-tight text-white sm:mb-1 sm:text-lg md:text-xl">
                      {caption}
                    </p>
                    <div className="relative aspect-video min-h-[12rem] w-full overflow-hidden rounded-lg shadow-md shadow-black/20 ring-1 ring-white/15">
                      <HowItWorksVideo
                        src={step.video}
                        index={Number(step.num) - 1}
                        videoRefs={videoRefs}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Blue → page tint (matches hero fade, reversed) */}
      <div className="bg-[#f0f4ff] pb-28">
        <div
          aria-hidden
          className="pointer-events-none relative left-1/2 w-screen max-w-none -translate-x-1/2"
          style={{
            height: "clamp(22rem, 42vh, 34rem)",
            background:
              "linear-gradient(180deg, #2563eb 0%, #5b8def 16%, #8eb1f4 36%, #c5d8f8 58%, #e8eefc 82%, #f0f4ff 100%)",
          }}
        />
      </div>
    </section>
  );
}

// ── Features ("What you get") ─────────────────────────────────────────────────

function IconFeatureSeamlessIntegration({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <rect x="2" y="6" width="8" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
      <rect x="14" y="10" width="8" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
      <path d="M10 11.5h4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M12 11.5v-2a2 2 0 0 1 2-2h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

function IconFeatureInvisibleWatcher({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <rect x="3" y="4" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.75" />
      <path d="M8 20h8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M9 9h6M9 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
      <circle cx="18" cy="7" r="2" fill="currentColor" opacity="0.25" />
    </svg>
  );
}

function IconFeatureTargetedProtection({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M12 3l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V7l8-4Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

function IconFeatureInstantContext({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path d="M13 2L3 14h7l-1 8 11-13h-7l1-7Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
    </svg>
  );
}

function IconFeatureSalesExports({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M14 2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8l-6-6Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M14 2v6h6M8 13h8M8 17h5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M4 22h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

function IconFeatureZeroNoiseAlerts({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M18 8A6 6 0 1 0 6 8c0 7-3 7-3 7h18s-3 0-3-7"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9.5 21h5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M10 3.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
    </svg>
  );
}

const FEATURES = [
  {
    title: "Seamless Integration",
    description:
      "One-click GitHub App install. No personal access tokens or manual webhook config.",
    icon: <IconFeatureSeamlessIntegration className="text-primary" />,
  },
  {
    title: "Invisible Local Watcher",
    description:
      "Tracks AI file reads natively on the machine without slowing down your developers.",
    icon: <IconFeatureInvisibleWatcher className="text-primary" />,
  },
  {
    title: "Targeted Protection",
    description:
      "Apply tracking strictly to specific client repositories, keeping internal projects private.",
    icon: <IconFeatureTargetedProtection className="text-primary" />,
  },
  {
    title: "Instant Context",
    description:
      "Get exact file paths and developer names the second an unapproved AI tool is used.",
    icon: <IconFeatureInstantContext className="text-primary" />,
  },
  {
    title: "Sales-Ready Exports",
    description:
      "Generate clean PDF compliance reports you can attach directly to client proposals.",
    icon: <IconFeatureSalesExports className="text-primary" />,
  },
  {
    title: "Zero-Noise Alerts",
    description:
      "Real time notifications in Slack only when proprietary code is actually exposed.",
    icon: <IconFeatureZeroNoiseAlerts className="text-primary" />,
  },
] as const;



// ── FAQ ───────────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    q: "What AI tools does OLEV detect?",
    a: "Cursor, GitHub Copilot, Claude Code, Aider, Devin, Sourcegraph Cody, and Continue.dev, as well as any process that executes injected canary code, including raw scripts and CI agents.",
  },
  {
    q: "Does this require changes to my codebase?",
    a: "Canary injection adds a single silent line per file. It doesn't affect behavior, doesn't show up in tests, and doesn't change any logic. The OS agent runs separately and requires no code changes at all.",
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
    <section id="faq" className="border-t border-border bg-background px-6 pb-24 pt-20 sm:pb-28 sm:pt-24">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 text-center sm:mb-12">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Frequently asked</h2>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-border bg-card shadow-sm ring-1 ring-border/40"
            >
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-foreground transition-colors hover:bg-muted/60"
              >
                {item.q}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className={`shrink-0 text-muted-foreground transition-transform ${open === i ? "rotate-180" : ""}`}
                  aria-hidden
                >
                  <path d="M3 6l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {open === i && (
                <div className="border-t border-border px-5 pb-4 pt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.a}
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

  async function handleWaitlistSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="waitlist" className="border-t border-border bg-background px-6 pb-28 pt-20 sm:pt-24">
      <div className="mx-auto max-w-xl">
        <div className="rounded-2xl border border-border bg-card px-6 py-10 text-center shadow-sm ring-1 ring-border/40 sm:px-10 sm:py-12">
          <h2 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Ready to win bigger enterprise contracts?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
            Book a quick demo to see how OLEV secures your client IP.
          </p>

          <a
            href="https://calendly.com/neudestifanoes/30min"
            className="mt-8 inline-flex w-full max-w-md items-center justify-center rounded-lg bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-[var(--primary-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Book a 15-Min Demo
          </a>

          {status === "done" ? (
            <p className="mt-10 text-sm font-medium text-success">You&apos;re on the list. We&apos;ll be in touch shortly.</p>
          ) : (
            <form
              onSubmit={handleWaitlistSubmit}
              className="mx-auto mt-4 flex max-w-md flex-col gap-3 sm:flex-row sm:items-stretch"
            >
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                inputMode="email"
                placeholder="Work email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                className="min-h-11 w-full min-w-0 flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="shrink-0 rounded-lg border border-border bg-card px-5  text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-muted/60 disabled:opacity-60 sm:w-auto sm:min-w-[8.5rem]"
              >
                {status === "loading" ? "Joining…" : "Request Access"}
              </button>
            </form>
          )}

          {status === "error" && (
            <p className="mt-4 text-xs text-destructive">
              Something went wrong. Try again or email founders@tryolev.com
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-5xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <img src="/olevlogo.png" alt="OLEV" className="h-6 w-auto" />
          <span className="text-muted-foreground/70">© 2026</span>
        </div>
        <div className="flex items-center gap-5">
          <a href="mailto:founders@tryolev.com" className="hover:text-foreground transition-colors">founders@tryolev.com</a>
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
          {/* Grid background — fades out below hero */}
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
        </div>
        <ProductShowcase />
        <HowItWorksGridSection />
        <HowItWorks />
        {/* <FAQ /> */}
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
