import Link from "next/link";
import HeroImage from "@/components/HeroImage/HeroImage";
import Logo from "@/assets/logo";

export default function Home() {
  return (
    <main className="h-full flex flex-col-reverse md:flex-row items-end justify-between">
      <div className="w-full md:w-1/2 bg-[var(--tailor-grey)] rounded-lg md:mr-7 p-4">
        <div className="mb-4 w-1/2 max-w-[194px]">
          <Logo />
        </div>
        <p>Hola,</p>
        <p className="mb-10">
          Bienvenido a mi prueba para Tailor hub. Aquí podréis ver mis
          restaurantes favoritos a los que podríais llevarme en el onboarding.
        </p>
        <Link href="/login">
          <button className="px-6 py-2 rounded-2xl border border-black font-bold hover:bg-black hover:text-white transition-all duration-300">
            Entrar
          </button>
        </Link>
      </div>
      <HeroImage src="/images/home.jpeg" />
    </main>
  );
}
