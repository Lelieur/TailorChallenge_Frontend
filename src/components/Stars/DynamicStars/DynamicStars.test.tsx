import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DynamicStars from "./DynamicStars";

describe("DynamicStars", () => {
  it("renders five buttons and calls setRating", async () => {
    const user = userEvent.setup();
    const setRating = vi.fn();

    render(<DynamicStars rating={2} setRating={setRating} isEditEnabled={true} />);

    const buttons = screen.getAllByRole("button", { name: /Puntuar/i });
    expect(buttons).toHaveLength(5);

    await user.click(buttons[3]);
    expect(setRating).toHaveBeenCalledWith(4);
  });

  it("disables buttons when not editable", () => {
    render(<DynamicStars rating={2} setRating={() => {}} isEditEnabled={false} />);
    const buttons = screen.getAllByRole("button", { name: /Puntuar/i });
    buttons.forEach((btn) => expect(btn).toBeDisabled());
  });
});
