import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddReviewForm from "./AddReviewForm";

const createReviewMock = vi.fn();
const refreshMock = vi.fn();

vi.mock("@/services/client/review", () => ({
  default: {
    createReview: (...args: unknown[]) => createReviewMock(...args),
  },
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: refreshMock,
  }),
}));

vi.mock("@/components/Stars/DynamicStars/DynamicStars", () => ({
  default: ({ setRating }: { setRating: (value: number) => void }) => (
    <button type="button" onClick={() => setRating(3)}>
      set-rating
    </button>
  ),
}));

describe("AddReviewForm", () => {
  beforeEach(() => {
    createReviewMock.mockResolvedValue({});
    refreshMock.mockReset();
  });

  it("submits a review and refreshes the route", async () => {
    const user = userEvent.setup();

    render(
      <AddReviewForm
        loggedUser={{ id: "u-1", username: "Lucas" }}
        restaurantId="restaurant-1"
      />,
    );

    await user.click(screen.getByRole("button", { name: /set-rating/i }));
    await user.type(
      screen.getByPlaceholderText(/Escribe tu comentario sobre el restaurante/i),
      "Buen sitio",
    );
    await user.click(screen.getByRole("button", { name: /enviar/i }));

    await waitFor(() => {
      expect(createReviewMock).toHaveBeenCalledWith(
        expect.objectContaining({
          rating: 3,
          comments: "Buen sitio",
          name: "Lucas",
          authorId: "u-1",
          restaurantId: "restaurant-1",
        }),
      );
      expect(refreshMock).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByPlaceholderText(/Escribe tu comentario sobre el restaurante/i)).toHaveValue(
      "",
    );
  });
});
