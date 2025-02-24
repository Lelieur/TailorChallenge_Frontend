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
}

export default new RestaurantServices();
