import { getCurrentUserId } from "@/server/auth/session";
import ReviewCard from '../ReviewCard/ReviewCard';
import { Review } from '@/interfaces/Review.inteface';

export default async function ReviewsList({ reviews }: { reviews: Review[] }) {
  const currentUserId = await getCurrentUserId();

  return (
    <div className="mr-auto">
      {reviews.map((review: Review) => (
        <ReviewCard
          review={review}
          currentUserId={currentUserId!}
          key={`${review.name!}-${review.date}`}
        />
      ))}
    </div>
  );
}
