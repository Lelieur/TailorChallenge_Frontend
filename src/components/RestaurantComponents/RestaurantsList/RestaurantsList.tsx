import RestaurantCard from "@/components/RestaurantComponents/RestaurantCard/RestaurantCard";
import type { Restaurant } from "@/interfaces/Restaurant.interface";

export default function RestaurantsList({
  restaurants,
}: {
  restaurants: Restaurant[];
}) {
  return (
    <div className="flex flex-col gap-4">
      {restaurants.map((restaurant) => (
        <RestaurantCard data={restaurant} key={restaurant._id} />
      ))}
    </div>
  );
}
