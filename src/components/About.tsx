import { SectionLabel } from "./SectionLabel";

export function About() {
  return (
    <section id="about" className="border-t border-line">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-20 md:grid-cols-[1fr_1.4fr]">
        <div>
          <SectionLabel>about</SectionLabel>
          <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink">
            The short version
          </h2>
        </div>

        <div className="space-y-5 font-body text-lg leading-relaxed text-ink-soft">
          <p>
            I&apos;ve spent nearly four years on the unglamorous, essential half
            of building software — making sure it actually does what it claims
            in environments where it really matters. My work lives in FinTech:
            loan workflows, payment modules, reconciliation, and the edge cases
            a broken disbursement creates at 2 a.m.
          </p>
          <p>
            I own production releases, lead UAT cycles, and dig into API logs
            until I understand exactly why something failed. Right now I&apos;m
            also building out an API automation framework — because the best
            time to catch a regression is before it ships, not after.
          </p>

          <dl className="grid grid-cols-2 gap-x-8 gap-y-4 border-t border-line pt-6 font-mono text-sm">
            <div>
              <dt className="text-ink-faint">role</dt>
              <dd className="mt-1 text-ink">QA engineer</dd>
            </div>
            <div>
              <dt className="text-ink-faint">focus</dt>
              <dd className="mt-1 text-ink">API & backend testing, FinTech</dd>
            </div>
            <div>
              <dt className="text-ink-faint">based</dt>
              <dd className="mt-1 text-ink">Kathmandu, Nepal</dd>
            </div>
            <div>
              <dt className="text-ink-faint">status</dt>
              <dd className="mt-1 text-pass">open to senior QA roles</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
