import HeroImage from "@/components/HeroImage/HeroImage";
import Logo from "@/assets/logo.svg";
import SignUpForm from "@/components/AuthForms/SignUpForm/SignUpForm";

export default function SignUp(): React.ReactNode {
  return (
    <main className="h-full flex flex-col-reverse md:flex-row items-end justify-between p-7">
      <div className="w-full md:w-1/2 bg-[var(--tailor-blue)] rounded-lg md:mr-7 p-4 text-white">
        <Logo className="mb-4 w-1/2 max-w-[194px]" />
        <SignUpForm />
      </div>
      <HeroImage src="/images/login.jpeg" />
    </main>
  );
}
