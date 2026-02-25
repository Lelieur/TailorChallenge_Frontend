import { render, screen } from "@testing-library/react";
import RestaurantsList from "./RestaurantsList";

vi.mock("@/components/RestaurantComponents/RestaurantCard/RestaurantCard", () => ({
  default: ({ data }: { data: { name: string } }) => (
    <div data-testid="restaurant-card">{data.name}</div>
  ),
}));

describe("RestaurantsList", () => {
  it("renders a card for each restaurant", () => {
    render(
      <RestaurantsList
        restaurants={[
          { id: "1", name: "A" } as any,
          { id: "2", name: "B" } as any,
        ]}
      />,
    );

    expect(screen.getAllByTestId("restaurant-card")).toHaveLength(2);
  });
});
