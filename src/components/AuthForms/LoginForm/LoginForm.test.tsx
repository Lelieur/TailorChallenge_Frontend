import { render, screen } from "@testing-library/react";
import LoginForm from "./LoginForm";

describe("LoginForm", () => {
  it("renders required fields and submit button", () => {
    render(<LoginForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contrase/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /siguiente/i })).toBeInTheDocument();
  });
});
