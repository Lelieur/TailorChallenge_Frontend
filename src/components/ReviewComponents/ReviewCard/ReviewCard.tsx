import { Review } from "@/types/Review";
import Stars from "@/components/Stars/Stars";

export default function ReviewCard({ review }: { review: Review }) {
  const { name, date, rating, comments } = review;
  return (
    <div className="grid grid-cols-10 items-center border-b border-[var(--tailor-blue)] p-5">
      <p className="font-bold text-xl">{name}</p>
      <div className="col-span-9 pl-5">
        <div className="w-full flex justify-end mb-3">
          <Stars rating={rating} />
        </div>
        <p className="text-sm">{comments}</p>
      </div>
    </div>
  );
}
