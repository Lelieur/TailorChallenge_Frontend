import Stars from "../../Stars/Stars";
import RestaurantImageCard from "../RestaurantImage/RestaurantImage";
import RestaurantCuisineType from "../RestaurantCuisineType/RestaurantCuisineType";
import RestaurantOperatingHours from "../RestaurantOperatingHours/RestaurantOperatingHours";
import Link from "next/link";

export default function RestaurantCard({
  data,
}: {
  data: any;
}): React.ReactNode {
  const {
    image,
    name,
    address,
    neighborhood,
    reviews,
    cuisine_type,
    operating_hours,
    _id,
  } = data;

  return (
    <Link href={`/restaurants/${_id}`}>
      <div className="flex flex-row h-48 opacity-50 hover:opacity-100 transition-opacity duration-300 hover:cursor-pointer">
        <RestaurantImageCard src={image} width="1/4" />
        <div className="flex flex-col justify-between p-2">
          <div>
            <div className="flex flex-row gap-2 items-center mb-3">
              <RestaurantCuisineType cuisine_type={cuisine_type} />
              <h2 className="text-2xl font-bold">{name}</h2>
            </div>
            <p>
              <span className="font-bold">Neighborhood:</span> {neighborhood}
            </p>
            <p>
              <span className="font-bold">Address:</span> {address}
            </p>
          </div>
          <RestaurantOperatingHours operating_hours={operating_hours} />
          <div className="flex flex-row gap-2 items-center">
            <Stars ratings={reviews.map((review: any) => review.rating)} />
            <span>{`(${reviews.length} comentarios)`}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
