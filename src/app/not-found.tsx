import Link from "next/link";
import Icono from "@/assets/icono.svg";

import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/server/auth/session";

export default async function NotFound() {
  const cookieStore = await cookies();
  const hasSession = Boolean(cookieStore.get(SESSION_COOKIE)?.value);
  const href = hasSession ? "/restaurants" : "/";

  return (
    <div className="m-auto flex flex-col items-center justify-between h-1/4">
      <Icono />
      <p className="font-bold text-[var(--tailor-blue)]">Ups, algo salió mal</p>
      <Link href={href}>
        <button className="block w-full border border-black rounded-full px-4 py-2">
          Volver
        </button>
      </Link>
      <Icono />
    </div>
  );
}
