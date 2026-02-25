export function mapLoginError(message?: string): string {
  switch (message) {
    case "All fields are required":
      return "Rellena email y contraseña.";
    case "User not found":
      return "El usuario no se ha encontrado.";
    case "Unable to authenticate the user.":
      return "Datos de inicio de sesión incorrectos.";
    default:
      return message ? "Error al iniciar sesión. Inténtalo de nuevo." : "";
  }
}

export function mapSignupError(message?: string): string {
  switch (message) {
    case "REQUIRED_STEP1":
      return "Rellena email y usuario.";
    case "INVALID_EMAIL":
      return "El email no es válido.";
    case "INVALID_USERNAME":
      return "El usuario debe tener al menos 3 caracteres (letras o números).";
    case "ALREADY_REGISTERED":
      return "Ese email ya está registrado.";
    case "DRAFT_EXPIRED":
      return "Tu sesión de registro ha caducado. Vuelve a empezar.";
    case "REQUIRED_PASSWORD":
      return "Escribe una contraseña.";
    case "INVALID_PASSWORD":
      return "Contraseña inválida (8+, mayúscula, minúscula, número y especial).";
    case "All fields are required":
      return "Rellena email, usuario y contraseña.";
    case "Password must contain at least one number and one special character and be at least 8 characters long":
      return "Contraseña inválida (mínimo 8, con número y carácter especial).";
    case "Please use a valid email address":
      return "El email no es válido.";
    case "User already registered":
      return "Ese email ya está registrado.";
    default:
      return message ? "Error al crear la cuenta. Inténtalo de nuevo." : "";
  }
}
