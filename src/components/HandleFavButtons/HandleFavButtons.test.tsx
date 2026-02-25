import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HandleFavButtons from "./HandleFavButtons";

const addFavoriteRestaurantMock = vi.fn();
const removeFavoriteRestaurantMock = vi.fn();

vi.mock("@/services/client/user", () => ({
  default: {
    addFavoriteRestaurant: (...args: unknown[]) => addFavoriteRestaurantMock(...args),
    removeFavoriteRestaurant: (...args: unknown[]) => removeFavoriteRestaurantMock(...args),
  },
}));

describe("HandleFavButtons", () => {
  let consoleLogSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);
    addFavoriteRestaurantMock.mockResolvedValue({});
    removeFavoriteRestaurantMock.mockResolvedValue({});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it("calls add favorite service", async () => {
    const user = userEvent.setup();

    render(
      <HandleFavButtons
        restaurantId="rest-1"
        loggedUser={{ id: "u-1", username: "Lucas", favoriteRestaurants: [] }}
      />,
    );

    const [addButton] = screen.getAllByRole("button");
    await user.click(addButton);

    await waitFor(() => {
      expect(addFavoriteRestaurantMock).toHaveBeenCalledWith("rest-1", {
        id: "u-1",
        username: "Lucas",
        favoriteRestaurants: [],
      });
    });
  });

  it("calls remove favorite service", async () => {
    const user = userEvent.setup();

    render(
      <HandleFavButtons
        restaurantId="rest-1"
        loggedUser={{
          id: "u-1",
          username: "Lucas",
          favoriteRestaurants: ["rest-1"],
        }}
      />,
    );

    const [, removeButton] = screen.getAllByRole("button");
    await user.click(removeButton);

    await waitFor(() => {
      expect(removeFavoriteRestaurantMock).toHaveBeenCalledWith("rest-1", {
        id: "u-1",
        username: "Lucas",
        favoriteRestaurants: ["rest-1"],
      });
    });
  });
});
