"use client";

import axios, { AxiosInstance } from "axios";
import { User } from "@/interfaces/User.interface";
class UserServices {
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

  getUserById(id: string) {
    return this.axiosApp.get(`/users/${id}`);
  }

  addFavoriteRestaurant(restaurantId: string, loggedUser: User) {
    return this.axiosApp.put(`/users/addfavorite/${restaurantId}`, loggedUser);
  }

  removeFavoriteRestaurant(restaurantId: string, loggedUser: User) {
    return this.axiosApp.put(
      `/users/removefavorite/${restaurantId}`,
      loggedUser
    );
  }
}

const userServicesInstance = new UserServices();
export default userServicesInstance;
