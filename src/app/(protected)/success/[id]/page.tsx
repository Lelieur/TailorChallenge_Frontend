import Link from "next/link";
import Icono from "@/assets/icono.svg";
import BasicButton from "@/components/Buttons/BasicButton";

export default async function Success({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<React.ReactNode> {
  const { id } = await params;
  return (
    <div className="m-auto flex h-1/4 flex-col items-center justify-between">
      <Icono />
      <p className="font-bold text-[var(--tailor-blue)]">Restaurante guardado</p>
      <Link href={`/restaurants/${id}`}>
        <BasicButton type="button" text="Ver restaurante" backgroundColor="white" />
      </Link>
      <Icono />
    </div>
  );
}
