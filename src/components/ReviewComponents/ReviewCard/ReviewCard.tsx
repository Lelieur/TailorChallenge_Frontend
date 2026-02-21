import { Review } from "@/interfaces/Review.inteface";
import EditReviewForm from "../EditReviewForm/EditReviewForm";

export default function ReviewCard({
  review,
  currentUserId,
}: {
  review: Review;
  currentUserId: string;
}) {
  const canEdit = currentUserId === review.authorId;

  return <EditReviewForm review={review} canEdit={canEdit} />;
}
