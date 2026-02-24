import { render, screen } from "@testing-library/react";
import LoginForm from "./LoginForm";

describe("LoginForm", () => {
  it("renders required fields and submit button", () => {
    render(<LoginForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contrase/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
  });

  it("maps authentication error into user-facing message", () => {
    render(<LoginForm error="Unable to authenticate the user." />);

    expect(screen.getByText(/Datos de inicio de sesi/i)).toBeInTheDocument();
  });

  it("shows a generic message for unknown errors", () => {
    render(<LoginForm error="Some random backend error" />);

    expect(screen.getByText(/Error al iniciar sesi/i)).toBeInTheDocument();
  });
});
