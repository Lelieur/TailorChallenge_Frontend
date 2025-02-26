import Logo from "@/assets/logo";

export default function Loading() {
  return (
    <main className="h-full bg-[var(--tailor-grey)] rounded-xl flex flex-col-reverse md:flex-row items-center justify-center">
      <div className="w-1/6">
        <Logo />
      </div>
    </main>
  );
}
