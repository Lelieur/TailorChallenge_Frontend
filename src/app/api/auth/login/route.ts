import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, sessionCookieOptions } from "@/server/auth/session";

export async function POST(req: Request) {
  const form = await req.formData();
  const email = String(form.get("email") ?? "");
  const password = String(form.get("password") ?? "");

  const upstream = await fetch(`${process.env.API_URL}/api/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });

  const data = await upstream.json().catch(() => null);

  if (!upstream.ok) {
    return NextResponse.json(
      { message: data?.message ?? "Login failed" },
      { status: upstream.status || 500 },
    );
  }

  const authToken = data?.authToken;
  if (!authToken) {
    return NextResponse.json({ message: "Login failed" }, { status: 500 });
  }

  (await cookies()).set(SESSION_COOKIE, authToken, sessionCookieOptions);

  return NextResponse.json({ ok: true }, { status: 200 });
}
