"use client";

import React, { useEffect, useState } from "react";
import RestaurantCard from "@/components/RestaurantComponents/RestaurantCard/RestaurantCard";
import RestaurantServices from "@/services/restaurant.services";

const RestaurantsList: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: restaurants } =
        await RestaurantServices.getAllRestaurants();
      setData(restaurants);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {data.map((restaurant: any) => (
        <RestaurantCard data={restaurant} key={restaurant._id} />
      ))}
    </div>
  );
};

export default RestaurantsList;
