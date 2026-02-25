import Link from "next/link";
import HeroImage from "@/components/HeroImage/HeroImage";
import Logo from "@/assets/logo";
import BasicButton from "@/components/Buttons/BasicButton";

export default function Home() {
  return (
    <main className="flex h-full flex-col-reverse items-end justify-between md:flex-row">
      <div className="w-full rounded-lg bg-[var(--tailor-grey)] p-4 md:mr-7 md:w-1/2">
        <div className="mb-4 w-1/2 max-w-[194px]">
          <Logo />
        </div>
        <p>Hola,</p>
        <p>Bienvenido de nuevo a mi prueba para Tailor Hub (esto parece un dejá vu).</p>
        <p className="mb-10">
          A ver si esta vez sí que consigo convenceros de que soy la persona que estábais buscando
          ;)
        </p>
        <Link href="/login">
          <BasicButton
            type="button"
            text="Entrar"
            position="right"
            backgroundColor="[var(--tailor-grey)]"
          />
        </Link>
      </div>
      <HeroImage src="/images/home.jpeg" />
    </main>
  );
}
