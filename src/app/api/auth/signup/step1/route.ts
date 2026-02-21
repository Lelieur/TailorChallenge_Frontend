import { NextResponse } from "next/server";
import { setSignupDraft } from "../signupDraft";

export async function POST(req: Request) {
  const form = await req.formData();
  const email = String(form.get("email") ?? "")
    .trim()
    .toLowerCase();
  const username = String(form.get("username") ?? "").trim();

  if (!email || !username) {
    return NextResponse.redirect(
      new URL("/signup?error=REQUIRED_STEP1", req.url),
      { status: 303 },
    );
  }

  await setSignupDraft({ email, username });

  return NextResponse.redirect(new URL("/signup/password", req.url), {
    status: 303,
  });
}
