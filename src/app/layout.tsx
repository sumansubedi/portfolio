import type { Metadata } from "next";

// Self-hosted fonts — bundled with the site, no external CDN dependency.
// Monospace throughout, by design: this skin reads as a terminal / status
// board, not a document.
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/600.css";
import "@fontsource/jetbrains-mono/700.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";

import "./globals.css";

export const metadata: Metadata = {
  title: "Suman Subedi — QA Engineer | API & Backend Testing",
  description:
    "QA engineer with 4+ years of experience — API & backend testing, release ownership, UAT. Proven in FinTech; built for any team shipping production software. ISTQB CTFL certified. Based in Kathmandu, Nepal.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link rounded-lg bg-ink px-4 py-2 font-mono text-xs text-paper">
          skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
