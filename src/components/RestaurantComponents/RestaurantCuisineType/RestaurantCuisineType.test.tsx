import { render, screen } from "@testing-library/react";
import RestaurantCuisineType from "./RestaurantCuisineType";

describe("RestaurantCuisineType", () => {
  it("renders emoji for known cuisine type", () => {
    render(<RestaurantCuisineType cuisine_type="Asian" />);
    expect(screen.getByText("\u{1F371}")).toBeInTheDocument();
  });

  it("renders text fallback for unknown cuisine type", () => {
    render(<RestaurantCuisineType cuisine_type="Fusion" />);
    expect(screen.getByText("Fusion")).toBeInTheDocument();
  });
});
