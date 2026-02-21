export default function SignUpFormUserEmail(): React.ReactNode {
  return (
    <form action="/api/auth/signup/step1" method="post">
      <fieldset className="mb-3">
        <label htmlFor="email" className="font-bold">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="block w-3/4 rounded-full px-3 py-1 bg-transparent border border-white placeholder:text-white placeholder:opacity-50 focus:outline-none"
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
          className="block w-3/4 rounded-full px-3 py-1 bg-transparent border border-white placeholder:text-white placeholder:opacity-50 focus:outline-none"
          placeholder="Añade tu nombre"
        />
      </fieldset>

      <button
        className="px-6 py-2 rounded-2xl bg-white text-black font-bold hover:bg-black hover:text-white transition-all duration-300"
        type="submit"
      >
        Siguiente
      </button>
    </form>
  );
}
