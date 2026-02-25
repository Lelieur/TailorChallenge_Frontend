import type { ChangeEvent } from "react";

export default function SignUpFormUserEmailFields({
  email,
  username,
  onChange,
}: {
  email: string;
  username: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}): React.ReactNode {
  return (
    <>
      <fieldset className="mb-3">
        <label htmlFor="email" className="font-bold">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={email}
          onChange={onChange}
          className="block w-3/4 rounded-full border border-white bg-transparent px-3 py-1 placeholder:text-white placeholder:opacity-50 focus:outline-none"
          placeholder="Escribe tu email"
        />
      </fieldset>

      <fieldset className="mb-3">
        <label htmlFor="username" className="font-bold">
          Nombre de usuario:
        </label>
        <input
          type="text"
          id="username"
          name="username"
          required
          minLength={3}
          pattern="[a-zA-Z0-9]{3,}"
          value={username}
          onChange={onChange}
          className="block w-3/4 rounded-full border border-white bg-transparent px-3 py-1 placeholder:text-white placeholder:opacity-50 focus:outline-none"
          placeholder="Añade tu nombre"
        />
      </fieldset>
    </>
  );
}
