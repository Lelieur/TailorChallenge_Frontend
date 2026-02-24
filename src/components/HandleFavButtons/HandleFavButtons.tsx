"use client";

import { useState, useEffect } from "react";

import UserServices from "@/services/client/user";
import { User } from "@/interfaces/User.interface";

export default function HandleFavButtons({
  restaurantId: restaurantId,
  loggedUser,
}: {
  restaurantId: string;
  loggedUser: User;
}) {
  const [updatedLoggedUser, setUpdatedLoggedUser] = useState(loggedUser);

  useEffect(() => {
    setUpdatedLoggedUser(loggedUser);
  }, [loggedUser]);

  const handleAddFavoriteRestaurant = () => {
    if (loggedUser) {
      UserServices.addFavoriteRestaurant(restaurantId, loggedUser)
        .then(() => {
          setUpdatedLoggedUser({
            ...loggedUser,
            favoriteRestaurants: [...(updatedLoggedUser?.favoriteRestaurants || []), restaurantId],
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
          setUpdatedLoggedUser({
            ...loggedUser,
            favoriteRestaurants: updatedLoggedUser?.favoriteRestaurants?.filter(
              (id) => id !== restaurantId,
            ),
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="flex flex-row justify-center gap-2">
      <button
        className={`rounded-2xl px-6 py-2 font-bold ${
          updatedLoggedUser?.favoriteRestaurants?.includes(restaurantId)
            ? "bg-[var(--tailor-grey)] text-gray-300"
            : "bg-[var(--tailor-blue)] text-white transition-all duration-300 hover:bg-white hover:text-black"
        }`}
        onClick={handleAddFavoriteRestaurant}
        disabled={loggedUser?.favoriteRestaurants?.includes(restaurantId)}
      >
        Añadir
      </button>
      <button
        className={`rounded-2xl px-6 py-2 font-bold ${
          !updatedLoggedUser?.favoriteRestaurants?.includes(restaurantId)
            ? "bg-[var(--tailor-grey)] text-gray-400"
            : "bg-black text-white transition-all duration-300 hover:bg-white hover:text-black"
        }`}
        onClick={handleRemoveFavoriteRestaurant}
        disabled={!loggedUser?.favoriteRestaurants?.includes(restaurantId)}
      >
        Quitar
      </button>
    </div>
  );
}
