export default function SignUpFormUserEmail(): React.ReactNode {
  return (
    <form action="/api/auth/signup/step2" method="post">
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
          className="mt-2 sm:mt-0 block w-3/4 rounded-full px-3 py-1 bg-transparent border border-white placeholder:text-white placeholder:opacity-50"
          placeholder="Añade una contraseña"
          autoComplete="new-password"
        />
      </fieldset>

      <div className="flex gap-3">
        <a
          href="/signup"
          className="px-6 py-2 rounded-2xl border border-white font-bold hover:bg-white hover:text-[var(--tailor-blue)] transition-all duration-300"
        >
          Atrás
        </a>

        <button
          className="px-6 py-2 rounded-2xl bg-white text-black font-bold hover:bg-black hover:text-white transition-all duration-300"
          type="submit"
        >
          Finalizar
        </button>
      </div>
    </form>
  );
}
