import { Suspense } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Suspense>
        <Sidebar />
      </Suspense>
      <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <Suspense>
          <Header />
        </Suspense>
        <main className="mx-auto w-full max-w-[1400px] flex-1 p-4 md:p-6">
          <Suspense>{children}</Suspense>
        </main>
      </div>
    </div>
  );
}
