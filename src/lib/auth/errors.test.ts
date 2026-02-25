import { describe, expect, it } from "vitest";
import { mapLoginError, mapSignupError } from "./errors";

describe("mapLoginError", () => {
  it("maps known login messages", () => {
    expect(mapLoginError("All fields are required")).toMatch(/Rellena email/);
    expect(mapLoginError("User not found")).toMatch(/usuario/);
    expect(mapLoginError("Unable to authenticate the user.")).toMatch(/inicio de sesión/);
  });

  it("returns generic message for unknown errors", () => {
    expect(mapLoginError("Random")).toMatch(/Error al iniciar sesión/);
    expect(mapLoginError(undefined)).toBe("");
  });
});

describe("mapSignupError", () => {
  it("maps known signup messages", () => {
    expect(mapSignupError("All fields are required")).toMatch(/Rellena email/);
    expect(mapSignupError("User already registered")).toMatch(/registrado/);
    expect(mapSignupError("Please use a valid email address")).toMatch(/email/);
  });

  it("returns generic message for unknown errors", () => {
    expect(mapSignupError("Random")).toMatch(/Error al crear la cuenta/);
    expect(mapSignupError(undefined)).toBe("");
  });
});
