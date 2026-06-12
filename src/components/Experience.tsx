import { getExperience } from "@/lib/content";
import { SectionLabel } from "./SectionLabel";

export function Experience() {
  const entries = getExperience();

  return (
    <section id="experience" className="border-t border-line bg-paper-raised">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <SectionLabel>experience</SectionLabel>
        <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink">
          The path so far
        </h2>

        <ol className="mt-12 border-l border-line">
          {entries.map((entry, i) => (
            <li key={entry.slug} className="relative pl-8 pb-12 last:pb-0">
              {/* Marker: order carries real meaning here. */}
              <span className="absolute -left-[6.5px] top-1.5 h-3 w-3 rounded-full border-2 border-pass bg-paper-raised" />
              <p className="font-mono text-xs text-ink-faint">
                {String(entries.length - i).padStart(2, "0")} · {entry.start} —{" "}
                {entry.end}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-ink">
                {entry.role}
              </h3>
              <p className="font-mono text-sm text-pass">{entry.org}</p>
              <p className="mt-3 max-w-2xl font-body leading-relaxed text-ink-soft">
                {entry.summary}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
