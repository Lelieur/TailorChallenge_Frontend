import RestaurantsList from "@/components/RestaurantComponents/RestaurantsList/RestaurantsList";
import CustomMap from "@/components/GoogleMapsAPI/CustomMap/CustomMap";
import LoadingMap from "@/components/LoadingMap/LoadingMap";
import RestaurantsListSkeleton from "@/components/RestaurantComponents/RestaurantsList/RestaurantsListSkeleton";
import { Suspense } from "react";

export default function Restaurants(): React.ReactNode {
  return (
    <main className="flex-1 flex flex-col gap-7 lg:flex-row justify-between overflow-y-auto">
      <div className="w-full h-full lg:w-1/2 rounded-xl overflow-hidden">
        <Suspense fallback={<LoadingMap isError={false} />}>
          <CustomMap />
        </Suspense>
      </div>
      <div className="w-full h-full lg:w-1/2  lg:pt-0 overflow-y-auto">
        <Suspense fallback={<RestaurantsListSkeleton />}>
          <RestaurantsList />
        </Suspense>
      </div>
    </main>
  );
}
