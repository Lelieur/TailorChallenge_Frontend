import { render, screen } from "@testing-library/react";
import HeroImage from "./HeroImage";

describe("HeroImage", () => {
  it("renders image with alt text", () => {
    render(<HeroImage src="/images/test.jpg" />);
    expect(
      screen.getByAltText(/Interior of a modern, dimly lit restaurant/i),
    ).toBeInTheDocument();
  });
});
