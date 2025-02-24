import RestaurantCard from "../RestaurantCard/RestaurantCard";

export default function RestaurantsList({
  data,
}: {
  data: any;
}): React.ReactNode {
  return (
    <div className="flex flex-col gap-4">
      {data.map((restaurant: any) => (
        <RestaurantCard data={restaurant} key={restaurant._id} />
      ))}
    </div>
  );
}
