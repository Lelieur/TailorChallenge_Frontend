import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, sessionCookieOptions } from "@/server/auth/session";

export async function POST(req: Request) {
  const credentials = await req.json();

  const upstream = await fetch(`${process.env.API_URL}/api/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(credentials),
    cache: "no-store",
  });

  const data = await upstream.json().catch(() => null);

  if (!upstream.ok) {
    return NextResponse.json(
      { message: data?.message ?? "Login failed" },
      { status: upstream.status },
    );
  }

  const { authToken, userData } = data;

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, authToken, sessionCookieOptions);

  return NextResponse.json({ userData }, { status: 200 });
}
