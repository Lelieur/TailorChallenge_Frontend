"use client";

import { useRef, useState } from "react";
import { signupClient } from "@/services/client/auth";
import SignUpFormPasswordFields from "./SignUpFormPasswordFields";
import SignUpFormUserEmailFields from "./SignUpFormUserEmailFields";
import BasicButton from "@/components/Buttons/BasicButton";
import BackButton from "@/components/Buttons/BackButton";
import { handleSubmitWithToast } from "@/lib/handleWithToast";
import { useRouter } from "next/navigation";

export default function SignUpForm(): React.ReactNode {
  const formRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();

  const [isStep1Complete, setIsStep1Complete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formDataValues, setFormDataValues] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormDataValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (!formRef.current?.reportValidity()) return;
    setIsStep1Complete(true);
  };

  return (
    <form
      ref={formRef}
      action="/api/auth/signup"
      method="post"
      onSubmit={(e) =>
        handleSubmitWithToast({
          event: e,
          apiCall: signupClient,
          navigate: router.push,
          success: "¡Cuenta creada exitosamente!",
          values: formDataValues,
          isSubmitting: setIsSubmitting,
        })
      }
    >
      {!isStep1Complete ? (
        <>
          <BackButton type="link" url="/login" />
          <SignUpFormUserEmailFields
            email={formDataValues.email}
            username={formDataValues.username}
            onChange={handleChange}
          />
          <BasicButton
            type="button"
            text="Siguiente"
            backgroundColor="white"
            noBorder
            action={handleNext}
          />
        </>
      ) : (
        <>
          <BackButton type="button" action={() => setIsStep1Complete(false)} />
          <SignUpFormPasswordFields password={formDataValues.password} onChange={handleChange} />
          <div className="flex gap-3">
            <BasicButton
              type="submit"
              text="Finalizar"
              backgroundColor="white"
              noBorder
              disabled={isSubmitting}
            />
          </div>
        </>
      )}
    </form>
  );
}
