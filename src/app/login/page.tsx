import HeroImage from "@/components/HeroImage/HeroImage";
import Logo from "@/assets/logo";
import LoginForm from "@/components/AuthForms/LoginForm/LoginForm";
import Link from "next/link";
export default function Signin(): React.ReactNode {
  return (
    <main className="h-full flex flex-col-reverse md:flex-row items-end justify-between p-7">
      <div className="w-full md:w-1/2 bg-[var(--tailor-blue)] rounded-lg md:mr-7 p-4 text-white">
        <div className="mb-4 w-1/2 max-w-[194px]">
          <Logo />
        </div>
        <LoginForm />
        <p className="mt-4 text-xs">
          ¿No tienes una cuenta?{" "}
          <span className="underline">
            {" "}
            <Link href="/signup">Regístrate</Link>
          </span>
        </p>
      </div>
      <HeroImage src="/images/login.jpeg" />
    </main>
  );
}
