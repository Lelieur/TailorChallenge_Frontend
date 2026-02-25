import { render, screen } from "@testing-library/react";
import Stars from "./Stars";

vi.mock("@/assets/star.svg", () => ({
  default: ({ className }: { className?: string }) => (
    <span data-testid="star-icon" className={className}>
      star
    </span>
  ),
}));

describe("Stars", () => {
  it("renders five icons based on average ratings", () => {
    render(<Stars ratings={[4, 5]} />);
    expect(screen.getAllByTestId("star-icon")).toHaveLength(5);
  });

  it("renders five icons when rating is provided", () => {
    render(<Stars rating={3} />);
    expect(screen.getAllByTestId("star-icon")).toHaveLength(5);
  });
});
