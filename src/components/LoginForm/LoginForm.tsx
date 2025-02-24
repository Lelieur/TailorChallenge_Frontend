"use client";

import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import authServices from "@/services/auth.services";
import { AuthContext } from "@/context/auth.context";

export default function LoginForm() {
  const router = useRouter();
  const { authenticateUser } = useContext(AuthContext);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    authServices
      .loginUser(loginData)
      .then(({ data }) => {
        const { authToken, _id } = data;

        localStorage.setItem("authToken", authToken);
        localStorage.setItem("userId", _id);

        authenticateUser();
      })
      .then(() => router.push("/"))
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <>
        <Link href="/">
          <button className="px-6 py-2 my-5 rounded-2xl border border-white font-bold hover:bg-white hover:text-[var(--tailor-blue)] transition-all duration-300">
            {<ArrowLeftIcon className="w-5 h-5" />}
          </button>
        </Link>
        <fieldset className="mb-3">
          <label htmlFor="email" className="font-bold">
            Email:
          </label>

          <input
            type="email"
            id="email"
            name="email"
            value={loginData.email}
            onChange={handleOnChange}
            placeholder="Escribe tu email"
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            onInvalid={(e: React.InvalidEvent<HTMLInputElement>) => {
              e.currentTarget.setCustomValidity(
                "Por favor, introduce un email válido"
              );
            }}
            className="block w-3/4 rounded-full px-3 py-1 bg-transparent border border-white placeholder:text-white placeholder:opacity-50 focus:outline-none"
          />
        </fieldset>

        <fieldset className="mb-3">
          <label htmlFor="password" className="font-bold">
            Contraseña:
          </label>

          <input
            type="password"
            id="password"
            name="password"
            value={loginData.password}
            onChange={handleOnChange}
            placeholder="Escribe tu contraseña"
            className="block w-3/4 rounded-full px-3 py-1 bg-transparent border border-white placeholder:text-white placeholder:opacity-50"
          />
        </fieldset>

        <button
          className="px-6 py-2 rounded-2xl bg-white text-black font-bold hover:bg-black hover:text-white transition-all duration-300"
          type="submit"
        >
          Entrar
        </button>
      </>
    </form>
  );
}
