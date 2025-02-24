import RestaurantServices from "@/services/restaurant.services";
import RestaurantImage from "@/components/RestaurantComponents/RestaurantImage/RestaurantImage";
import ReviewsList from "@/components/ReviewComponents/ReviewsList/ReviewsLists";
import RestaurantCuisineType from "@/components/RestaurantComponents/RestaurantCuisineType/RestaurantCuisineType";
import RestaurantOperatingHours from "@/components/RestaurantComponents/RestaurantOperatingHours/RestaurantOperatingHours";
import ReviewForm from "@/components/ReviewComponents/ReviewForm/ReviewForm";
export default async function RestaurantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: restaurant } = await RestaurantServices.getRestaurantById(id);
  const {
    name,
    address,
    neighborhood,
    cuisine_type,
    reviews,
    operating_hours,
  } = restaurant;

  return (
    <main className="flex-1 flex flex-col p-7 overflow-y-auto">
      <div className="relative w-full h-1/2">
        <RestaurantImage src={restaurant.image} width="full" height="full" />
        <div className="absolute top-1/2 translate-y-[-50%] w-full text-center text-white">
          <h2 className="font-bold text-4xl mb-3">{name}</h2>
          <p className="">{address}</p>
        </div>
      </div>
      <div className="mx-20 mt-10">
        <div className="grid grid-cols-10 p-5">
          <div className="col-span-7 grid grid-cols-2">
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
            <div>
              <RestaurantOperatingHours operating_hours={operating_hours} />
            </div>
          </div>
          <div className="col-span-3 border border-black rounded-lg">
            <ReviewForm />
          </div>
        </div>
        <div className="grid grid-cols-10 text-left">
          <div className="col-span-7">
            <ReviewsList reviews={reviews} />
          </div>
        </div>
      </div>
    </main>
  );
}
