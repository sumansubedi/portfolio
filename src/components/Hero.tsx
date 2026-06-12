import { SectionLabel } from "./SectionLabel";

export function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-24 pt-20 sm:pt-28">
      <SectionLabel>describe(&apos;suman&apos;)</SectionLabel>

      <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-6xl">
        I&apos;m Suman. I make software
        <br className="hidden sm:block" /> prove that it works.
      </h1>

      <p className="mt-6 max-w-xl font-body text-lg leading-relaxed text-ink-soft">
        QA engineer by trade — API and backend testing, FinTech release
        ownership, and the kind of bug hunting that keeps loan workflows honest.
        This is my corner of the web: built by hand, owned outright, and tested
        on every commit.
      </p>

      {/* The hero's own assertion resolves to a pass, drawn on load. */}
      <div className="mt-10 inline-flex items-center gap-3 rounded-lg border border-line bg-paper-raised px-4 py-3 font-mono text-sm">
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
              animation: "draw-check 0.7s ease-out 0.3s forwards",
            }}
          />
        </svg>
        <span className="text-ink-soft">
          expect(<span className="text-ink">suman</span>).toBuild(
          <span className="text-pass">things_that_last</span>)
        </span>
        <span className="text-pass">✓</span>
      </div>
    </section>
  );
}
