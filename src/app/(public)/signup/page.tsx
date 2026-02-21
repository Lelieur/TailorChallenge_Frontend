import HeroImage from "@/components/HeroImage/HeroImage";
import Logo from "@/assets/logo";
import Link from "next/link";
import SignUpFormUserEmail from "@/components/AuthForms/SignUpForm/SignUpFormUserEmail";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

function mapError(code?: string) {
  switch (code) {
    case "REQUIRED_STEP1":
      return "Rellena email y usuario.";
    case "INVALID_EMAIL":
      return "El email no es válido.";
    case "INVALID_USERNAME":
      return "El usuario debe tener al menos 3 caracteres (letras o números).";
    case "ALREADY_REGISTERED":
      return "Ese email ya está registrado.";
    case "DRAFT_EXPIRED":
      return "Tu sesión de registro ha caducado. Vuelve a empezar.";
    default:
      return "";
  }
}

export default async function SignUp({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string | undefined }>;
}): Promise<React.ReactNode> {
  const { error } = (await searchParams) ?? {};
  const errorText = mapError(error);

  return (
    <main className="h-full flex flex-col-reverse md:flex-row items-end justify-between">
      <div className="text-xs sm:text-base w-full md:w-1/2 bg-[var(--tailor-blue)] rounded-lg md:mr-7 p-4 text-white">
        <div className="mb-4 w-1/2 max-w-[194px]">
          <Logo />
        </div>

        {errorText && <p className="mb-4">{errorText}</p>}

        <Link
          href="/"
          className="inline-flex px-6 py-2 my-5 rounded-2xl border border-white font-bold hover:bg-white hover:text-[var(--tailor-blue)] transition-all duration-300"
        >
          <ArrowLeftIcon className="w-5 h-5" aria-hidden="true" />
        </Link>

        <SignUpFormUserEmail />
      </div>

      <HeroImage src="/images/login.jpeg" />
    </main>
  );
}
