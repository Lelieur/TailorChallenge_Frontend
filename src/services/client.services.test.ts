const { httpMock } = vi.hoisted(() => ({
  httpMock: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

vi.mock("@/services/http/client", () => ({
  http: httpMock,
}));

import reviewServices from "./client/review";
import restaurantsServices from "./client/restaurant";
import usersServices from "./client/user";

describe("Client services", () => {
  beforeEach(() => {
    httpMock.get.mockReset();
    httpMock.post.mockReset();
    httpMock.put.mockReset();
    httpMock.delete.mockReset();
  });

  it("calls review endpoints with correct methods", () => {
    const reviewPayload = { rating: 5, comments: "Great" };

    reviewServices.createReview(reviewPayload);
    reviewServices.deleteReview("r-1");
    reviewServices.updateReview("r-1", reviewPayload);

    expect(httpMock.post).toHaveBeenCalledWith("/backend/reviews", reviewPayload);
    expect(httpMock.delete).toHaveBeenCalledWith("/backend/reviews/r-1");
    expect(httpMock.put).toHaveBeenCalledWith("/backend/reviews/r-1", reviewPayload);
  });

  it("calls restaurant endpoints with correct methods", () => {
    const restaurantPayload = { name: "Tailor Kitchen" };

    restaurantsServices.getAllRestaurants();
    restaurantsServices.createRestaurant(restaurantPayload);

    expect(httpMock.get).toHaveBeenCalledWith("/backend/restaurants");
    expect(httpMock.post).toHaveBeenCalledWith("/backend/restaurants", restaurantPayload);
  });

  it("calls user favorite endpoints with correct methods", () => {
    const userPayload = { id: "u-1", username: "Lucas" };

    usersServices.addFavoriteRestaurant("rest-1", userPayload);
    usersServices.removeFavoriteRestaurant("rest-1", userPayload);

    expect(httpMock.put).toHaveBeenCalledWith("/backend/users/addfavorite/rest-1", userPayload);
    expect(httpMock.put).toHaveBeenCalledWith("/backend/users/removefavorite/rest-1", userPayload);
  });
});
