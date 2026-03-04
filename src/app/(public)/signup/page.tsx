import HeroImage from "@/components/HeroImage/HeroImage";
import Logo from "@/assets/logo";
import SignUpForm from "@/components/AuthForms/SignUpForm/SignUpForm";

export default async function SignUp(): Promise<React.ReactNode> {
  return (
    <main className="flex h-full flex-col-reverse items-end justify-between md:flex-row">
      <div className="w-full rounded-lg bg-[var(--tailor-blue)] p-4 text-xs text-white sm:text-base md:mr-7 md:w-1/2">
        <div className="mb-4 w-1/2 max-w-[194px]">
          <Logo />
        </div>

        <SignUpForm />
      </div>

      <HeroImage src="/images/signup.jpg" />
    </main>
  );
}
