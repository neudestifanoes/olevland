"use client";

import { useState, useEffect, useLayoutEffect, useRef, type MutableRefObject } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

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
        scrolled ? "top-3 sm:top-4" : "top-0"
      }`}
    >
      <div
        className={`relative flex w-full items-center justify-between transition-all duration-300 ease-out ${
          scrolled
            ? "h-11 max-w-[min(100vw-1.25rem,22rem)] rounded-lg border border-border bg-background/95 px-3 shadow-md backdrop-blur-md sm:h-12 sm:max-w-[26rem] sm:px-4"
            : "h-14 max-w-5xl bg-transparent px-6"
        }`}
      >
        <a href="#" className="flex shrink-0 items-center">
          <img
            src="/olevlogo.png"
            alt="OLEV"
            className={`w-auto transition-[height] duration-300 ${scrolled ? "h-6 sm:h-7" : "h-8"}`}
          />
        </a>

        {!scrolled && (
          <div className="absolute left-1/2 hidden -translate-x-1/2 md:flex items-center gap-7 text-sm font-medium text-muted-foreground">
            <a href="#how-it-works" className="hover:text-foreground transition-colors">
              How it works
            </a>
            <a href="#features" className="hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#faq" className="hover:text-foreground transition-colors">
              FAQ
            </a>
          </div>
        )}

        <div className="flex min-w-0 shrink-0 items-center gap-1.5 sm:gap-2">
          <a
            href="https://calendly.com/neudestifanoes/30min"
            className={`inline-flex ${demoClasses} ${
              scrolled
                ? "px-2 py-1.5 text-[11px] sm:px-2.5 sm:py-1.5 sm:text-xs"
                : "hidden px-3 py-1.5 text-sm md:inline-flex"
            }`}
          >
            Book a demo
          </a>
          <a
            href="#waitlist"
            className={`inline-flex ${waitlistClasses} ${
              scrolled
                ? "px-2.5 py-1.5 text-[11px] sm:px-3 sm:py-1.5 sm:text-xs"
                : "px-3 py-1.5 text-sm"
            }`}
          >
            Join waitlist
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
  const [heroWaitlistStatus, setHeroWaitlistStatus] = useState<
    "idle" | "loading" | "done" | "error"
  >("idle");

  async function handleHeroWaitlist(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = heroEmail.trim();
    if (!trimmed) return;
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
      <div className="max-w-3xl mx-auto text-center">
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
          className="text-[2.6rem] sm:text-5xl font-semibold tracking-tight text-foreground leading-[1.1] mb-5"
          aria-label="AI is reading your code. Know exactly when."
        >
          <span className="block">AI is reading your code.</span>
          <span className="mt-1 block sm:mt-2">
            <HeroTypedSuffix text="Know exactly when." />
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed mb-8">
        Multiple-layer monitoring to catch unapproved LLMs interacting with your codebase in real-time.
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
                      if (heroWaitlistStatus === "error") setHeroWaitlistStatus("idle");
                    }}
                    className="min-h-[42px] min-w-0 flex-1 px-4 py-2.5 text-sm border border-border rounded-md bg-card outline-none focus:border-primary focus:ring-1 focus:ring-primary transition placeholder:text-muted-foreground/80"
                  />
                  <button
                    type="submit"
                    disabled={heroWaitlistStatus === "loading"}
                    className="shrink-0 px-5 py-2.5 text-sm font-semibold text-primary-foreground bg-primary rounded-md hover:bg-[var(--primary-hover)] transition-colors disabled:opacity-60 sm:w-auto w-full"
                  >
                    {heroWaitlistStatus === "loading" ? "Joining…" : "Join Waitlist"}
                  </button>
                </div>
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
    headline: "Surgical deployment in seconds.",
    body: 'Sync your GitHub and browse your live file tree. With one click, deploy OS agents and honeytokens to instantly protect your "Crown Jewels" (auth, billing, secrets).',
    imageSrc: "/showcase/coverage.png",
    imageAlt: "OLEV coverage view: file tree with canary and agent status",
    placeholderHint: "File tree with lightning (canary), eye (agent), and live badges",
    fileName: "coverage.png",
  },
  {
    kicker: "Alerts",
    headline: "High-fidelity alerts, instant context.",
    body: "Cut through the noise. Get the full story the exact second unapproved AI touches your code, complete with actor IP, raw JSON, and one-click Jira exports.",
    imageSrc: "/showcase/alerts.png",
    imageAlt: "OLEV alerts table with detail panel and actor data",
    placeholderHint: "Alerts table, slide-out with IP / actor / JSON",
    fileName: "alerts.png",
  },
  {
    kicker: "Directory",
    headline: "Map Shadow AI to real humans.",
    body: "Stop guessing who owns rogue devices. Automatically track which AI tools are running on every machine, and link unidentified network activity directly back to your team.",
    imageSrc: "/showcase/directory.png",
    imageAlt: "OLEV directory: people vs devices and AI tool labels",
    placeholderHint: "Assigned People vs Unidentified Devices, AI tool pills",
    fileName: "directory.png",
  },
] as const;

function ShowcaseMedia({
  src,
  alt,
  placeholderHint,
  fileName,
  imageAlign,
}: {
  src: string;
  alt: string;
  placeholderHint: string;
  fileName: string;
  /** Zig-zag: nudge screenshot toward the copy column (inner edge). */
  imageAlign: "inner-start" | "inner-end";
}) {
  const [failed, setFailed] = useState(false);

  const rowJustify =
    imageAlign === "inner-start"
      ? "justify-center md:justify-start"
      : "justify-center md:justify-end";

  return (
    <div className={`flex w-full ${rowJustify}`}>
      <div className="relative w-max max-w-full overflow-hidden rounded-xl border border-border bg-card shadow-sm ring-1 ring-border/50">
        {!failed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            className="block h-auto max-h-none w-auto max-w-full"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="flex min-h-[14rem] w-full min-w-[min(100%,20rem)] max-w-full flex-col items-center justify-center gap-3 bg-muted/40 px-6 py-12 text-center sm:min-h-[16rem]">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Placeholder
            </span>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">{placeholderHint}</p>
            <code className="rounded-md border border-border bg-card px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
              public/showcase/{fileName}
            </code>
          </div>
        )}
      </div>
    </div>
  );
}

function ProductShowcase() {
  return (
    <section className="border-t border-border bg-background px-6 pt-20 sm:pt-28" aria-labelledby="product-showcase-heading">
      <div className="mx-auto max-w-7xl pb-12 sm:pb-16">
        <h2 id="product-showcase-heading" className="mb-3 text-center text-base font-semibold uppercase tracking-wide text-primary sm:text-lg">
          Platform
        </h2>
        <p className="mx-auto mb-16 max-w-3xl text-center text-3xl font-semibold tracking-tight text-foreground sm:mb-20 sm:text-4xl">
          Total visibility, real-time response, human-level control.
        </p>

        <div className="flex flex-col gap-20 sm:gap-28">
          {PRODUCT_SHOWCASE.map((block, i) => {
            const reverse = i % 2 === 1;
            return (
              <div
                key={block.kicker}
                className={`flex flex-col items-center gap-10 md:gap-16 lg:gap-20 ${reverse ? "md:flex-row-reverse" : "md:flex-row"}`}
              >
                <div className="w-full min-w-0 shrink-0 md:max-w-md lg:max-w-lg xl:max-w-xl">
                  <p className="mb-3 text-base font-semibold text-primary sm:text-lg">{block.kicker}</p>
                  <h3 className="mb-5 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                    {block.headline}
                  </h3>
                  <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">{block.body}</p>
                </div>
                <div className="w-full min-w-0 flex-1 md:max-w-none">
                  <ShowcaseMedia
                    src={block.imageSrc}
                    alt={block.imageAlt}
                    placeholderHint={block.placeholderHint}
                    fileName={block.fileName}
                    imageAlign={reverse ? "inner-end" : "inner-start"}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full-bleed blend from page background into brand blue — meets horizontal scroll (How it works) */}
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

// ── Interactive demo (inline) ────────────────────────────────────────────────

function InteractiveDemoSection() {
  return (
    <section id="try-demo" className="hidden px-6 pb-28 sm:block">
      <div className="max-w-5xl mx-auto">
        <div className="mb-2 text-center">
          <h2 className="text-2xl font-semibold text-foreground tracking-tight">
            Try Mini Demo          </h2>

        </div>

        <div className="flex h-[min(72vh,760px)] min-h-[420px] max-h-[880px] flex-col overflow-hidden rounded-xl border border-border bg-card shadow-lg">
          <div className="flex flex-shrink-0 items-center gap-3 border-b border-border bg-muted px-4 py-2.5">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-[#fee2e2]" />
              <div className="h-3 w-3 rounded-full bg-[#fef9c3]" />
              <div className="h-3 w-3 rounded-full bg-[#dcfce7]" />
            </div>
            <div className="flex-1 rounded border border-border bg-card px-3 py-1 font-mono text-xs text-muted-foreground">
              app.olev.io/demo
            </div>
          </div>
          <iframe
            src="https://olev-wheat.vercel.app/demo"
            title="OLEV live demo"
            className="min-h-0 w-full flex-1 border-0 bg-card"
          />
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
          <h2 className="text-2xl font-semibold text-foreground tracking-tight">What you get</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <div key={f.title} className="bg-card rounded-xl border border-border p-5">
              <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center mb-3">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="3" fill="#2563eb" />
                  <circle cx="8" cy="8" r="6" stroke="#2563eb" strokeWidth="1.5" />
                </svg>
              </div>
              <h3 className="text-[14px] font-semibold text-foreground mb-1.5">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
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
          <h2 className="text-2xl font-semibold text-foreground tracking-tight">Frequently asked</h2>
        </div>

        <div className="space-y-2">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="bg-card rounded-xl border border-border overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 text-sm font-medium text-foreground hover:bg-muted transition-colors"
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
                <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-muted">
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
      <div className="max-w-lg mx-auto bg-card rounded-2xl border border-border px-8 py-10 text-center shadow-sm">
        <h2 className="text-2xl font-semibold text-foreground tracking-tight mb-2">
          Get early access to OLEV
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-8">
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
              className="w-full px-4 py-2.5 text-sm border border-border rounded-md outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
            />
            <input
              type="email"
              required
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 text-sm border border-border rounded-md outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
            />
            <input
              type="text"
              placeholder="Company name (optional)"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-4 py-2.5 text-sm border border-border rounded-md outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
            />
            <input
              type="text"
              placeholder="Company website (optional)"
              value={companyUrl}
              onChange={(e) => setCompanyUrl(e.target.value)}
              className="w-full px-4 py-2.5 text-sm border border-border rounded-md outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full px-5 py-2.5 text-sm font-semibold text-white bg-primary rounded-md hover:bg-[var(--primary-hover)] transition-colors disabled:opacity-60"
            >
              {status === "loading" ? "Joining..." : "Join waitlist"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="text-xs text-destructive mb-4">Something went wrong. Email us at founders@tryolev.com</p>
        )}

        <div className="flex items-center gap-3 text-xs text-muted-foreground/70 mb-6">
          <div className="flex-1 h-px bg-border" />
          or
          <div className="flex-1 h-px bg-border" />
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
    <footer className="border-t border-border bg-card">
      <div className="max-w-5xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <img src="/olevlogo.png" alt="OLEV" className="h-6 w-auto" />
          <span className="text-muted-foreground/70">© 2026</span>
        </div>
        <div className="flex items-center gap-5">
          <a href="/privacy" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="/terms" className="hover:text-foreground transition-colors">Terms</a>
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
        <HowItWorks />
        <InteractiveDemoSection />
        <Features />
        <FAQ />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
