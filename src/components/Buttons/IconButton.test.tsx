import { render, screen } from "@testing-library/react";
import IconButton from "./IconButton";

const DummyIcon = () => <svg data-testid="icon" />;

describe("IconButton", () => {
  it("renders children and aria label", () => {
    render(
      <IconButton type="button" ariaLabel="Volver">
        <DummyIcon />
      </IconButton>,
    );

    expect(screen.getByLabelText("Volver")).toBeInTheDocument();
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });
});
