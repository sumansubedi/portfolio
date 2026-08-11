import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function About() {
  return (
    <section id="about" className="border-t border-line">
      <Reveal className="mx-auto grid max-w-5xl gap-10 px-6 py-20 md:grid-cols-[1fr_1.4fr]">
        <div>
          <SectionLabel>about</SectionLabel>
          {/* Swap this div for <img src="/avatar.jpg" alt="Suman Subedi" /> once you have a headshot */}
          <div className="mt-5 flex h-16 w-16 items-center justify-center rounded-full border border-pass/25 bg-pass-wash">
            <span className="font-display text-lg font-semibold text-pass">SS</span>
          </div>
          <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink">
            The short version
          </h2>
        </div>

        <div className="max-w-xl space-y-5 font-body text-lg leading-loose text-ink-soft">
          <p>
            I&apos;m a QA engineer with nearly four years in the field — API
            testing, backend validation, release ownership, the kind of work
            that finds what&apos;s broken before it reaches production. Most
            of that time has been in FinTech — loan workflows, payment
            modules, reconciliation — where a missed edge case means real
            money, not just a bad review.
          </p>
          <p>
            I handle production releases, run UAT cycles, and spend a good
            chunk of my time in API logs figuring out why something broke.
            Lately I&apos;ve been building out an automation framework so we
            catch those issues before release, not after.
          </p>

          <dl className="grid grid-cols-1 gap-x-8 gap-y-4 border-t border-line pt-6 font-mono text-sm sm:grid-cols-2">
            <div>
              <dt className="text-ink-faint">role</dt>
              <dd className="mt-1 text-ink">QA engineer</dd>
            </div>
            <div>
              <dt className="text-ink-faint">focus</dt>
              <dd className="mt-1 text-ink">API & backend testing</dd>
            </div>
            <div>
              <dt className="text-ink-faint">based</dt>
              <dd className="mt-1 text-ink">Kathmandu, Nepal</dd>
            </div>
            <div>
              {/* <dt className="text-ink-faint">status</dt>
              <dd className="mt-1">
                <a href="#contact" className="text-pass transition-opacity hover:opacity-80">
                  open · remote-first ↓
                </a>
              </dd> */}
            </div>
          </dl>
        </div>
      </Reveal>
    </section>
  );
}
