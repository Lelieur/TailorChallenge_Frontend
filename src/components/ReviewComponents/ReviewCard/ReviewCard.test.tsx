import { render, screen } from "@testing-library/react";
import ReviewCard from "./ReviewCard";

const editReviewFormMock = vi.fn();

vi.mock("../EditReviewForm/EditReviewForm", () => ({
  default: (props: any) => {
    editReviewFormMock(props);
    return <div data-testid="edit-review" />;
  },
}));

describe("ReviewCard", () => {
  it("passes canEdit true when author matches", () => {
    render(
      <ReviewCard
        review={{ id: "r1", authorId: "u1", name: "A", date: "", comments: "", rating: 5, restaurantId: "x" }}
        currentUserId="u1"
      />,
    );

    expect(editReviewFormMock).toHaveBeenCalledWith(
      expect.objectContaining({ canEdit: true }),
    );
  });

  it("passes canEdit false when author differs", () => {
    render(
      <ReviewCard
        review={{ id: "r1", authorId: "u2", name: "A", date: "", comments: "", rating: 5, restaurantId: "x" }}
        currentUserId="u1"
      />,
    );

    expect(editReviewFormMock).toHaveBeenCalledWith(
      expect.objectContaining({ canEdit: false }),
    );
  });
});
