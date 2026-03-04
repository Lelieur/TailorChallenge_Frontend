import { getPasswordValidation } from "@/features/auth/utils/passwordValidation";
import type { ChangeEvent } from "react";

export default function SignUpFormPasswordFields({
  password,
  onChange,
}: {
  password: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}): React.ReactNode {
  const validation = getPasswordValidation(password);

  return (
    <fieldset className="mb-3">
      <label htmlFor="password" className="font-bold">
        Crea una contraseña nueva:
      </label>
      <input
        type="password"
        id="password"
        name="password"
        required
        minLength={8}
        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9\\s]).{8,}$"
        value={password}
        onChange={onChange}
        aria-invalid={!validation.isValid}
        aria-describedby={!validation.isValid ? "password-errors" : undefined}
        className="mt-2 block w-3/4 rounded-full border border-white bg-transparent px-3 py-1 placeholder:text-white placeholder:opacity-50 focus:outline-none sm:mt-0"
        placeholder="Añade una contraseña"
        autoComplete="new-password"
      />
      {password && !validation.isValid ? (
        <ul id="password-errors" className="mt-2 text-sm text-red-200" aria-live="polite">
          {validation.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      ) : null}
    </fieldset>
  );
}
