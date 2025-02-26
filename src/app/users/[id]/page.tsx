"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { User } from "@/interfaces/User.interface";

import UserServices from "@/services/user.services";
import ReviewCard from "@/components/ReviewComponents/ReviewCard/ReviewCard";
import RestaurantCard from "@/components/RestaurantComponents/RestaurantCard/RestaurantCard";
import { Restaurant } from "@/interfaces/Restaurant.interface";
import { Review } from "@/interfaces/Review.inteface";

export default function UserPage(): React.ReactNode {
  const { id } = useParams();
  const [userData, setUserData] = useState<User>({});

  const { username, email, favoriteRestaurants, reviews } = userData;

  useEffect(() => {
    const fetchData = async () => {
      const { data: userData } = await UserServices.getUserById(id as string);
      setUserData(userData);
    };

    fetchData();
  }, [id]);

  return (
    <main className="lg:overflow-y-hidden">
      <div className="bg-[var(--tailor-blue)] text-white p-4 rounded-lg">
        <h3 className="text-xl font-bold ">Tus datos personales</h3>
        <hr className="my-2 w-1/6 text-white" />
        <p className="text-sm font-bold">
          Nombre: <span className="font-normal">{username}</span>
        </p>
        <p className="text-sm font-bold">
          Email: <span className="font-normal">{email}</span>
        </p>
      </div>
      <div className="grid grid-cols-10 gap-4 lg:h-full">
        <div className="mt-7 col-span-10 lg:col-span-6 flex flex-col gap-4 md:overflow-y-auto h-full">
          <p className="text-xl font-bold">
            {`${favoriteRestaurants?.length} Restaurantes favoritos`}
          </p>
          <hr className="border-[var(--tailor-blue)]" />
          <div className="flex flex-col gap-4 lg:overflow-y-scroll h-full">
            {favoriteRestaurants?.map((restaurant, index) => (
              <RestaurantCard key={index} data={restaurant as Restaurant} />
            ))}
          </div>
        </div>
        <div className="mt-7 col-span-10 lg:col-span-4 flex flex-col gap-4 md:overflow-y-auto lg:h-full">
          <p className="text-xl font-bold">
            {`${reviews?.length} Reseñas publicadas`}
          </p>
          <hr className="border-[var(--tailor-blue)]" />
          <div className="lg:overflow-y-scroll lg:h-full">
            {reviews?.map((review, index) => (
              <ReviewCard key={index} review={review as Review} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
