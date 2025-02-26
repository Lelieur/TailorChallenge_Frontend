"use client";

import axios, { AxiosInstance } from "axios";
import { Restaurant } from "@/interfaces/Restaurante.interface";

class RestaurantClientServices {
  private axiosApp: AxiosInstance;

  constructor() {
    this.axiosApp = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
    });

    this.axiosApp.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers.set("Authorization", `Bearer ${storedToken}`);
      }

      return config;
    });
  }

  createRestaurant(restaurant: Restaurant) {
    return this.axiosApp.post("/restaurants", restaurant);
  }
}

export default new RestaurantClientServices();
