import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const form = await req.formData();
  const email = String(form.get("email") ?? "");
  const username = String(form.get("username") ?? "");
  const password = String(form.get("password") ?? "");

  const upstream = await fetch(`${process.env.API_URL}/api/signup`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, username, password }),
    cache: "no-store",
  });

  const data = await upstream.json().catch(() => null);

  if (!upstream.ok) {
    return NextResponse.json(
      { message: data?.message ?? "Signup failed" },
      { status: upstream.status || 500 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
