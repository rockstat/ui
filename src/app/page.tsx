import { redirect } from "next/navigation";
import { listProjects } from "@/server/projects";

export const dynamic = "force-dynamic";

export default async function Home() {
  const projects = await listProjects();
  redirect(`/p/${projects[0]?.id ?? 1}`);
}
