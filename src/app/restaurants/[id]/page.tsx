import RestaurantServices from "@/services/restaurant.services";
import RestaurantImage from "@/components/RestaurantComponents/RestaurantImage/RestaurantImage";

export default async function RestaurantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: restaurant } = await RestaurantServices.getRestaurantById(id);
  const { name, address } = restaurant;

  return (
    <main className="flex-1 flex flex-col p-7 overflow-y-auto">
      <div className="relative w-full h-1/2">
        <RestaurantImage src={restaurant.image} width="full" height="full" />
        <div className="absolute top-1/2 translate-y-[-50%] w-full text-center text-white">
          <h2 className="font-bold text-4xl mb-3">{name}</h2>
          <p className="">{address}</p>
        </div>
      </div>
    </main>
  );
}
