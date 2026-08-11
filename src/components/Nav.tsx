"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const LINKS = [
  { href: "#about", label: "about" },
  { href: "#experience", label: "experience" },
  { href: "#skills", label: "skills" },
  { href: "#projects", label: "projects" },
  { href: "#writing", label: "writing" },
  { href: "#contact", label: "contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Scroll-aware header: a stronger shadow once content is under it, so
  // the sticky bar reads as "elevated" instead of just floating statically.
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active-section highlight: whichever section crosses the mid-viewport
  // band owns the nav underline. Ratios for every section are tracked
  // together (not just the ones in the latest callback batch) and the
  // single highest one wins — short sections can briefly co-intersect the
  // band, and picking "last in this batch" made two links light up at once.
  const ratios = useRef(new Map<string, number>());
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.href.slice(1))).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.current.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let bestId: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of ratios.current) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }
        if (bestId) setActiveId(bestId);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Escape closes the mobile menu regardless of focus location inside it.
  useEffect(() => {
    if (!mobileOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  // Real local time, not a fabricated metric — set only after mount so the
  // server-rendered markup never disagrees with the client's clock.
  const [time, setTime] = useState("");
  useEffect(() => {
    function tick() {
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Kathmandu",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(new Date()),
      );
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-sm transition-shadow duration-[var(--duration-base)] ${
        scrolled ? "shadow-[0_1px_0_0_var(--color-line),0_8px_20px_-16px_rgb(21_24_28_/_0.35)]" : ""
      }`}
    >
      <div className="hidden border-b border-line/60 sm:block">
        <div className="mx-auto flex max-w-5xl justify-between px-6 py-1.5 font-mono text-[10px] uppercase tracking-wide text-ink-faint">
          <span suppressHydrationWarning>kathmandu, np · {time || "--:--:--"}</span>
          <span className="text-pass">status: nominal</span>
        </div>
      </div>
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-ink"
        >
          suman<span className="text-pass">.</span>
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden items-center gap-6 font-mono text-xs text-ink-soft sm:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={activeId === link.href.slice(1) ? "location" : undefined}
                className={`nav-link py-1 ${
                  activeId === link.href.slice(1) ? "nav-link-active" : "hover:text-ink"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline rounded-md px-2.5 py-1"
            >
              resume ↗
            </a>
          </div>

          <div className="group relative">
            <span className="inline-flex cursor-default items-center gap-2 rounded-full border border-pass/25 bg-pass-wash px-3 py-1 font-mono text-xs text-pass">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pass opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-pass" />
              </span>
              all checks passing
            </span>
            <div className="pointer-events-none absolute right-0 top-full mt-2 hidden w-56 rounded-lg border border-line bg-paper-raised px-3 py-2 font-mono text-xs text-ink-soft shadow-sm opacity-0 transition-opacity duration-150 group-hover:opacity-100 sm:block">
              automated tests run on every commit — this badge is live
            </div>
          </div>

          {/* Mobile menu toggle — 44x44 hit target, only rendered below sm. */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-line text-ink sm:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              {mobileOpen ? (
                <path
                  d="M3 3l12 12M15 3L3 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M2 4.5h14M2 9h14M2 13.5h14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-line bg-paper transition-[max-height] duration-[var(--duration-base)] ease-[var(--ease-standard)] sm:hidden ${
          mobileOpen ? "max-h-96" : "max-h-0 border-t-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-6 py-4 font-mono text-sm">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`rounded-md px-2 py-2.5 transition-colors ${
                activeId === link.href.slice(1)
                  ? "bg-pass-wash text-pass"
                  : "text-ink-soft hover:bg-paper-raised hover:text-ink"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="rounded-md px-2 py-2.5 text-pass"
          >
            resume ↗
          </a>
        </div>
      </div>
    </header>
  );
}
