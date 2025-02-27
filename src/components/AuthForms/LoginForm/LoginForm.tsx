"use client";

import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import AuthServices from "@/services/auth.services";
import { AuthContext } from "@/context/auth.context";

export default function LoginForm() {
  const router = useRouter();
  const { authenticateUser } = useContext(AuthContext);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setLoginData({ ...loginData, [name]: value });

    if (
      name === "email" &&
      !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(value)
    ) {
      setErrorMessages((prev) => ({ ...prev, email: "Email no válido" }));
    } else {
      setErrorMessages((prev) => ({ ...prev, email: "" }));
    }

    if (name === "password" && value.length < 8) {
      setErrorMessages((prev) => ({
        ...prev,
        password: "La contraseña debe tener al menos 8 caracteres",
      }));
    } else if (
      name === "password" &&
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(value)
    ) {
      setErrorMessages((prev) => ({
        ...prev,
        password:
          "La contraseña debe tener al menos una mayúscula, una minúscula, un número y un caracter especial",
      }));
    } else {
      setErrorMessages((prev) => ({ ...prev, password: "" }));
    }
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    AuthServices.loginUser(loginData)
      .then(({ data }) => {
        const { authToken, userData } = data;

        localStorage.setItem("authToken", authToken);
        localStorage.setItem("userData", userData);

        authenticateUser();
      })
      .then(() => router.push("/restaurants"))
      .catch((err) => {
        console.log(err);
        if (err.response.data.message === "Unable to authenticate the user.") {
          alert("Datos de inicio de sesión incorrectos");
        } else if (err.response.data.message === "User not found") {
          alert("El usuario no se ha encontrado");
        }
      });
  };

  return (
    <form onSubmit={handleOnSubmit}>
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
        {errorMessages.email && (
          <p className="text-white-500">{errorMessages.email}</p>
        )}
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
          required
          pattern="^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$"
          onInvalid={(e: React.InvalidEvent<HTMLInputElement>) => {
            e.currentTarget.setCustomValidity(
              "La contraseña debe tener al menos 8 caracteres, un número y un caracter especial"
            );
          }}
          className="block w-3/4 rounded-full px-3 py-1 bg-transparent border border-white placeholder:text-white placeholder:opacity-50"
        />
        {errorMessages.password && (
          <p className="text-white-500">{errorMessages.password}</p>
        )}
      </fieldset>

      <button
        className="px-6 py-2 rounded-2xl bg-white text-black font-bold hover:bg-black hover:text-white transition-all duration-300"
        type="submit"
      >
        Entrar
      </button>
    </form>
  );
}
