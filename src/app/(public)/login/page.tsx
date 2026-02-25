import HeroImage from "@/components/HeroImage/HeroImage";
import Logo from "@/assets/logo";
import LoginForm from "@/components/AuthForms/LoginForm/LoginForm";
import Link from "next/link";

export default function Signin(): React.ReactNode {
  return (
    <main className="flex h-full flex-col-reverse justify-between justify-center sm:items-end md:flex-row">
      <div className="w-full rounded-lg bg-[var(--tailor-blue)] p-4 text-xs text-white sm:text-base md:mr-7 md:w-1/2">
        <div className="mb-4 w-1/2 max-w-[194px]">
          <Logo />
        </div>

        <LoginForm />

        <p className="mt-4 text-xs">
          ¿No tienes una cuenta?{" "}
          <span className="underline">
            <Link href="/signup">Regístrate</Link>
          </span>
        </p>
      </div>

      <HeroImage src="/images/login.jpeg" />
    </main>
  );
}
