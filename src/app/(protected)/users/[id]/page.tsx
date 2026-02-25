import React from "react";
import { User } from "@/interfaces/User.interface";

import ReviewCard from "@/components/ReviewComponents/ReviewCard/ReviewCard";
import RestaurantCard from "@/components/RestaurantComponents/RestaurantCard/RestaurantCard";
import { Restaurant } from "@/interfaces/Restaurant.interface";
import { Review } from "@/interfaces/Review.inteface";
import { getUserById } from "@/services/server/user";
import { getRestaurantById } from "@/services/server/restaurant";
import { getReviewById } from "@/services/server/review";

export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<React.ReactNode> {
  const { id } = await params;
  const userData: User = await getUserById(id);
  const { username, email } = userData;

  const favouriteRestaurants: Restaurant[] = await Promise.all(
    userData.favoriteRestaurants.map((restaurantId) => {
      return getRestaurantById(restaurantId);
    }),
  );

  const userReviews: Review[] = await Promise.all(
    userData.reviews.map((reviewId) => {
      return getReviewById(reviewId);
    }),
  );

  return (
    <main className="lg:overflow-y-hidden">
      <div className="rounded-lg bg-[var(--tailor-blue)] p-4 text-white">
        <h3 className="text-xl font-bold">Tus datos personales</h3>
        <hr className="my-2 w-1/6 text-white" />
        <p className="text-sm font-bold">
          Nombre: <span className="font-normal">{username}</span>
        </p>
        <p className="text-sm font-bold">
          Email: <span className="font-normal">{email}</span>
        </p>
      </div>
      <div className="grid grid-cols-10 gap-4 lg:h-full">
        <div className="col-span-10 mt-7 flex h-full flex-col gap-4 md:overflow-y-auto lg:col-span-6">
          <p className="text-xl font-bold">
            {`${favouriteRestaurants?.length} Restaurantes favoritos`}
          </p>
          <hr className="border-[var(--tailor-blue)]" />
          <div className="flex h-full flex-col gap-4 lg:overflow-y-scroll">
            {favouriteRestaurants?.map((restaurant, index) => (
              <RestaurantCard key={index} data={restaurant as Restaurant} />
            ))}
          </div>
        </div>
        <div className="col-span-10 mt-7 flex flex-col gap-4 md:overflow-y-auto lg:col-span-4 lg:h-full">
          <p className="text-xl font-bold">{`${userReviews?.length} Reseñas publicadas`}</p>
          <hr className="border-[var(--tailor-blue)]" />
          <div className="lg:h-full lg:overflow-y-scroll">
            {userReviews?.map((review, index) => (
              <ReviewCard key={index} review={review as Review} currentUserId={id} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
