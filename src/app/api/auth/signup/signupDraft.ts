import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const COOKIE = "signup_draft";
const MAX_AGE_SECONDS = 10 * 60;

const secret = new TextEncoder().encode(process.env.SIGNUP_DRAFT_SECRET);

export async function setSignupDraft(draft: {
  email: string;
  username: string;
}) {
  const token = await new SignJWT(draft)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE_SECONDS}s`)
    .sign(secret);

  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: MAX_AGE_SECONDS,
    path: "/",
  });
}

export async function getSignupDraft(): Promise<{
  email: string;
  username: string;
} | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret);
    const email = String(payload.email ?? "");
    const username = String(payload.username ?? "");
    if (!email || !username) return null;
    return { email, username };
  } catch {
    return null;
  }
}

export async function clearSignupDraft() {
  (await cookies()).delete(COOKIE);
}
