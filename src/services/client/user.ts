import { http } from "@/services/http/client";
import { User } from "@/interfaces/User.interface";

class UsersClientServices {
  addFavoriteRestaurant(restaurantId: string, loggedUser: User) {
    return http.put(`/backend/users/addfavorite/${restaurantId}`, loggedUser);
  }
  removeFavoriteRestaurant(restaurantId: string, loggedUser: User) {
    return http.put(`/backend/users/removefavorite/${restaurantId}`, loggedUser);
  }
}

const usersServicesInstance = new UsersClientServices();
export default usersServicesInstance;
