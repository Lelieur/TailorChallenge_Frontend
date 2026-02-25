import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EditReviewForm from "./EditReviewForm";

const updateReviewMock = vi.fn();
const refreshMock = vi.fn();

vi.mock("@/services/client/review", () => ({
  default: {
    updateReview: (...args: unknown[]) => updateReviewMock(...args),
  },
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: refreshMock,
  }),
}));

vi.mock("@/components/Stars/DynamicStars/DynamicStars", () => ({
  default: ({ setRating }: { setRating: (value: number) => void }) => (
    <button type="button" onClick={() => setRating(4)}>
      rating
    </button>
  ),
}));

describe("EditReviewForm", () => {
  beforeEach(() => {
    updateReviewMock.mockResolvedValue({});
    refreshMock.mockClear();
  });

  it("updates review when edited", async () => {
    const user = userEvent.setup();

    render(
      <EditReviewForm
        review={{
          id: "r1",
          name: "Ana",
          date: "",
          comments: "old",
          rating: 2,
          authorId: "u1",
          restaurantId: "rest",
        }}
        canEdit={true}
      />,
    );

    await user.click(screen.getByRole("button", { name: /Editar/i }));
    await user.click(screen.getByRole("button", { name: /rating/i }));

    const textarea = screen.getByPlaceholderText(/Escribe tu comentario/i);
    await user.clear(textarea);
    await user.type(textarea, "new");

    await user.click(screen.getByRole("button", { name: /Guardar/i }));

    expect(updateReviewMock).toHaveBeenCalled();
    expect(refreshMock).toHaveBeenCalled();
  });
});
