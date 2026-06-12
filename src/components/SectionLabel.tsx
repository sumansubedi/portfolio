export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs tracking-wide text-ink-faint">
      <span className="text-pass">{"// "}</span>
      {children}
    </p>
  );
}
