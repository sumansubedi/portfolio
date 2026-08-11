import { getProjects, type ProjectEntry } from "@/lib/content";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

const STATUS_STYLES: Record<string, string> = {
  shipped: "border-pass/40 bg-pass-wash text-pass",
  ongoing: "border-pending/40 bg-pending/10 text-pending",
};

function StatusBadge({ status }: { status: string }) {
  const style = STATUS_STYLES[status] ?? "border-line text-ink-faint";
  return (
    <span
      className={`shrink-0 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide ${style}`}
    >
      {status}
    </span>
  );
}

function ProjectCard({ project, featured = false }: { project: ProjectEntry; featured?: boolean }) {
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`hoverable group flex flex-col rounded-xl border border-line bg-paper-raised p-6 ${
        featured ? "sm:p-8" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3
          className={`font-display font-semibold tracking-tight text-ink ${
            featured ? "text-xl sm:text-2xl" : "text-lg"
          }`}
        >
          {project.title}
        </h3>
        <StatusBadge status={project.status} />
      </div>

      <p
        className={`mt-3 flex-1 font-body leading-relaxed text-ink-soft ${
          featured ? "max-w-xl text-base" : "text-sm"
        }`}
      >
        {project.summary}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-ink-faint"
          >
            {tech}
          </span>
        ))}
      </div>

      <span className="mt-5 font-mono text-xs text-ink-soft transition-colors group-hover:text-pass">
        {project.linkLabel}
      </span>
    </a>
  );
}

export function Projects() {
  const projects = getProjects();
  if (projects.length === 0) return null;
  const [featured, ...rest] = projects;

  return (
    <section id="projects" className="border-t border-line">
      <Reveal className="mx-auto max-w-5xl px-6 py-20">
        <SectionLabel>projects.ts</SectionLabel>
        <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink">
          Things I&apos;ve shipped
        </h2>

        <div className="mt-10 grid gap-5">
          <ProjectCard project={featured} featured />
          {rest.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2">
              {rest.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}
