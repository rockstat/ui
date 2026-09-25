"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Activity, BarChart3, Gauge, ListTree, LogOut, MousePointerClick, ChevronsUpDown, PlayCircle, Filter, Route, LayoutDashboard, Bot, ExternalLink } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useLive, useProjects } from "@/lib/api";
import { useProjectId } from "@/lib/project";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { fmtNum } from "@/lib/format";
import { Logo } from "@/components/Logo";

const NAV = [
  { href: "", label: "Overview", icon: BarChart3 },
  { href: "/dashboards", label: "Dashboards", icon: LayoutDashboard },
  { href: "/sessions", label: "Sessions", icon: ListTree },
  { href: "/events", label: "Events", icon: MousePointerClick },
  { href: "/funnels", label: "Funnels", icon: Filter },
  { href: "/journeys", label: "Journeys", icon: Route },
  { href: "/replay", label: "Replay", icon: PlayCircle },
  { href: "/performance", label: "Performance", icon: Gauge },
];

export function Sidebar() {
  const project = useProjectId();
  const pathname = usePathname();
  const sp = useSearchParams();
  const router = useRouter();
  const { data: projects } = useProjects();
  const { data: live } = useLive();
  const [open, setOpen] = useState(false);
  const current = projects?.find(p => p.id === project);
  const qs = sp.toString();

  function switchProject(id: number) {
    setOpen(false);
    const rest = pathname.replace(/^\/p\/\d+/, "");
    router.push(`/p/${id}${rest}${qs ? `?${qs}` : ""}`);
  }

  return (
    <aside className="hidden h-full w-56 shrink-0 flex-col overflow-y-auto border-r border-border bg-sidebar md:flex">
      <div className="px-4 py-4">
        <Logo className="h-6" />
      </div>
      <div className="px-3">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            className="flex w-full items-center justify-between rounded-md border border-border bg-card px-3 py-2 text-left hover:bg-muted"
          >
            <span className="min-w-0">
              <span className="block truncate font-medium">{current?.name ?? `Project ${project}`}</span>
              <span className="block truncate text-xs text-muted-foreground">{current?.domains?.[0] ?? `id ${project}`}</span>
            </span>
            <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" />
          </PopoverTrigger>
          <PopoverContent className="w-64 p-0" align="start">
            <Command>
              <CommandInput placeholder="Find project…" />
              <CommandList>
                <CommandEmpty>No projects</CommandEmpty>
                <CommandGroup>
                  {projects?.map(p => (
                    <CommandItem key={p.id} value={`${p.name} ${p.id} ${p.domains?.join(" ")}`} onSelect={() => switchProject(p.id)}>
                      <div className="min-w-0">
                        <div className="truncate">{p.name}</div>
                        <div className="truncate text-xs text-muted-foreground">
                          {p.id} · {p.domains?.[0]}
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <nav className="mt-4 flex flex-col gap-0.5 px-3">
        {NAV.map(item => {
          const href = `/p/${project}${item.href}`;
          const active = item.href === "" ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={item.href}
              href={`${href}${qs ? `?${qs}` : ""}`}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground",
                active && "bg-muted text-foreground"
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto space-y-2 px-3 pb-4">
        {process.env.NEXT_PUBLIC_NAO_URL && (
          <a
            href={process.env.NEXT_PUBLIC_NAO_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
            title="nao analytics agent (separate app)"
          >
            <Bot className="size-4" /> nao agent <ExternalLink className="ml-auto size-3" />
          </a>
        )}
        <div className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground">
          <Activity className="size-4 text-[var(--status-good)]" />
          <span className="tabular">{fmtNum(live?.users)}</span>
          <span className="text-xs">online (5 min)</span>
        </div>
        <button
          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          onClick={async () => {
            await fetch("/api/auth/logout", { method: "POST" });
            window.location.assign("/login");
          }}
        >
          <LogOut className="size-4" /> Sign out
        </button>
      </div>
    </aside>
  );
}
