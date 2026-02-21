import { getCurrentUserId } from "@/app/api/auth/dal";
import ReviewCard from "../ReviewCard/ReviewCard";
import { Review } from "@/interfaces/Review.inteface";

export default async function ReviewsList({ reviews }: { reviews: Review[] }) {
  const currentUserId = await getCurrentUserId();

  return (
    <div className="mr-auto">
      {reviews.map((review: Review) => (
        <ReviewCard
          review={review}
          currentUserId={currentUserId!}
          key={review._id}
        />
      ))}
    </div>
  );
}
