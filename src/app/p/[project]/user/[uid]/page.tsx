"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useSessions, useUserProfile } from "@/lib/api";
import { SessionCard } from "@/components/sessions/SessionCard";
import { Pagination } from "@/components/Pagination";
import { CountryFlag, countryName } from "@/components/CountryFlag";
import { fmtDateTime, fmtNum } from "@/lib/format";
import { Skeleton } from "@/components/ui/skeleton";
import { deviceLabel } from "@/components/DeviceIcons";
import Link from "next/link";
import { useProjectId } from "@/lib/project";

export default function UserPage() {
  const { uid } = useParams<{ uid: string }>();
  const project = useProjectId();
  const isUserId = !/^\d{15,}$/.test(uid);
  const key = isUserId ? { userId: uid } : { uid };
  const profile = useUserProfile(key);
  const [page, setPage] = useState(1);
  const sessions = useSessions({ page, pageSize: 30, ...key });
  const p = profile.data;
  const pages = sessions.data ? Math.ceil(sessions.data.total / sessions.data.pageSize) : 0;

  const facts: [string, React.ReactNode][] = p
    ? [
        ["Device UID", <span key="uid" className="font-mono">{p.uid}</span>],
        ["User ID", p.user_ids.length ? p.user_ids.join(", ") : "—"],
        ["First seen (90d)", fmtDateTime(p.first_seen)],
        ["Last seen", fmtDateTime(p.last_seen)],
        ["Sessions (90d)", fmtNum(p.sessions)],
        ["Pageviews (90d)", fmtNum(p.pageviews)],
        ["Events (90d)", fmtNum(p.events)],
        [
          "Location",
          <span key="loc" className="flex items-center gap-1.5">
            <CountryFlag iso={p.country} /> {[p.city, p.region, countryName(p.country)].filter(Boolean).join(", ")}
          </span>,
        ],
        ["Device", `${deviceLabel(p.device_type)} ${p.device_vendor} ${p.device_model}`.trim()],
        ["Browser", `${p.browser} ${p.browser_version}`],
        ["OS", `${p.os} ${p.os_version}`],
        ["Screen", `${p.screen_w}×${p.screen_h}`],
        ["Locale / currency", `${p.locale || "—"} / ${p.currency || "—"}`],
        ["Timezone", p.tz || "—"],
        ["Authorized", p.is_auth ? "yes" : "no"],
        ["Last IP", p.ip],
      ]
    : [];

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="mb-3 flex items-center gap-3">
          <span className="text-base font-semibold">{isUserId ? `User ${uid}` : `Device ${uid}`}</span>
          {p && (
            <Link href={`/p/${project}/replay?uid=${p.uid}`} className="text-xs text-[var(--series-3)] hover:underline">
              Session replays →
            </Link>
          )}
        </div>
        {profile.isLoading ? (
          <Skeleton className="h-24 w-full" />
        ) : !p ? (
          <div className="text-muted-foreground">No sessions found in the last 90 days.</div>
        ) : (
          <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs md:grid-cols-4">
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="truncate">{v}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
      <div>
        <div className="mb-1 text-xs font-medium uppercase text-muted-foreground">Sessions in selected range</div>
        <div className="space-y-1.5">{sessions.data?.rows.map(s => <SessionCard key={`${s.uid}-${s.sess_start}`} s={s} />)}</div>
        <Pagination page={page} pages={pages} total={sessions.data?.total} onPage={setPage} label="sessions" />
      </div>
    </div>
  );
}
