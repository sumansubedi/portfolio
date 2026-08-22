import type { Metadata } from "next";
import { CareerDashboard } from "@/components/CareerDashboard";

// Not indexed/listed — this page is a private operator view, not part of
// the public site's content, even though nothing stops a direct visit.
export const metadata: Metadata = {
  title: "Career Intelligence — Suman Subedi",
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return <CareerDashboard />;
}
