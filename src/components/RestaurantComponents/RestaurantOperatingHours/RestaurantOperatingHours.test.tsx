import { render, screen } from "@testing-library/react";
import RestaurantOperatingHours from "./RestaurantOperatingHours";

const operatingHours = {
  Monday: "09:00-17:00",
  Tuesday: "09:00-17:00",
  Wednesday: "09:00-17:00",
  Thursday: "09:00-17:00",
  Friday: "09:00-17:00",
  Saturday: "10:00-14:00",
  Sunday: "Closed-Closed",
};

describe("RestaurantOperatingHours", () => {
  it("renders short day labels when size is small", () => {
    render(<RestaurantOperatingHours operating_hours={operatingHours} size="small" />);

    expect(screen.getByText("Mon")).toBeInTheDocument();
    expect(screen.getByText("Tue")).toBeInTheDocument();
    expect(screen.getByText("Sun")).toBeInTheDocument();
  });

  it("renders split schedule when size is large", () => {
    render(<RestaurantOperatingHours operating_hours={operatingHours} size="large" />);

    expect(screen.getByText("Monday")).toBeInTheDocument();
    expect(screen.getAllByText("09:00")).not.toHaveLength(0);
    expect(screen.getAllByText("17:00")).not.toHaveLength(0);
  });
});
