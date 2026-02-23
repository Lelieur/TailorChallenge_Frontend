import Stars from "../../Stars/Stars";
import RestaurantImage from "../RestaurantImage/RestaurantImage";
import RestaurantCuisineType from "../RestaurantCuisineType/RestaurantCuisineType";
import RestaurantOperatingHours from "../RestaurantOperatingHours/RestaurantOperatingHours";
import Link from "next/link";
import { Restaurant } from "@/interfaces/Restaurant.interface";

export default function RestaurantCard({ data }: { data: Restaurant }): React.ReactNode {
  const { image, name, address, neighborhood, reviews, cuisine_type, operating_hours, id } = data;

  return (
    <Link href={`/restaurants/${id}`}>
      <div className="flex flex-row sm:h-48 sm:opacity-80 sm:transition-opacity sm:duration-300 sm:hover:cursor-pointer sm:hover:opacity-100">
        <RestaurantImage src={image!} width="w-2/5 md:w-1/4 lg:w-2/5 xl:w-1/4" isCard={true} />
        <div className="flex w-full flex-col p-2 sm:w-3/5 sm:justify-between md:w-3/4 lg:w-3/5 xl:w-3/4">
          <div>
            <div className="mb-2 flex flex-row items-center gap-2">
              <RestaurantCuisineType cuisine_type={cuisine_type || ""} />
              <h2 className="text-xl font-bold xl:text-2xl">{name}</h2>
            </div>
            <div className="mb-2">
              <p className="text-sm xl:text-base">
                <span className="font-bold">Neighborhood:</span> {neighborhood}
              </p>
              <p className="text-sm xl:text-base">
                <span className="font-bold">Address:</span> {address}
              </p>
            </div>
            <RestaurantOperatingHours
              operating_hours={{
                Monday: operating_hours?.Monday || "",
                Tuesday: operating_hours?.Tuesday || "",
                Wednesday: operating_hours?.Wednesday || "",
                Thursday: operating_hours?.Thursday || "",
                Friday: operating_hours?.Friday || "",
                Saturday: operating_hours?.Saturday || "",
                Sunday: operating_hours?.Sunday || "",
              }}
              size="small"
            />
          </div>
          <div className="flex flex-row items-center gap-2">
            <Stars ratings={reviews?.map((review: { rating: number }) => review.rating)} />
            <span>{`(${reviews?.length} comentarios)`}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
