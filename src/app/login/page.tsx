"use client";
import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/Logo";

function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  const sp = useSearchParams();

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/api/auth/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ password }) });
    setBusy(false);
    if (res.ok) router.replace(sp.get("next") || "/");
    else setError("Wrong password");
  }

  return (
    <form onSubmit={submit} className="w-80 space-y-4 rounded-lg border border-border bg-card p-6">
      <div>
        <Logo className="mb-3 h-7" />
        <div className="text-muted-foreground">Sign in to continue</div>
      </div>
      <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} autoFocus />
      {error && <div className="text-destructive text-xs">{error}</div>}
      <Button type="submit" className="w-full" disabled={busy || !password}>
        Sign in
      </Button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
