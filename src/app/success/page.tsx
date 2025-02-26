import Link from "next/link";
import Icono from "@/assets/icono.svg";

export default function Success({ id }: { id: string }) {
  return (
    <div className="m-auto flex flex-col items-center justify-between h-1/4">
      <Icono />
      <p className="font-bold text-[var(--tailor-blue)]">
        Restaurante guardado
      </p>
      <Link href={`/restaurants/${id}`}>
        <button className="block w-full border border-black rounded-full px-4 py-2">
          Ver restaurante
        </button>
      </Link>
      <Icono />
    </div>
  );
}
