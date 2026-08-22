"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { SectionLabel } from "./SectionLabel";

// The token is kept only in this browser's localStorage, entered once via
// the form below — never hardcoded here, so nothing in the shipped JS
// bundle can be read off by anyone viewing the page source. The API URL is
// NOT a secret (it's a public tunnel hostname, not a credential) — it's
// fine to ship a default so first-time setup is just "type the passcode."
const STORAGE_KEYS = { apiUrl: "jobMatcherApiUrl", token: "jobMatcherToken" };
const DEFAULT_API_URL = "https://api.sumansubedi62.com.np";

type MatchRow = {
  title: string;
  company: string;
  link: string;
  score: number;
  gap_analysis: string;
  role: string | null;
  matching_skills: string[];
  missing_skills: string[];
  matched_at: string;
  recommendation: string;
};

// Matches the enum score_match() asks Gemini for in processing/skill_matcher.py.
const RECOMMENDATION_STYLES: Record<string, { label: string; className: string }> = {
  apply_now: { label: "apply now", className: "border-pass/40 bg-pass-wash text-pass" },
  consider_applying: { label: "consider", className: "border-line bg-paper-raised text-ink-soft" },
  skill_up_first: { label: "skill up first", className: "border-pending/40 bg-pending/10 text-pending" },
  skip: { label: "skip", className: "border-line bg-paper-raised text-ink-faint" },
};

type Stats = {
  total_matches: number;
  average_score: number;
  matches_by_role: Record<string, number>;
  top_missing_skills: [string, number][];
};

type Profile = {
  personal: {
    name: string;
    target_titles: string[];
    seniority: string;
    location_preference: string[];
    domain_preference: string[];
  };
  technical_skills: Record<string, string[]>;
  certifications: string[];
  experience_years: number;
  domain_experience: string[];
  soft_skills: string[];
};

type RunStatus = {
  running: boolean;
  last_result: "ok" | "error" | null;
  last_error: string | null;
  todays_match_count: number | null;
};

