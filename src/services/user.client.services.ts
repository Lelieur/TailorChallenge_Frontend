import { http } from "@/services/http.services";
import { Review } from "@/interfaces/Review.inteface";
import { User } from "@/interfaces/User.interface";

class UsersClientServices {
  createReview(review: Review) {
    return http.post("/backend/reviews", review);
  }
  addFavoriteRestaurant(restaurantId: string, loggedUser: User) {
    return http.post(`/backend/users/addfavorite/${restaurantId}`, loggedUser);
  }
  removeFavoriteRestaurant(restaurantId: string, loggedUser: User) {
    return http.put(
      `/backend/users/removefavorite/${restaurantId}`,
      loggedUser,
    );
  }
}

const usersServicesInstance = new UsersClientServices();
export default usersServicesInstance;
