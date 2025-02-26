"use client";

import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

import { useState } from "react";
import { useRouter } from "next/navigation";
import authServices from "@/services/auth.services";

export default function SignUpForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });

    if (
      name === "email" &&
      !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(value)
    ) {
      setErrorMessages((prev) => ({ ...prev, email: "Email no válido" }));
    } else {
      setErrorMessages((prev) => ({ ...prev, email: "" }));
    }

    if (name === "username" && value.length < 3) {
      setErrorMessages((prev) => ({
        ...prev,
        username: "El nombre de usuario debe tener al menos 3 caracteres",
      }));
    } else {
      setErrorMessages((prev) => ({ ...prev, username: "" }));
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

    authServices
      .signupUser(formData)
      .then(() => {
        router.push("/login");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.message === "User already registered") {
          alert(error.response.data.message);
        }
      });
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {currentStep === 1 && (
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
              value={formData.email}
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
              <p className="text-white">{errorMessages.email}</p>
            )}
          </fieldset>

          <fieldset className="mb-3">
            <label htmlFor="username" className="font-bold">
              Nombre de usuario:
            </label>

            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleOnChange}
              placeholder="Añade tu nombre"
              pattern="[a-zA-Z0-9]{3,}"
              className="block w-3/4 rounded-full px-3 py-1 bg-transparent border border-white placeholder:text-white placeholder:opacity-50 focus:outline-none"
            />
            {errorMessages.username && (
              <p className="text-white">{errorMessages.username}</p>
            )}
          </fieldset>

          <button
            className="px-6 py-2 rounded-2xl bg-white text-black font-bold hover:bg-black hover:text-white transition-all duration-300"
            onClick={() => setCurrentStep(2)}
          >
            Siguiente
          </button>
        </>
      )}
      {currentStep === 2 && (
        <>
          <button
            className="px-6 py-2 my-5 rounded-2xl border border-white font-bold hover:bg-white hover:text-[var(--tailor-blue)] transition-all duration-300"
            onClick={() => setCurrentStep(1)}
          >
            {<ArrowLeftIcon className="w-5 h-5" />}
          </button>
          <fieldset className="mb-3">
            <label htmlFor="password" className="font-bold">
              Crea una contraseña nueva:
            </label>

            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleOnChange}
              placeholder="Añade una contraseña"
              pattern="^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$"
              className="block w-3/4 rounded-full px-3 py-1 bg-transparent border border-white placeholder:text-white placeholder:opacity-50"
            />
            {errorMessages.password && (
              <p className="text-white">{errorMessages.password}</p>
            )}
          </fieldset>

          <button
            className="px-6 py-2 rounded-2xl bg-white text-black font-bold hover:bg-black hover:text-white transition-all duration-300"
            type="submit"
          >
            Finalizar
          </button>
        </>
      )}
    </form>
  );
}
