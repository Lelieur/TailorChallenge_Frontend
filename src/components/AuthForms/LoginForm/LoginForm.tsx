import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

function mapError(error: string) {
  if (!error) return "";
  if (error === "Unable to authenticate the user.")
    return "Datos de inicio de sesión incorrectos";
  if (error === "User not found") return "El usuario no se ha encontrado";
  if (error === "All fields are required") return "Rellena email y contraseña";
  return "Error al iniciar sesión";
}

export default function LoginForm({
  error,
}: {
  error?: string;
}): React.ReactNode {
  const errorText = mapError(error ?? "");

  return (
    <form action="/api/auth/login" method="post">
      <Link
        href="/"
        className="inline-flex px-6 py-2 my-5 rounded-2xl border border-white font-bold hover:bg-white hover:text-[var(--tailor-blue)] transition-all duration-300"
      >
        <ArrowLeftIcon className="w-5 h-5" />
      </Link>

      {errorText && <p className="mb-4">{errorText}</p>}

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
          className="mt-2 sm:mt-0 block w-3/4 rounded-full px-3 py-1 bg-transparent border border-white placeholder:text-white placeholder:opacity-50 focus:outline-none"
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
          className="mt-2 sm:mt-0 block w-3/4 rounded-full px-3 py-1 bg-transparent border border-white placeholder:text-white placeholder:opacity-50"
        />
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
