import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const SESSION_COOKIE = "session";

export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
};

type Session = {
  userId?: string;
};

export const getSession = cache(async (): Promise<Session | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const upstream = await fetch(`${process.env.API_URL}/api/verify`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!upstream.ok) return null;

  const data = await upstream.json().catch(() => null);
  if (!data?.loggedUserData?.id) return null;

  return { userId: data.loggedUserData.id };
});

export const requireSession = cache(async (): Promise<Session> => {
  const session = await getSession();
  if (!session) redirect("/login");
  return session;
});

export const getCurrentUserId = cache(async () => {
  const session = await getSession();
  return session?.userId ?? null;
});
