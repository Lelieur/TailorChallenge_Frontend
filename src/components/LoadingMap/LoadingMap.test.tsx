import { render, screen } from "@testing-library/react";
import LoadingMap from "./LoadingMap";

describe("LoadingMap", () => {
  it("renders spinner", () => {
    render(<LoadingMap />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});
