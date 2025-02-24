import Star from "@/assets/star.svg";

export default function Stars({ ratings }: { ratings: Array<number> }) {
  const averageRating = Math.round(
    ratings.reduce((acc, rating) => acc + rating, 0) / ratings.length
  );

  const stars = Array(averageRating).fill(<Star />);
  const emptyStars = Array(5 - averageRating).fill(<Star />);

  if (averageRating === 0) {
    return (
      <div className="flex flex-row">
        <div className="flex flex-row" key={averageRating}>
          {stars}
        </div>
        <div className="flex flex-row opacity-50" key={averageRating}>
          {emptyStars}
        </div>
      </div>
    );
  } else if (averageRating === 1) {
    return (
      <div className="flex flex-row">
        <div className="flex flex-row" key={averageRating}>
          {stars}
        </div>
        <div className="flex flex-row opacity-50" key={averageRating}>
          {emptyStars}
        </div>
      </div>
    );
  } else if (averageRating === 2) {
    return (
      <div className="flex flex-row">
        <div className="flex flex-row" key={averageRating}>
          {stars}
        </div>
        <div className="flex flex-row opacity-50" key={averageRating}>
          {emptyStars}
        </div>
      </div>
    );
  } else if (averageRating === 3) {
    return (
      <div className="flex flex-row">
        <div className="flex flex-row" key={averageRating}>
          {stars}
        </div>
        <div className="flex flex-row opacity-50" key={averageRating}>
          {emptyStars}
        </div>
      </div>
    );
  } else if (averageRating === 4) {
    return (
      <div className="flex flex-row">
        <div className="flex flex-row" key={averageRating}>
          {stars}
        </div>
        <div className="flex flex-row opacity-50" key={averageRating}>
          {emptyStars}
        </div>
      </div>
    );
  } else if (averageRating === 5) {
    return (
      <div className="flex flex-row">
        <div className="flex flex-row" key={averageRating}>
          {stars}
        </div>
        <div className="flex flex-row opacity-50" key={averageRating}>
          {emptyStars}
        </div>
      </div>
    );
  }
}
