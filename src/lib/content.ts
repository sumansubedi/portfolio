import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

/* ── Blog posts ──────────────────────────────────────────────────────────── */

export type BlogPost = {
  slug: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  summary: string;
  body: string; // raw MDX, compiled at render time
};

const BLOG_DIR = path.join(CONTENT_DIR, "blog");

export function getBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: String(data.title ?? slug),
        date: String(data.date ?? ""),
        summary: String(data.summary ?? ""),
        body: content,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return getBlogPosts().find((p) => p.slug === slug);
}

/* ── Experience timeline ─────────────────────────────────────────────────── */

export type ExperienceEntry = {
  slug: string;
  role: string;
  org: string;
  start: string; // e.g. "2023"
  end: string; // e.g. "Present"
  summary: string;
};

const EXPERIENCE_DIR = path.join(CONTENT_DIR, "experience");

export function getExperience(): ExperienceEntry[] {
  if (!fs.existsSync(EXPERIENCE_DIR)) return [];
  return fs
    .readdirSync(EXPERIENCE_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(EXPERIENCE_DIR, file), "utf8");
      const { data, content } = matter(raw);
      return {
        slug,
        role: String(data.role ?? ""),
        org: String(data.org ?? ""),
        start: String(data.start ?? ""),
        end: String(data.end ?? "Present"),
        summary: (data.summary ? String(data.summary) : content).trim(),
      };
    })
    .sort((a, b) => (a.start < b.start ? 1 : -1));
}
