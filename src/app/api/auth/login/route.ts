import { cookies } from "next/headers";
import { redirect } from "next/navigation";
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
    const message = encodeURIComponent(data?.message ?? "Login failed");
    redirect(`/login?error=${message}`);
  }

  const authToken = data?.authToken;
  if (!authToken)
    redirect(`/login?error=${encodeURIComponent("Login failed")}`);

  (await cookies()).set(SESSION_COOKIE, authToken, sessionCookieOptions);

  redirect("/restaurants");
}
