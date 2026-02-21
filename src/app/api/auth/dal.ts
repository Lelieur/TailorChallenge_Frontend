import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE } from "@/server/auth/session";
import { User } from "@/interfaces/User.interface";

type Session = {
  user?: User;
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

  return { user: data?.loggedUserData };
});

export const requireSession = cache(async (): Promise<Session> => {
  const session = await getSession();
  if (!session) redirect("/login");
  return session;
});

export const getCurrentUserId = cache(async () => {
  const session = await getSession();
  return session?.user?.id ?? null;
});

export const getCurrentUser = cache(async () => {
  const session = await getSession();
  return session?.user ?? null;
});
