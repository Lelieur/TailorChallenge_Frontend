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

  const stars = Array(averageRating).fill(<Star />);
  const emptyStars = Array(5 - averageRating).fill(<Star />);

  return (
    <div className="flex flex-row">
      <div className="flex flex-row">
        {stars.map((star, index) => (
          <Star key={`star-${index}`} />
        ))}
      </div>
      <div className="flex flex-row opacity-50">
        {emptyStars.map((star, index) => (
          <Star key={`empty-star-${index}`} />
        ))}
      </div>
    </div>
  );
}
