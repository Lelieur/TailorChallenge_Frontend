import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AutocompleteAddress from "./AutocompleteAddress";

const onSelectMock = vi.fn();

vi.mock("@mapbox/search-js-react", () => ({
  SearchBox: ({ onRetrieve }: { onRetrieve: (res: any) => void }) => (
    <button
      type="button"
      onClick={() =>
        onRetrieve({
          features: [
            {
              geometry: { coordinates: [3, 4] },
              properties: { full_address: "Calle 1", feature_type: "address" },
            },
          ],
        })
      }
    >
      search
    </button>
  ),
}));

describe("AutocompleteAddress", () => {
  it("calls onSelect when retrieving a feature", async () => {
    const user = userEvent.setup();
    render(<AutocompleteAddress onSelect={onSelectMock} placeholder="Dirección" id="address" />);

    await user.click(screen.getByRole("button", { name: /search/i }));

    expect(onSelectMock).toHaveBeenCalledWith(
      expect.objectContaining({ label: "Calle 1", lat: 4, lng: 3 }),
    );
  });
});
