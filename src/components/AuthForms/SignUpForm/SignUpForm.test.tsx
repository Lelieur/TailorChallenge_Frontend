import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignUpForm from "./SignUpForm";

const handleSubmitWithToastMock = vi.fn();

vi.mock("@/lib/handleWithToast", () => ({
  handleSubmitWithToast: (...args: unknown[]) => handleSubmitWithToastMock(...args),
}));

vi.mock("@/services/client/auth", () => ({
  signupClient: vi.fn(),
}));

describe("SignUpForm", () => {
  beforeEach(() => {
    handleSubmitWithToastMock.mockClear();
  });

  it("persists step1 values when navigating back", async () => {
    const user = userEvent.setup();
    const { container } = render(<SignUpForm />);

    const email = screen.getByLabelText(/email/i) as HTMLInputElement;
    const username = screen.getByLabelText(/nombre de usuario/i) as HTMLInputElement;

    await user.type(email, "user@example.com");
    await user.type(username, "lucas");
    await user.click(screen.getByRole("button", { name: /siguiente/i }));

    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();

    const backButton = container.querySelector("button[type='button']");
    expect(backButton).toBeTruthy();
    await user.click(backButton!);

    expect((screen.getByLabelText(/email/i) as HTMLInputElement).value).toBe(
      "user@example.com",
    );
    expect((screen.getByLabelText(/nombre de usuario/i) as HTMLInputElement).value).toBe(
      "lucas",
    );
  });

  it("submits with handleSubmitWithToast", async () => {
    const user = userEvent.setup();
    render(<SignUpForm />);

    await user.type(screen.getByLabelText(/email/i), "user@example.com");
    await user.type(screen.getByLabelText(/nombre de usuario/i), "lucas");
    await user.click(screen.getByRole("button", { name: /siguiente/i }));
    await user.type(screen.getByLabelText(/contraseña/i), "Password1!");
    await user.click(screen.getByRole("button", { name: /finalizar/i }));

    expect(handleSubmitWithToastMock).toHaveBeenCalledTimes(1);
  });
});
