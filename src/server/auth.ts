import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { env } from "./env";

export const AUTH_COOKIE = "rs_session";
const secret = () => new TextEncoder().encode(env.uiSecret);

export async function issueToken(): Promise<string> {
  return new SignJWT({ ok: true }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("30d").sign(secret());
}

export async function verifyToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    await jwtVerify(token, secret());
    return true;
  } catch {
    return false;
  }
}

export function authEnabled(): boolean {
  return env.uiPassword.length > 0;
}
