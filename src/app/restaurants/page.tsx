import RestaurantsList from "@/components/RestaurantComponents/RestaurantsList/RestaurantsList";
import RestaurantServices from "@/services/restaurant.services";
import CustomMap from "@/components/CustomMap/CustomMap";

export default async function Restaurants(): Promise<React.ReactNode> {
  const { data: restaurants } = await RestaurantServices.getAllRestaurants();
  return (
    <main className="flex-1 flex flex-col lg:flex-row justify-between p-7 overflow-y-auto">
      <div className="w-full h-full lg:w-1/2 rounded-xl overflow-hidden md:mr-7">
        <CustomMap
          markers={restaurants.map((restaurant: any) => restaurant.latlng)}
        />
      </div>
      <div className="w-full h-full lg:w-1/2 pt-5 lg:pt-0 overflow-y-auto">
        <RestaurantsList data={restaurants} />
      </div>
    </main>
  );
}
