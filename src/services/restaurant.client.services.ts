import { http } from "@/services/http.services";
import type { Restaurant } from "@/interfaces/Restaurant.interface";

class RestaurantsClientServices {
  getAllRestaurants() {
    return http.get("/backend/restaurants");
  }
  createRestaurant(payload: Restaurant) {
    return http.post("/backend/restaurants", payload);
  }
}

export default new RestaurantsClientServices();
