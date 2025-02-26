"use client";

import axios, { AxiosInstance } from "axios";
import { Review } from "@/interfaces/Review.inteface";

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

  createReview(review: Review) {
    return this.axiosApp.post("/reviews", review);
  }

  deleteReview(id: string) {
    return this.axiosApp.delete(`/reviews/${id}`);
  }

  updateReview(id: string, review: Review) {
    return this.axiosApp.put(`/reviews/${id}`, review);
  }
}

const reviewServicesInstance = new ReviewServices();
export default reviewServicesInstance;
