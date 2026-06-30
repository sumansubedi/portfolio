import { SectionLabel } from "./SectionLabel";

const stats = [
  { number: "4+", label: "years in QA" },
  { number: "3", label: "companies" },
  { number: "15+", label: "tools & stacks" },
  { number: "CTFL", label: "ISTQB certified" },
];

const skills = [
  {
    category: "testing",
    items: [
      "api & backend testing",
      "functional testing",
      "regression testing",
      "uat & production support",
      "security & fapi testing",
      "performance validation",
      "rca & incident analysis",
    ],
  },
  {
    category: "tools",
    items: ["postman", "selenium", "playwright", "jira", "sql", "git", "swagger"],
  },
  {
    category: "domain",
    items: [
      "fintech / digital lending",
      "loan lifecycle (origination → reconciliation)",
      "rest apis",
      "ci/cd",
      "sdlc",
    ],
  },
];

export function Highlights() {
  return (
    <section id="skills" className="border-t border-line bg-paper-raised">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <SectionLabel>skills.verified.ts</SectionLabel>
        <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink">
          Four years in the field.
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map(({ number, label }) => (
            <div key={label} className="rounded-lg border border-line bg-paper p-5">
              <p className="font-display text-3xl font-semibold text-pass">{number}</p>
              <p className="mt-1 font-mono text-xs text-ink-faint">{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 divide-y divide-line border-y border-line">
          {skills.map(({ category, items }) => (
            <div key={category} className="grid gap-4 py-6 sm:grid-cols-[10rem_1fr]">
              <p className="pt-0.5 font-mono text-xs text-ink-faint">
                <span className="text-pass">{"// "}</span>
                {category}
              </p>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex rounded border border-line bg-paper px-2.5 py-1 font-mono text-xs text-ink"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 font-mono text-xs text-ink-faint">
          <span className="text-pass">✓</span>{" "}
          all skills verified through production work, not just tutorials
        </p>
      </div>
    </section>
  );
}
