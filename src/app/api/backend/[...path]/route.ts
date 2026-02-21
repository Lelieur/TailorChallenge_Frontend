import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/server/auth/session";

type Ctx = { params: Promise<{ path: string[] }> };

async function proxy(req: Request, ctx: Ctx) {
  const { path } = await ctx.params;

  const url = new URL(req.url);
  const target = new URL(`${process.env.API_URL}/api/${path.join("/")}`);
  target.search = url.search;

  const token = (await cookies()).get(SESSION_COOKIE)?.value;

  const headers = new Headers(req.headers);
  headers.delete("host");
  if (token) headers.set("authorization", `Bearer ${token}`);

  const method = req.method.toUpperCase();
  const body =
    method === "GET" || method === "HEAD" ? undefined : await req.arrayBuffer();

  const upstream = await fetch(target.toString(), {
    method,
    headers,
    body,
    cache: "no-store",
  });

  if (upstream.status === 401) {
    (await cookies()).delete(SESSION_COOKIE);
  }

  return new Response(upstream.body, {
    status: upstream.status,
    headers: upstream.headers,
  });
}

export async function GET(req: Request, ctx: Ctx) {
  return proxy(req, ctx);
}
export async function POST(req: Request, ctx: Ctx) {
  return proxy(req, ctx);
}
export async function PUT(req: Request, ctx: Ctx) {
  return proxy(req, ctx);
}
export async function PATCH(req: Request, ctx: Ctx) {
  return proxy(req, ctx);
}
export async function DELETE(req: Request, ctx: Ctx) {
  return proxy(req, ctx);
}
