import { NextResponse } from "next/server";
import { getSignupDraft, clearSignupDraft } from "../signupDraft";

export async function POST(req: Request) {
  const draft = await getSignupDraft();
  if (!draft) {
    return NextResponse.redirect(
      new URL("/signup?error=DRAFT_EXPIRED", req.url),
      { status: 303 },
    );
  }

  const form = await req.formData();
  const password = String(form.get("password") ?? "");

  const upstream = await fetch(`${process.env.API_URL}/api/signup`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ...draft, password }),
    cache: "no-store",
  });

  const data = await upstream.json().catch(() => null);

  if (!upstream.ok) {
    // opcional: decide a qué step volver
    return NextResponse.redirect(
      new URL(
        `/signup?error=${encodeURIComponent(data?.message ?? "UNKNOWN")}`,
        req.url,
      ),
      {
        status: 303,
      },
    );
  }

  await clearSignupDraft();
  return NextResponse.redirect(new URL("/login?signup=1", req.url), {
    status: 303,
  });
}
