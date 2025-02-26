"use client";

import Link from "next/link";
import Icono from "@/assets/icono.svg";
import { AuthContext } from "@/context/auth.context";
import { useContext } from "react";

export default function NotFound() {
  const { loggedUser } = useContext(AuthContext);

  return (
    <div className="m-auto flex flex-col items-center justify-between h-1/4">
      <Icono />
      <p className="font-bold text-[var(--tailor-blue)]">Ups, algo salió mal</p>
      <Link href={`${loggedUser ? "/restaurants" : "/"}`}>
        <button className="block w-full border border-black rounded-full px-4 py-2">
          Volver
        </button>
      </Link>
      <Icono />
    </div>
  );
}
