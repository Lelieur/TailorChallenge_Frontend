export default function RestaurantCuisineType({
  cuisine_type,
}: {
  cuisine_type: string;
}) {
  switch (cuisine_type) {
    case "Asian":
      return <span>🍱</span>;
    case "American":
      return <span>🍔</span>;
    case "Pizza":
      return <span>🍕</span>;
    case "Mexican":
      return <span>🌮</span>;
    default:
      return <span className="font-bold">{cuisine_type}</span>;
  }
}
