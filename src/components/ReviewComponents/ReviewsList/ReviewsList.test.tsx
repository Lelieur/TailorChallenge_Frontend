import { render, screen } from "@testing-library/react";
import ReviewsList from "./ReviewsLists";

vi.mock("@/server/auth/session", () => ({
  getCurrentUserId: vi.fn(async () => "u-1"),
}));

vi.mock("../ReviewCard/ReviewCard", () => ({
  default: ({ review }: { review: { id: string } }) => (
    <div data-testid="review-card">{review.id}</div>
  ),
}));

describe("ReviewsList", () => {
  it("renders a card for each review", async () => {
    const ui = await ReviewsList({
      reviews: [
        { id: "1", authorId: "u-1", name: "A", date: "", comments: "", rating: 5, restaurantId: "x" },
        { id: "2", authorId: "u-2", name: "B", date: "", comments: "", rating: 4, restaurantId: "x" },
      ],
    });

    render(ui);

    expect(screen.getAllByTestId("review-card")).toHaveLength(2);
  });
});
