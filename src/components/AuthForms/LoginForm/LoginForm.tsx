"use client";

import BasicButton from "@/components/Buttons/BasicButton";
import { loginClient } from "@/services/client/auth";
import BackButton from "@/components/Buttons/BackButton";
import { useRef, useState } from "react";
import { handleSubmitWithToast } from "@/lib/handleWithToast";
import { useRouter } from "next/navigation";
import { getPasswordValidation } from "@/features/auth/utils/passwordValidation";

export default function LoginForm(): React.ReactNode {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formDataValues, setFormDataValues] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormDataValues((prev) => ({ ...prev, [name]: value }));
  };
  const router = useRouter();
  const validation = getPasswordValidation(formDataValues.password);

  return (
    <form
      method="post"
      onSubmit={(e) =>
        validation.isValid
          ? handleSubmitWithToast({
              event: e,
              apiCall: loginClient,
              navigate: router.push,
              values: formDataValues,
              success: "¡Bienvenido de nuevo!",
              isSubmitting: setIsSubmitting,
            })
          : formRef.current?.reportValidity()
      }
    >
      <BackButton type="link" url="/" />

      <fieldset className="mb-3">
        <label htmlFor="email" className="font-bold">
          Email:
        </label>

        <input
          onChange={handleChange}
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
          onChange={handleChange}
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

      {formDataValues.password && !validation.isValid ? (
        <ul id="password-errors" className="mt-2 text-sm text-red-200" aria-live="polite">
          {validation.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      ) : null}

      <BasicButton
        type="submit"
        text="Siguiente"
        backgroundColor="white"
        noBorder
        disabled={isSubmitting || !validation.isValid}
      />
    </form>
  );
}
