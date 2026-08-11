import { getExperience } from "@/lib/content";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function Experience() {
  const entries = getExperience();

  return (
    <section id="experience" className="border-t border-line bg-paper-raised">
      <Reveal className="mx-auto max-w-5xl px-6 py-20">
        <SectionLabel>experience</SectionLabel>
        <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink">
          The path so far
        </h2>

        <ol className="mt-12 border-l border-line">
          {entries.map((entry, i) => {
            const active = entry.end === "Present";
            return (
              <li key={entry.slug} className="relative pl-8 pb-10 last:pb-0">
                {/* Marker: order carries real meaning here. */}
                <span
                  className={`absolute -left-[6.5px] top-1.5 h-3 w-3 rounded-full border-2 bg-paper-raised ${
                    active ? "border-pending" : "border-pass"
                  }`}
                />
                <div className="hoverable rounded-lg border border-line bg-paper p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-mono text-xs text-ink-faint">
                      deploy.{String(entries.length - i).padStart(2, "0")} ·{" "}
                      {entry.start} — {entry.end}
                    </p>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide ${
                        active
                          ? "border-pending/40 bg-pending/10 text-pending"
                          : "border-pass/40 bg-pass-wash text-pass"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`h-1.5 w-1.5 rounded-full ${active ? "bg-pending" : "bg-pass"}`}
                      />
                      {active ? "active" : "complete"}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-ink">
                    {entry.role}
                  </h3>
                  <p className="font-mono text-sm text-pass">{entry.org}</p>
                  <p className="mt-3 max-w-xl font-body leading-loose text-ink-soft">
                    {entry.summary}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </Reveal>
    </section>
  );
}
