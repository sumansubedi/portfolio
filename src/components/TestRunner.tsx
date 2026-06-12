"use client";

import { useState } from "react";
import { SectionLabel } from "./SectionLabel";

type Status = "pending" | "running" | "pass";

const CASES = [
  "site is owned, not rented",
  "runs its own tests in CI",
  "built to last a decade",
  "you read this far",
] as const;

export function TestRunner() {
  const [statuses, setStatuses] = useState<Status[]>(() =>
    CASES.map(() => "pending"),
  );
  const [phase, setPhase] = useState<"idle" | "running" | "done">("idle");
  const [elapsed, setElapsed] = useState(0);

  function run() {
    if (phase === "running") return;
    setPhase("running");
    setStatuses(CASES.map(() => "pending"));
    setElapsed(0);

    const start = performance.now();
    CASES.forEach((_, i) => {
      // mark "running"
      setTimeout(() => {
        setStatuses((prev) => prev.map((s, j) => (j === i ? "running" : s)));
      }, i * 360);
      // resolve to "pass"
      setTimeout(
        () => {
          setStatuses((prev) => prev.map((s, j) => (j === i ? "pass" : s)));
          if (i === CASES.length - 1) {
            setElapsed(Math.round(performance.now() - start));
            setPhase("done");
          }
        },
        i * 360 + 280,
      );
    });
  }

  const passing = statuses.filter((s) => s === "pass").length;

  return (
    <section className="border-t border-line bg-paper-raised">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <SectionLabel>the_craft.test.ts</SectionLabel>
        <h2 className="mt-4 max-w-xl font-display text-2xl font-semibold tracking-tight text-ink">
          This portfolio tests itself. Run the suite.
        </h2>

        <div className="mt-8 overflow-hidden rounded-xl border border-line bg-paper">
          {/* title bar */}
          <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
            <span className="font-mono text-xs text-ink-faint">
              suman.portfolio &gt; the_craft.test.ts
            </span>
            <button
              type="button"
              onClick={run}
              disabled={phase === "running"}
              className="rounded-md bg-ink px-3 py-1.5 font-mono text-xs text-paper transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {phase === "running" ? "running…" : "▸ run tests"}
            </button>
          </div>

          {/* test rows */}
          <ul className="divide-y divide-line">
            {CASES.map((label, i) => {
              const s = statuses[i];
              return (
                <li
                  key={label}
                  className="flex items-center gap-3 px-4 py-3 font-mono text-sm"
                >
                  <StatusGlyph status={s} />
                  <span
                    className={
                      s === "pass"
                        ? "text-ink"
                        : s === "running"
                          ? "text-ink-soft"
                          : "text-ink-faint"
                    }
                  >
                    it({label})
                  </span>
                </li>
              );
            })}
          </ul>

          {/* summary */}
          <div className="border-t border-line px-4 py-3 font-mono text-xs">
            {phase === "done" ? (
              <span className="text-pass">
                ✓ {passing} passing ({elapsed}ms) — no failures
              </span>
            ) : (
              <span className="text-ink-faint">
                {passing}/{CASES.length} complete
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatusGlyph({ status }: { status: Status }) {
  if (status === "pass") {
    return <span className="text-pass">✓</span>;
  }
  if (status === "running") {
    return (
      <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-pending" />
    );
  }
  return <span className="text-ink-faint">○</span>;
}
