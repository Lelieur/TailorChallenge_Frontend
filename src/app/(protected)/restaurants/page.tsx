import RestaurantsList from '@/components/RestaurantComponents/RestaurantsList/RestaurantsList';
import RestaurantsListSkeleton from '@/components/RestaurantComponents/RestaurantsList/RestaurantsListSkeleton';

import { Suspense } from 'react';
import { getAllRestaurants } from '@/services/restaurant.server.services';
import { Restaurant } from '@/interfaces/Restaurant.interface';
import CustomMap from '@/components/Mapbox/Map/CustomMap';

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
        <Suspense fallback={<RestaurantsListSkeleton />}>
          <RestaurantsList restaurants={restaurants} />
        </Suspense>
      </div>
    </main>
  );
}
