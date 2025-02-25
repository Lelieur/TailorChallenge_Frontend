import axios, { AxiosInstance } from "axios";
import { Restaurant } from "@/interfaces/Restaurante.interface";

class RestaurantServices {
  private axiosApp: AxiosInstance;

  constructor() {
    this.axiosApp = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
    });
  }

  getAllRestaurants() {
    return this.axiosApp.get("/restaurants");
  }

  getRestaurantById(id: string) {
    return this.axiosApp.get(`/restaurants/${id}`);
  }

  createRestaurant(restaurant: Restaurant) {
    return this.axiosApp.post("/restaurants", restaurant);
  }
}

export default new RestaurantServices();
