import RestaurantsList from "@/components/RestaurantComponents/RestaurantsList/RestaurantsList";

import { getAllRestaurants } from "@/services/server/restaurant";
import { Restaurant } from "@/interfaces/Restaurant.interface";
import CustomMap from "@/components/Mapbox/Map/CustomMap";

export default async function Restaurants(): Promise<React.ReactNode> {
  const restaurants: Restaurant[] = await getAllRestaurants();

  const markers = (restaurants as Restaurant[])
    .map((r) => r.latlng)
    .filter(Boolean)
    .map((ll) => ({ lat: ll!.lat, lng: ll!.lng }));

  return (
    <main className="flex flex-1 flex-col justify-between gap-4 overflow-y-auto sm:gap-7 lg:flex-row">
      <div className="h-full w-full overflow-hidden rounded-xl lg:w-1/2">
        <CustomMap markers={markers} />
      </div>
      <div className="h-full w-full overflow-y-auto lg:w-1/2 lg:pt-0">
        <RestaurantsList restaurants={restaurants} />
      </div>
    </main>
  );
}
