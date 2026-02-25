import type { ChangeEvent } from "react";

export default function SignUpFormPasswordFields({
  password,
  onChange,
}: {
  password: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}): React.ReactNode {
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
        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$"
        value={password}
        onChange={onChange}
        className="mt-2 block w-3/4 rounded-full border border-white bg-transparent px-3 py-1 placeholder:text-white placeholder:opacity-50 focus:outline-none sm:mt-0"
        placeholder="Añade una contraseña"
        autoComplete="new-password"
      />
    </fieldset>
  );
}
