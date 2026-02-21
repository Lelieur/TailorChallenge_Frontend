import { redirect } from "next/navigation";
import HeroImage from "@/components/HeroImage/HeroImage";
import Logo from "@/assets/logo";
import { getSignupDraft } from "@/app/api/auth/signup/signupDraft";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import SignUpFormPassword from "@/components/AuthForms/SignUpForm/SignUpFormPassword";

function mapError(code?: string) {
  switch (code) {
    case "REQUIRED_PASSWORD":
      return "Escribe una contraseña.";
    case "INVALID_PASSWORD":
      return "Contraseña inválida (8+, mayúscula, minúscula, número y especial).";
    default:
      return "";
  }
}

export default async function SignupPasswordPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  const draft = await getSignupDraft();
  if (!draft) redirect("/signup?error=DRAFT_EXPIRED");

  const { error } = (await searchParams) ?? {};

  const errorText = mapError(error);

  return (
    <main className="h-full flex flex-col-reverse md:flex-row items-end justify-between">
      <div className="text-xs sm:text-base w-full md:w-1/2 bg-[var(--tailor-blue)] rounded-lg md:mr-7 p-4 text-white">
        <div className="mb-4 w-1/2 max-w-[194px]">
          <Logo />
        </div>

        <Link
          href="/signup"
          className="inline-flex px-6 py-2 my-5 rounded-2xl border border-white font-bold hover:bg-white hover:text-[var(--tailor-blue)] transition-all duration-300"
        >
          <ArrowLeftIcon className="w-5 h-5" aria-hidden="true" />
        </Link>

        {errorText && <p className="mb-4">{errorText}</p>}

        <SignUpFormPassword />
      </div>

      <HeroImage src="/images/login.jpeg" />
    </main>
  );
}
