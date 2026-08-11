import { SectionLabel } from "./SectionLabel";

const keywords = [
  "api testing",
  "backend testing",
  "release ownership",
  "test automation",
  "fintech",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-20 sm:pt-28">
      {/* Ambient glow — control-room light, not decoration for its own sake:
          it's centered behind the one heading that matters on this page. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[36rem] w-[56rem] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-[0.16] blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-pass), transparent)",
        }}
      />

      <div className="relative mx-auto max-w-5xl">
        <div className="reveal-visible" style={{ "--reveal-delay": "0ms" } as React.CSSProperties}>
          <SectionLabel>describe(&apos;suman&apos;)</SectionLabel>
        </div>

        <h1
          className="reveal-visible mt-6 max-w-4xl font-display text-5xl font-semibold leading-[1.04] tracking-tight text-ink sm:text-7xl md:text-[5.5rem]"
          style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
        >
          I&apos;m Suman. I reduce the risk
          <br className="hidden sm:block" /> of software failing in
          production<span className="hero-cursor" aria-hidden="true" />
        </h1>

        <div
          className="reveal-visible mt-6 flex flex-wrap gap-2"
          style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
        >
          {keywords.map((kw) => (
            <span
              key={kw}
              className="rounded border border-line px-3 py-0.5 font-mono text-xs text-ink-faint"
            >
              {kw}
            </span>
          ))}
        </div>

        <p
          className="reveal-visible mt-6 max-w-xl font-body text-lg leading-loose text-ink-soft"
          style={{ "--reveal-delay": "220ms" } as React.CSSProperties}
        >
          QA engineer by trade — API and backend testing, release ownership,
          and the kind of bug hunting that keeps production honest. Four
          years of that in FinTech, where the margin for error is real money,
          not just a bad review. This is my corner of the web: built by
          hand, owned outright, and tested on every commit.
        </p>

        <div
          className="reveal-visible mt-8 flex flex-wrap items-center gap-4"
          style={{ "--reveal-delay": "280ms" } as React.CSSProperties}
        >
          <a
            href="#contact"
            className="btn-primary inline-flex items-center rounded-lg px-5 py-3 font-mono text-sm"
          >
            get in touch →
          </a>
          <a
            href="#experience"
            className="btn-outline inline-flex items-center rounded-lg px-5 py-3 font-mono text-sm"
          >
            see my work ↓
          </a>
        </div>

        {/* The hero's own assertion resolves to a pass, drawn on load. */}
        <div
          className="reveal-visible mt-7 inline-flex items-center gap-3 rounded-lg border border-line bg-paper-raised px-4 py-3 font-mono text-sm"
          style={{ "--reveal-delay": "340ms" } as React.CSSProperties}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="shrink-0"
          >
            <circle cx="12" cy="12" r="11" stroke="var(--color-pass)" strokeWidth="1.5" opacity="0.35" />
            <path
              d="M7 12.5l3.2 3.2L17 8.5"
              stroke="var(--color-pass)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: 24,
                strokeDashoffset: 24,
                animation: "draw-check 0.7s ease-out 0.65s forwards",
              }}
            />
          </svg>
          <span className="text-ink-soft">
            expect(<span className="text-ink">suman</span>).toBuild(
            <span className="text-pass">things_that_last</span>)
          </span>
          <span className="text-pass">✓</span>
        </div>
      </div>
    </section>
  );
}
