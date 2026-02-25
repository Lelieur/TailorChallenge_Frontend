import { render, screen } from "@testing-library/react";
import RestaurantImage from "./RestaurantImage";

describe("RestaurantImage", () => {
  it("renders provided image src", () => {
    render(<RestaurantImage src="/broken.jpg" />);

    const image = screen.getByAltText("Restaurant image") as HTMLImageElement;
    expect(image.src).toContain("/broken.jpg");
  });
});
