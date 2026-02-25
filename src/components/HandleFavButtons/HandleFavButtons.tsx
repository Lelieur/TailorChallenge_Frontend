"use client";

import UserServices from "@/services/client/user";
import { User } from "@/interfaces/User.interface";
import { useRouter } from "next/navigation";
import BasicButton from "../Buttons/BasicButton";
import { handleWithToast } from "@/lib/handleWithToast";

export default function HandleFavButtons({
  restaurantId: restaurantId,
  loggedUser,
}: {
  restaurantId: string;
  loggedUser: User;
}) {
  const router = useRouter();

  const addFavoriteRestaurant = async () => {
    await UserServices.addFavoriteRestaurant(restaurantId, loggedUser);
    return "refresh";
  };

  const removeFavoriteRestaurant = async () => {
    await UserServices.removeFavoriteRestaurant(restaurantId, loggedUser);
    return "refresh";
  };

  return (
    <div className="flex flex-row justify-center gap-2">
      <BasicButton
        type="button"
        text="Añadir"
        action={() =>
          handleWithToast({
            action: addFavoriteRestaurant,
            data: restaurantId,
            navigate: () => router.refresh(),
            success: "Restaurante añadido a favoritos",
          })
        }
        disabled={loggedUser?.favoriteRestaurants?.includes(restaurantId)}
        backgroundColor="white"
      />
      <BasicButton
        type="button"
        text="Quitar"
        action={() =>
          handleWithToast({
            action: removeFavoriteRestaurant,
            data: restaurantId,
            navigate: () => router.refresh(),
            success: "Restaurante quitado de favoritos",
          })
        }
        disabled={!loggedUser?.favoriteRestaurants?.includes(restaurantId)}
        backgroundColor="white"
      />
    </div>
  );
}