export function CareerDashboard() {
  const [apiUrl, setApiUrl] = useState("");
  const [token, setToken] = useState("");
  const [formUrl, setFormUrl] = useState("");
  const [formToken, setFormToken] = useState("");
  const [configuring, setConfiguring] = useState(true);

  const [matches, setMatches] = useState<MatchRow[] | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [connError, setConnError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [triggerBusy, setTriggerBusy] = useState(false);
  const [triggerMessage, setTriggerMessage] = useState("");

  useEffect(() => {
    const savedUrl = localStorage.getItem(STORAGE_KEYS.apiUrl) || "";
    const savedToken = localStorage.getItem(STORAGE_KEYS.token) || "";
    setApiUrl(savedUrl);
    setToken(savedToken);
    // Pre-fill with the stable production tunnel URL on first visit, so
    // setup is just "confirm URL, enter passcode" instead of needing to
    // know/paste a tunnel address. A returning visitor's saved (possibly
    // overridden, e.g. for local testing) URL still wins once connected.
    setFormUrl(savedUrl || DEFAULT_API_URL);
    setFormToken(savedToken);
    setConfiguring(!savedUrl);
  }, []);

  const fetchAll = useCallback(async (url: string) => {
    setLoading(true);
    setConnError(null);
    try {
      const [matchesRes, statsRes, profileRes] = await Promise.all([
        fetch(`${url}/api/matches?limit=100`),
        fetch(`${url}/api/stats`),
        fetch(`${url}/api/profile`),
      ]);
      if (!matchesRes.ok || !statsRes.ok || !profileRes.ok) {
        throw new Error("non-200 from one or more endpoints");
      }
      setMatches(await matchesRes.json());
      setStats(await statsRes.json());
      setProfile(await profileRes.json());
    } catch {
      setConnError("Could not reach the job matcher API. Is the local server + tunnel running?");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (apiUrl && !configuring) fetchAll(apiUrl);
  }, [apiUrl, configuring, fetchAll]);

  function saveConnection(e: React.FormEvent) {
    e.preventDefault();
    const cleanUrl = formUrl.trim().replace(/\/$/, "");
    localStorage.setItem(STORAGE_KEYS.apiUrl, cleanUrl);
    localStorage.setItem(STORAGE_KEYS.token, formToken);
    setApiUrl(cleanUrl);
    setToken(formToken);
    setConfiguring(false);
  }

  async function pollStatus() {
    try {
      const res = await fetch(`${apiUrl}/status`);
      const data: RunStatus = await res.json();
      if (data.running) {
        setTriggerMessage("Running…");
        setTimeout(pollStatus, 10000);
        return;
      }
      setTriggerMessage(
        data.last_result === "ok"
          ? `Done — ${data.todays_match_count ?? 0} match(es) today.`
          : `Finished with an error: ${data.last_error}`,
      );
      setTriggerBusy(false);
      fetchAll(apiUrl);
    } catch {
      setTriggerMessage("Lost connection while checking status.");
      setTriggerBusy(false);
    }
  }

  async function runNow() {
    setTriggerBusy(true);
    setTriggerMessage("Starting…");
    try {
      const res = await fetch(`${apiUrl}/trigger`, {
        method: "POST",
        headers: { "X-Trigger-Token": token },
      });
      const data = await res.json();
      if (!res.ok) {
        setTriggerMessage(`Failed: ${data.error || res.status}`);
        setTriggerBusy(false);
        return;
      }
      pollStatus();
    } catch {
      setTriggerMessage("Could not reach the server.");
      setTriggerBusy(false);
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="font-display text-lg font-semibold tracking-tight text-ink">
            suman<span className="text-pass">.</span>
          </Link>
          <span className="inline-flex items-center gap-2 rounded-full border border-pending/40 bg-pending/10 px-3 py-1 font-mono text-xs text-pending">
            <span className="h-1.5 w-1.5 rounded-full bg-pending" aria-hidden="true" />
            private — not indexed
          </span>
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-16">
        <SectionLabel>career-intel.dashboard.ts</SectionLabel>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink">
          Career Intelligence
        </h1>
        <p className="mt-2 max-w-xl font-body text-ink-soft">
          Live view into the LinkedIn job-matcher pipeline: what it&apos;s found, how it
          scores against my profile, and where the gaps are.
        </p>

        {/* Connection */}
        <section className="mt-10 rounded-lg border border-line bg-paper-raised p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 font-mono text-xs">
              <span
                className={`h-2 w-2 rounded-full ${
                  configuring ? "bg-ink-faint" : connError ? "bg-pending" : "bg-pass"
                }`}
                aria-hidden="true"
              />
              <span className="text-ink-soft">
                {configuring
                  ? "not connected"
                  : connError
                    ? "unreachable"
                    : `connected — ${apiUrl}`}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setConfiguring((v) => !v)}
              className="btn-ghost font-mono text-xs underline"
            >
              {configuring ? "cancel" : "reconfigure"}
            </button>
          </div>

          {configuring && (
            <form onSubmit={saveConnection} className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
              <input
                type="url"
                required
                placeholder={DEFAULT_API_URL}
                value={formUrl}
                onChange={(e) => setFormUrl(e.target.value)}
                className="rounded-md border border-line bg-paper px-3 py-2 font-mono text-sm text-ink placeholder:text-ink-faint focus:outline-none"
              />
              <input
                type="password"
                required
                placeholder="passcode"
                value={formToken}
                onChange={(e) => setFormToken(e.target.value)}
                className="rounded-md border border-line bg-paper px-3 py-2 font-mono text-sm text-ink placeholder:text-ink-faint focus:outline-none"
              />
              <button type="submit" className="btn-primary rounded-md px-4 py-2 font-mono text-sm">
                connect
              </button>
            </form>
          )}

          {!configuring && (
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={runNow}
                disabled={triggerBusy}
                className="btn-secondary rounded-md px-4 py-2 font-mono text-sm disabled:cursor-not-allowed"
              >
                {triggerBusy ? "running…" : "run job matcher now"}
              </button>
              {triggerMessage && (
                <span className="font-mono text-xs text-ink-faint">{triggerMessage}</span>
              )}
            </div>
          )}
        </section>

        {connError && !configuring && (
          <p className="mt-4 font-mono text-xs text-pending">{connError}</p>
        )}

        {/* AI Analysis */}
        {stats && (
          <section className="mt-14">
            <SectionLabel>ai-analysis.ts</SectionLabel>
            <h2 className="mt-3 font-display text-xl font-semibold tracking-tight text-ink">
              What the matcher's seeing
            </h2>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="hoverable rounded-lg border border-line bg-paper p-5">
                <p className="font-mono text-[10px] text-ink-faint">total matches</p>
                <p className="mt-2 font-display text-3xl font-semibold text-pass">
                  {stats.total_matches}
                </p>
              </div>
              <div className="hoverable rounded-lg border border-line bg-paper p-5">
                <p className="font-mono text-[10px] text-ink-faint">average score</p>
                <p className="mt-2 font-display text-3xl font-semibold text-pass">
                  {stats.average_score}
                </p>
              </div>
              <div className="hoverable rounded-lg border border-line bg-paper p-5">
                <p className="font-mono text-[10px] text-ink-faint">roles tracked</p>
                <p className="mt-2 font-display text-3xl font-semibold text-pass">
                  {Object.keys(stats.matches_by_role).length}
                </p>
              </div>
            </div>

            {Object.keys(stats.matches_by_role).length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {Object.entries(stats.matches_by_role).map(([role, count]) => (
                  <span
                    key={role}
                    className="inline-flex rounded border border-line bg-paper-raised px-2.5 py-1 font-mono text-xs text-ink-soft"
                  >
                    {role || "unspecified"} · {count}
                  </span>
                ))}
              </div>
            )}

            {stats.top_missing_skills.length > 0 && (
              <div className="mt-6">
                <p className="font-mono text-xs text-ink-faint">
                  <span className="text-pending">{"// "}</span>
                  most common gaps
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {stats.top_missing_skills.map(([skill, count]) => (
                    <span
                      key={skill}
                      className="hoverable inline-flex rounded border border-pending/30 bg-pending/10 px-2.5 py-1 font-mono text-xs text-pending"
                    >
                      {skill} × {count}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Job Data */}
        <section className="mt-14">
          <SectionLabel>job-data.ts</SectionLabel>
          <h2 className="mt-3 font-display text-xl font-semibold tracking-tight text-ink">
            Matched jobs
          </h2>

          {loading && <p className="mt-4 font-mono text-xs text-ink-faint">loading…</p>}

          {matches && matches.length === 0 && !loading && (
            <p className="mt-4 font-mono text-xs text-ink-faint">
              no matches yet — run the matcher to populate this.
            </p>
          )}

          {matches && matches.length > 0 && (
            <div className="mt-6 overflow-x-auto rounded-lg border border-line">
              <table className="w-full min-w-[640px] border-collapse font-mono text-xs">
                <thead>
                  <tr className="border-b border-line bg-paper-raised text-left text-ink-faint">
                    <th className="px-4 py-3 font-normal">role</th>
                    <th className="px-4 py-3 font-normal">title</th>
                    <th className="px-4 py-3 font-normal">company</th>
                    <th className="px-4 py-3 font-normal">score</th>
                    <th className="px-4 py-3 font-normal">recommendation</th>
                    <th className="px-4 py-3 font-normal">matched</th>
                  </tr>
                </thead>
                <tbody>
                  {matches.map((m) => {
                    const badge = RECOMMENDATION_STYLES[m.recommendation];
                    return (
                      <tr key={`${m.link}-${m.matched_at}`} className="border-b border-line last:border-0">
                        <td className="px-4 py-3 text-ink-soft">{m.role || "—"}</td>
                        <td className="px-4 py-3 text-ink">
                          <Link
                            href={m.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-pass hover:underline"
                          >
                            {m.title}
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-ink-soft">{m.company}</td>
                        <td className="px-4 py-3">
                          <span className={m.score >= 90 ? "text-pass" : "text-pending"}>
                            {m.score}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {badge ? (
                            <span
                              className={`inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide ${badge.className}`}
                            >
                              {badge.label}
                            </span>
                          ) : (
                            <span className="text-ink-faint">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-ink-faint">{m.matched_at}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Your Profile */}
        {profile && (
          <section className="mt-14 mb-8">
            <SectionLabel>your-profile.ts</SectionLabel>
            <h2 className="mt-3 font-display text-xl font-semibold tracking-tight text-ink">
              {profile.personal.name}
            </h2>
            <p className="mt-1 font-mono text-xs text-ink-faint">
              {profile.personal.seniority} · {profile.experience_years} yrs experience ·{" "}
              {profile.personal.location_preference.join(" / ")}
            </p>

            <div className="mt-6 divide-y divide-line border-y border-line">
              {Object.entries(profile.technical_skills).map(([category, items]) => (
                <div key={category} className="grid gap-4 py-5 sm:grid-cols-[10rem_1fr]">
                  <p className="pt-0.5 font-mono text-xs text-ink-faint">
                    <span className="text-pass">{"// "}</span>
                    {category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <span
                        key={skill}
                        className="hoverable inline-flex rounded border border-line bg-paper-raised px-2.5 py-1 font-mono text-xs text-ink"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {profile.certifications.length > 0 && (
              <p className="mt-6 font-mono text-xs text-ink-faint">
                <span className="text-pass">✓</span> {profile.certifications.join(", ")}
              </p>
            )}
          </section>
        )}
      </main>
    </>
  );
}
