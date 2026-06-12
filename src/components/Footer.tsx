export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 font-mono text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="text-pass">✓</span> built, owned, and tested by suman
        </p>
        <div className="flex gap-6">
          <a className="transition-colors hover:text-ink" href="#">
            github
          </a>
          <a className="transition-colors hover:text-ink" href="#">
            email
          </a>
          <a className="transition-colors hover:text-ink" href="#">
            rss
          </a>
        </div>
      </div>
    </footer>
  );
}
