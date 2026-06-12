import Link from "next/link";
import { getBlogPosts } from "@/lib/content";
import { SectionLabel } from "./SectionLabel";

function formatDate(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function Writing() {
  const posts = getBlogPosts();

  return (
    <section id="writing" className="border-t border-line">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <SectionLabel>writing</SectionLabel>
        <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink">
          Notes &amp; longer thoughts
        </h2>

        <ul className="mt-10 divide-y divide-line border-t border-line">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/writing/${post.slug}`}
                className="group flex flex-col gap-2 py-6 transition-colors sm:flex-row sm:items-baseline sm:gap-8"
              >
                <time className="font-mono text-xs text-ink-faint sm:w-28 sm:shrink-0">
                  {formatDate(post.date)}
                </time>
                <div>
                  <h3 className="font-display text-xl font-medium tracking-tight text-ink transition-colors group-hover:text-pass">
                    {post.title}
                  </h3>
                  <p className="mt-1 max-w-2xl font-body leading-relaxed text-ink-soft">
                    {post.summary}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
