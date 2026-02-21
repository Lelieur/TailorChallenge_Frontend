import { http } from "@/services/http.services";
import { Review } from "@/interfaces/Review.inteface";

class ReviewClientServices {
  createReview(review: Review) {
    return http.post("/backend/reviews", review);
  }
  deleteReview(id: string) {
    return http.delete(`/backend/reviews/${id}`);
  }
  updateReview(id: string, review: Review) {
    return http.put(`/backend/reviews/${id}`, review);
  }
}

const reviewServicesInstance = new ReviewClientServices();
export default reviewServicesInstance;
