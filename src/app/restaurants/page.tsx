import RestaurantsList from "@/components/RestaurantsList/RestaurantsList";
import RestaurantServices from "@/services/restaurant.services";
import CustomMap from "@/components/CustomMap/CustomMap";

export default async function Restaurants(): Promise<React.ReactNode> {
  const { data: restaurants } = await RestaurantServices.getAllRestaurants();
  return (
    <main className="flex-1 flex flex-col-reverse md:flex-row justify-between p-7 overflow-y-auto">
      <div className="w-full h-full md:w-1/2 rounded-xl overflow-hidden md:mr-7">
        <CustomMap
          markers={restaurants.map((restaurant: any) => restaurant.latlng)}
        />
      </div>
      <div className="w-full h-full md:w-1/2 overflow-y-auto">
        <RestaurantsList data={restaurants} />
      </div>
    </main>
  );
}
