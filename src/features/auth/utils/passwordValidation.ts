type PasswordValidation = {
  errors: string[];
  isValid: boolean;
};

export function getPasswordValidation(password: string): PasswordValidation {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Debe tener mínimo una longitud de 8 caracteres.");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Debe incluir una minúscula.");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Debe incluir una mayúscula.");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Debe incluir un número.");
  }
  if (!/[^A-Za-z0-9\\s]/.test(password)) {
    errors.push("Debe incluir un caracter especial.");
  }

  return { errors, isValid: errors.length === 0 };
}
