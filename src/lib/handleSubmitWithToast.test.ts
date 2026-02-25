import { describe, expect, it, vi } from "vitest";
import { handleSubmitWithToast } from "@/lib/handleWithToast";

vi.mock("sileo", () => ({
  sileo: {
    promise: (promise: Promise<unknown>) => promise,
  },
}));

describe("handleSubmitWithToast", () => {
  it("builds formData from values and navigates to target", async () => {
    const apiCall = vi.fn(async (formData: FormData) => {
      expect(formData.get("email")).toBe("a@b.com");
      expect(formData.get("username")).toBe("lucas");
      return "/next";
    });

    const navigate = vi.fn();
    const isSubmitting = vi.fn();

    const event = {
      preventDefault: vi.fn(),
      currentTarget: document.createElement("form"),
    } as unknown as React.SubmitEvent<HTMLFormElement>;

    await handleSubmitWithToast({
      event,
      apiCall,
      isSubmitting,
      navigate,
      success: "OK",
      values: { email: "a@b.com", username: "lucas" },
    });

    expect(apiCall).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith("/next");
  });
});
