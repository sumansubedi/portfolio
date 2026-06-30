import { SectionLabel } from "./SectionLabel";

export function Contact() {
  return (
    <section id="contact" className="border-t border-line">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <SectionLabel>contact</SectionLabel>
        <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink">
          Let&apos;s work together
        </h2>
        <p className="mt-4 max-w-lg font-body text-lg leading-relaxed text-ink-soft">
          I&apos;m open to senior QA roles in FinTech and product-led companies
          — remote-first preferred. If you need someone who owns quality from
          requirements to release, I&apos;d like to hear from you.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="mailto:suman.subedi1223@gmail.com"
            className="inline-flex items-center rounded-lg bg-pass px-5 py-3 font-mono text-sm text-paper transition-opacity hover:opacity-90"
          >
            suman.subedi1223@gmail.com
          </a>
          <div className="flex gap-6 font-mono text-sm text-ink-soft">
            <a
              href="https://www.linkedin.com/in/suman-subedi/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-ink"
            >
              linkedin ↗
            </a>
            <a
              href="https://github.com/sumansubedi"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-ink"
            >
              github ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
