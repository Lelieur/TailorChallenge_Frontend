import "server-only";
import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/server/auth/session";

export async function getReviewById(id: string) {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;

  const res = await fetch(
    `${process.env.API_URL}/api/reviews/${encodeURIComponent(id)}`,
    {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      cache: "no-store",
    },
  );

  if (!res.ok) throw new Error(`UPSTREAM_${res.status}`);
  return res.json();
}
