import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getBlogPost, getBlogPosts } from "@/lib/content";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

// Map MDX elements to on-theme styled components.
const components = {
  h2: (props: React.ComponentProps<"h2">) => (
    <h2
      className="mt-10 font-display text-2xl font-semibold tracking-tight text-ink"
      {...props}
    />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p className="mt-5 font-body text-lg leading-relaxed text-ink-soft" {...props} />
  ),
  a: (props: React.ComponentProps<"a">) => (
    <a className="text-pass underline underline-offset-4" {...props} />
  ),
  code: (props: React.ComponentProps<"code">) => (
    <code
      className="rounded bg-pass-wash px-1.5 py-0.5 font-mono text-sm text-pass"
      {...props}
    />
  ),
};

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-2xl px-6 py-20">
        <Link
          href="/#writing"
          className="font-mono text-xs text-ink-faint transition-colors hover:text-ink"
        >
          ← back to writing
        </Link>

        <p className="mt-10 font-mono text-xs text-ink-faint">
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight text-ink">
          {post.title}
        </h1>

        <article className="mt-8">
          <MDXRemote source={post.body} components={components} />
        </article>
      </main>
      <Footer />
    </>
  );
}
