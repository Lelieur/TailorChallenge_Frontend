"use client";

import { AuthContext } from "@/context/auth.context";
import { useContext, useState, useEffect } from "react";

import UserServices from "@/services/user.services";

export default function HandleFavButtons({
  id: restaurantId,
  isMobile,
}: {
  id: string;
  isMobile?: boolean;
}) {
  const { loggedUser } = useContext(AuthContext);
  const [updatedLoggedUser, setUpdatedLoggedUser] = useState(loggedUser);

  useEffect(() => {
    setUpdatedLoggedUser(loggedUser);
  }, [loggedUser]);

  const handleAddFavoriteRestaurant = () => {
    if (loggedUser) {
      UserServices.addFavoriteRestaurant(restaurantId, loggedUser)
        .then(() => {
          console.log("Restaurant added to favorites");
          setUpdatedLoggedUser({
            ...loggedUser,
            favoriteRestaurants: [
              ...(updatedLoggedUser?.favoriteRestaurants || []),
              restaurantId,
            ],
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleRemoveFavoriteRestaurant = () => {
    if (loggedUser) {
      UserServices.removeFavoriteRestaurant(restaurantId, loggedUser)
        .then(() => {
          console.log("Restaurant removed from favorites");
          setUpdatedLoggedUser({
            ...loggedUser,
            favoriteRestaurants: updatedLoggedUser?.favoriteRestaurants?.filter(
              (id) => id !== restaurantId
            ),
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="flex flex-row gap-2 justify-center">
      <button
        className={`px-6 py-2 rounded-2xl font-bold  ${
          updatedLoggedUser?.favoriteRestaurants?.includes(restaurantId)
            ? "bg-[var(--tailor-grey)] text-gray-300 "
            : "bg-[var(--tailor-blue)] text-white hover:bg-white hover:text-black transition-all duration-300"
        }`}
        onClick={handleAddFavoriteRestaurant}
        disabled={updatedLoggedUser?.favoriteRestaurants?.includes(
          restaurantId
        )}
      >
        {isMobile ? "Añadir" : "Añadir a favoritos"}
      </button>
      <button
        className={`px-6 py-2 rounded-2xl font-bold ${
          !updatedLoggedUser?.favoriteRestaurants?.includes(restaurantId)
            ? "bg-[var(--tailor-grey)] text-gray-400"
            : "bg-black text-white hover:bg-white hover:text-black transition-all duration-300"
        }`}
        onClick={handleRemoveFavoriteRestaurant}
        disabled={
          !updatedLoggedUser?.favoriteRestaurants?.includes(restaurantId)
        }
      >
        {isMobile ? "Quitar" : "Añadir a favoritos"}
      </button>
    </div>
  );
}
