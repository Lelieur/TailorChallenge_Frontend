"use client";

import { ArrowDownIcon } from "@heroicons/react/16/solid";
import { useState, useEffect, useRef } from "react";

import Link from "next/link";
import { User } from "@/interfaces/User.interface";

export default function NavBar({
  loggedUser,
}: {
  loggedUser: User;
}): React.ReactNode {
  const ref = useRef<HTMLDivElement>(null);

  const [showMenu, setShowMenu] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showMenu]);

  useEffect(() => {
    setTimeout(() => {
      setIsTransitioning(!isTransitioning);
    }, 50);
  }, [showMenu]);

  return (
    <nav
      className={` w-full text-sm mb-3 relative ${
        loggedUser ? "block" : "hidden"
      }`}
    >
      <div
        className="w-fit ml-auto gap-2 hover:cursor-pointer"
        onClick={() => setShowMenu(!showMenu)}
      >
        <span className="text-lg mr-2">{`¡Hola, ${loggedUser?.username}! :\)`}</span>
        <span>
          <ArrowDownIcon
            className={`w-3 h-3 inline-block ${
              showMenu && "-rotate-180"
            } transition-transform duration-500`}
          />
        </span>
      </div>

      {showMenu && (
        <div
          className={`absolute z-10 right-0 top-full flex flex-col gap-5 bg-[var(--tailor-blue)] rounded-l-xl rounded-br-xl p-4 text-white text-lg transition-all duration-500 ease-in-out ${
            isTransitioning
              ? "-translate-y-2 opacity-0"
              : "translate-y-2 opacity-100"
          }`}
          ref={ref}
        >
          <div>
            <Link
              href={`/users/${loggedUser?.id}`}
              onClick={() => setShowMenu(false)}
            >
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
    </nav>
  );
}
