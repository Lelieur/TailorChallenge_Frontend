import ReviewCard from "../ReviewCard/ReviewCard";
import { Review } from "@/types/Review";

export default function ReviewsList({ reviews }: { reviews: Review[] }) {
  return (
    <div className="mr-auto">
      {reviews.map((review: any) => (
        <div key={review.name} className="mb-5">
          <ReviewCard review={review} />
        </div>
      ))}
    </div>
  );
}
