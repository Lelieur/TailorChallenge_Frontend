import Star from "@/assets/star.svg";

export default function Stars({
  ratings,
  rating,
}: {
  ratings?: Array<number>;
  rating?: number;
}) {
  const averageRating = ratings
    ? Math.round(
        ratings.reduce((acc, rating) => acc + rating, 0) / ratings.length
      )
    : rating || 0;

  return (
    <div className="flex flex-row">
      <div className="flex flex-row">
        {Array.from({ length: averageRating || 0 }).map((_, index) => (
          <Star key={`star-${index}`} className="w-5 h-5 xl:w-6 xl:h-6" />
        ))}
      </div>
      <div className="flex flex-row opacity-50">
        {Array.from({ length: 5 - (averageRating || 0) }).map((_, index) => (
          <Star key={`empty-star-${index}`} className="w-5 h-5 xl:w-6 xl:h-6" />
        ))}
      </div>
    </div>
  );
}
