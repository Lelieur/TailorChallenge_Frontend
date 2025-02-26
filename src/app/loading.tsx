import Logo from "@/assets/logo.svg";

export default function Loading() {
  return (
    <main className="h-full bg-[var(--tailor-grey)] rounded-xl flex flex-col-reverse md:flex-row items-center justify-center">
      <Logo className="w-1/6" />
    </main>
  );
}
