"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fades + rises a section's content in once it enters the viewport.
 * One Reveal per section (not per item) — see UX guidance against
 * animating more than 1–2 elements per view.
 */
export function Reveal({
  children,
  delayMs = 0,
  className = "",
}: {
  children: React.ReactNode;
  delayMs?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${visible ? "reveal-visible" : "reveal"} ${className}`}
      style={{ "--reveal-delay": `${delayMs}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
