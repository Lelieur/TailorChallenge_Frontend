import axios, { AxiosInstance } from "axios";

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
}

export default new RestaurantServices();
