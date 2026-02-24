import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NavBar from "./NavBar";

describe("NavBar", () => {
  it("opens menu and renders navigation links", async () => {
    const user = userEvent.setup();

    render(<NavBar loggedUser={{ id: "u-1", username: "Lucas" }} />);

    await user.click(screen.getByText(/Lucas/i));

    expect(screen.getByText("Mi cuenta")).toBeInTheDocument();
    expect(screen.getByText("Restaurantes")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Salir" })).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Mi cuenta" })).toHaveAttribute(
      "href",
      "/users/u-1",
    );
  });

  it("closes menu when clicking outside", async () => {
    const user = userEvent.setup();

    render(<NavBar loggedUser={{ id: "u-1", username: "Lucas" }} />);

    await user.click(screen.getByText(/Lucas/i));
    expect(screen.getByText("Mi cuenta")).toBeInTheDocument();

    fireEvent.click(document.body);
    expect(screen.queryByText("Mi cuenta")).not.toBeInTheDocument();
  });
});
