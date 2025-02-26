"use client";

import axios, { AxiosInstance } from "axios";

class ReviewServices {
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

  addFavoriteRestaurant(restaurantId: string, loggedUser: any) {
    return this.axiosApp.put(`/users/addfavorite/${restaurantId}`, loggedUser);
  }

  removeFavoriteRestaurant(restaurantId: string, loggedUser: any) {
    return this.axiosApp.put(
      `/users/removefavorite/${restaurantId}`,
      loggedUser
    );
  }
}

export default new ReviewServices();
