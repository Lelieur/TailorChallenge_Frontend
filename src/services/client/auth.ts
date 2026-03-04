import { mapLoginError, mapSignupError } from "@/lib/auth/errors";

type LoginResponse = { ok?: boolean; message?: string };
type SignupResponse = { ok?: boolean; message?: string };

export async function loginClient(formData: FormData): Promise<string> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    body: formData,
  });

  const data = (await res.json().catch(() => ({}))) as LoginResponse;

  if (!res.ok) {
    const message = data.message
      ? mapLoginError(data.message)
      : "Error al iniciar sesión. Inténtalo de nuevo.";
    throw new Error(message);
  }

  if (data.ok) return "/restaurants";

  throw new Error("Error al iniciar sesión. Inténtalo de nuevo.");
}

export async function signupClient(formData: FormData): Promise<string> {
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    body: formData,
  });

  const data = (await res.json().catch(() => ({}))) as SignupResponse;

  if (!res.ok) {
    const message = data.message
      ? mapSignupError(data.message)
      : "Error al crear la cuenta. Inténtalo de nuevo.";
    throw new Error(message);
  }

  if (data.ok) return "/restaurants";

  throw new Error("Error al crear la cuenta. Inténtalo de nuevo.");
}
