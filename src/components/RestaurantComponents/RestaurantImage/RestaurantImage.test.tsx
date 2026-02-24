import { fireEvent, render, screen } from "@testing-library/react";
import RestaurantImage from "./RestaurantImage";

describe("RestaurantImage", () => {
  it("falls back to default image on error", () => {
    render(<RestaurantImage src="/broken.jpg" />);

    const image = screen.getByAltText("Restaurant image") as HTMLImageElement;
    fireEvent.error(image);

    expect(image.src).toContain("/images/home.jpeg");
  });
});
