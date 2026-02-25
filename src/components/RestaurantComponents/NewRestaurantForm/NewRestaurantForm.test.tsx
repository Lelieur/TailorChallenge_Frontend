import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewRestaurantForm from "./NewRestaurantForm";

const createRestaurantMock = vi.fn();
const uploadImageMock = vi.fn();
const pushMock = vi.fn();

vi.mock("@/services/client/restaurant", () => ({
  default: {
    createRestaurant: (...args: unknown[]) => createRestaurantMock(...args),
  },
}));

vi.mock("@/services/cloudinary.services", () => ({
  default: {
    uploadImage: (...args: unknown[]) => uploadImageMock(...args),
  },
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

vi.mock("@/components/RestaurantComponents/RestaurantImage/RestaurantImage", () => ({
  default: ({ src }: { src: string }) => <img alt="Restaurant image" src={src} />,
}));

vi.mock("@/components/Mapbox/Search/AutocompleteAddress", () => ({
  default: ({ onSelect, placeholder, id }: { onSelect: (sel: any) => void; placeholder: string; id: string }) => (
    <button
      type="button"
      onClick={() =>
        onSelect({
          label: id === "address" ? "Main St" : "Downtown",
          lat: 10,
          lng: 20,
        })
      }
    >
      {placeholder}
    </button>
  ),
}));

describe("NewRestaurantForm", () => {
  beforeEach(() => {
    createRestaurantMock.mockResolvedValue({ data: { id: "r-1" } });
    uploadImageMock.mockResolvedValue("http://image.test/photo.jpg");
    pushMock.mockClear();
  });

  it("submits payload and navigates to success", async () => {
    const user = userEvent.setup();

    const { container } = render(<NewRestaurantForm loggedUserId="u-1" />);

    await user.type(screen.getByLabelText(/Nombre del restaurante/i), "Test Restaurante");
    await user.click(screen.getByRole("button", { name: /Dirección/i }));
    await user.click(screen.getByRole("button", { name: /Barrio/i }));

    await user.selectOptions(screen.getByLabelText(/Tipo de cocina/i), "Pizza");
    await user.type(screen.getByLabelText(/Descripción del restaurante/i), "Bueno");

    const timeInputs = container.querySelectorAll("input[type='time']");
    timeInputs.forEach((input, index) => {
      fireEvent.change(input, { target: { value: index % 2 === 0 ? "10:00" : "22:00" } });
    });

    await user.click(screen.getByRole("button", { name: /Guardar/i }));

    await waitFor(() => {
      expect(createRestaurantMock).toHaveBeenCalledTimes(1);
      expect(pushMock).toHaveBeenCalledWith("/success/r-1");
    });
  });

  it("uploads image and renders preview", async () => {
    const user = userEvent.setup();
    const { container } = render(<NewRestaurantForm loggedUserId="u-1" />);

    const fileInput = container.querySelector("input[type='file']") as HTMLInputElement;
    expect(fileInput).toBeTruthy();

    const file = new File(["dummy"], "photo.png", { type: "image/png" });
    await user.upload(fileInput, file);

    await waitFor(() => {
      expect(uploadImageMock).toHaveBeenCalled();
      expect(screen.getByAltText(/Restaurant image/i)).toHaveAttribute(
        "src",
        "http://image.test/photo.jpg",
      );
    });
  });
});
