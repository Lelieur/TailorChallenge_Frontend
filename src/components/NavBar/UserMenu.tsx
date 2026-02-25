"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowDownIcon } from "@heroicons/react/16/solid";
import { User } from "@/interfaces/User.interface";

export default function UserMenu({ loggedUser }: { loggedUser: User }) {
  const ref = useRef<HTMLDivElement>(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  return (
    <div className="w-fit ml-auto gap-2" ref={ref}>
      <button
        type="button"
        onClick={() => setShowMenu((prev) => !prev)}
        aria-expanded={showMenu}
        aria-controls="user-menu"
        className="hover:cursor-pointer"
      >
        <span className="text-lg mr-2">{`¡Hola, ${loggedUser?.username}! :)`}</span>
        <span>
          <ArrowDownIcon
            className={`w-3 h-3 inline-block ${
              showMenu ? "-rotate-180" : ""
            } transition-transform duration-500`}
          />
        </span>
      </button>

      {showMenu && (
        <div
          id="user-menu"
          className={`absolute z-10 right-0 top-full flex flex-col gap-5 bg-[var(--tailor-blue)] rounded-l-xl rounded-br-xl p-4 text-white text-lg transition-all duration-300 ease-in-out ${
            showMenu ? "translate-y-2 opacity-100" : "-translate-y-2 opacity-0"
          }`}
        >
          <div>
            <Link href={`/users/${loggedUser?.id}`} onClick={() => setShowMenu(false)}>
              <p className="m-0">Mi cuenta</p>
            </Link>
            <Link href="/create-restaurant" onClick={() => setShowMenu(false)}>
              <p className="m-0">Añadir restaurante</p>
            </Link>
          </div>
          <hr />
          <Link href="/restaurants" onClick={() => setShowMenu(false)}>
            <p className="m-0">Restaurantes</p>
          </Link>
          <form action="/api/auth/logout" method="post">
            <button
              type="submit"
              className="bg-white text-black font-bold px-4 py-2 rounded-full w-full"
            >
              Salir
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
