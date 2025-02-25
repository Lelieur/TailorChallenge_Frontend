import RestaurantsList from "@/components/RestaurantComponents/RestaurantsList/RestaurantsList";
import RestaurantServices from "@/services/restaurant.services";
import CustomMap from "@/components/CustomMap/CustomMap";
/* import { AuthContext } from "@/context/auth.context";
import { useContext } from "react"; */

export default async function Restaurants(): Promise<React.ReactNode> {
  const { data: restaurants } = await RestaurantServices.getAllRestaurants();

  /*   const { loggedUser } = useContext(AuthContext);
  if (loggedUser) {
    console.log(loggedUser);
  } */

  return (
    <main className="flex-1 flex flex-col gap-7 lg:flex-row justify-between overflow-y-auto">
      <div className="w-full h-full lg:w-1/2 rounded-xl overflow-hidden">
        <CustomMap
          markers={restaurants.map((restaurant: any) => restaurant.latlng)}
        />
      </div>
      <div className="w-full h-full lg:w-1/2  lg:pt-0 overflow-y-auto">
        <RestaurantsList data={restaurants} />
      </div>
    </main>
  );
}
