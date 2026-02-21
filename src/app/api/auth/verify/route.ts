import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/server/auth/session";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return NextResponse.json({ loggedUserData: null }, { status: 401 });
  }

  const upstream = await fetch(`${process.env.API_URL}/api/verify`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  const data = await upstream.json().catch(() => null);

  if (!upstream.ok) {
    cookieStore.delete(SESSION_COOKIE);
    return NextResponse.json({ loggedUserData: null }, { status: 401 });
  }

  return NextResponse.json(data, { status: 200 });
}
