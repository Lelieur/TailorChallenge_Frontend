import { render, screen } from "@testing-library/react";
import RestaurantCard from "./RestaurantCard";

vi.mock("../../Stars/Stars", () => ({
  default: () => <div>stars-mock</div>,
}));

vi.mock("../RestaurantImage/RestaurantImage", () => ({
  default: () => <div>restaurant-image-mock</div>,
}));

vi.mock("../RestaurantCuisineType/RestaurantCuisineType", () => ({
  default: ({ cuisine_type }: { cuisine_type: string }) => <div>{cuisine_type}</div>,
}));

vi.mock("../RestaurantOperatingHours/RestaurantOperatingHours", () => ({
  default: () => <div>operating-hours-mock</div>,
}));

describe("RestaurantCard", () => {
  it("renders restaurant information and navigation link", () => {
    render(
      <RestaurantCard
        data={{
          id: "r-123",
          name: "Tailor Kitchen",
          address: "123 Main St",
          neighborhood: "Downtown",
          cuisine_type: "Italian",
          image: "/img.jpg",
          operating_hours: {
            Monday: "9-17",
            Tuesday: "9-17",
            Wednesday: "9-17",
            Thursday: "9-17",
            Friday: "9-17",
            Saturday: "9-17",
            Sunday: "9-17",
          },
          reviews: [{ rating: 4 }, { rating: 5 }] as unknown as [],
        }}
      />,
    );

    expect(screen.getByRole("link")).toHaveAttribute("href", "/restaurants/r-123");
    expect(screen.getByText("Tailor Kitchen")).toBeInTheDocument();
    expect(screen.getByText(/Neighborhood:/i)).toBeInTheDocument();
    expect(screen.getByText(/Address:/i)).toBeInTheDocument();
    expect(screen.getByText("(2 comentarios)")).toBeInTheDocument();
  });
});
