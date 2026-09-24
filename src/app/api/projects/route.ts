import { handler } from "@/server/handler";
import { listProjects } from "@/server/projects";

export const GET = handler(async () => listProjects());
