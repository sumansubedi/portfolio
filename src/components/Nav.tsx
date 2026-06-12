import Link from "next/link";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-ink"
        >
          suman<span className="text-pass">.</span>
        </Link>

        <div className="flex items-center gap-6">
          <div className="hidden items-center gap-6 font-mono text-xs text-ink-soft sm:flex">
            <a className="transition-colors hover:text-ink" href="#about">
              about
            </a>
            <a className="transition-colors hover:text-ink" href="#experience">
              experience
            </a>
            <a className="transition-colors hover:text-ink" href="#writing">
              writing
            </a>
          </div>

          {/* Signature: the site reports its own status, tied to the CI suite. */}
          <span className="inline-flex items-center gap-2 rounded-full border border-pass/25 bg-pass-wash px-3 py-1 font-mono text-xs text-pass">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pass opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-pass" />
            </span>
            all checks passing
          </span>
        </div>
      </nav>
    </header>
  );
}
