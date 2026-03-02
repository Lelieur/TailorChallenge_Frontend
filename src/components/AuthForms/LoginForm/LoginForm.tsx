"use client";

import BasicButton from "@/components/Buttons/BasicButton";
import { loginClient } from "@/services/client/auth";
import BackButton from "@/components/Buttons/BackButton";
import { useState } from "react";
import { handleSubmitWithToast } from "@/lib/handleWithToast";
import { useRouter } from "next/navigation";

export default function LoginForm(): React.ReactNode {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  return (
    <form
      method="post"
      onSubmit={(e) =>
        handleSubmitWithToast({
          event: e,
          apiCall: loginClient,
          navigate: router.push,
          success: "¡Bienvenido de nuevo!",
          isSubmitting: setIsSubmitting,
        })
      }
    >
      <BackButton type="link" url="/" />

      <fieldset className="mb-3">
        <label htmlFor="email" className="font-bold">
          Email:
        </label>

        <input
          type="email"
          id="email"
          name="email"
          placeholder="Escribe tu email"
          required
          autoComplete="email"
          className="mt-2 block w-3/4 rounded-full border border-white bg-transparent px-3 py-1 placeholder:text-white placeholder:opacity-50 focus:outline-none sm:mt-0"
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
          placeholder="Escribe tu contraseña"
          required
          autoComplete="current-password"
          minLength={8}
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$"
          title="Mínimo 8 caracteres, con mayúscula, minúscula, número y carácter especial"
          className="mt-2 block w-3/4 rounded-full border border-white bg-transparent px-3 py-1 placeholder:text-white placeholder:opacity-50 focus:outline-none sm:mt-0"
        />
      </fieldset>

      <BasicButton
        type="submit"
        text="Siguiente"
        backgroundColor="white"
        noBorder
        disabled={isSubmitting}
      />
    </form>
  );
}
