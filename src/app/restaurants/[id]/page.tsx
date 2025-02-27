import RestaurantServices from "@/services/restaurant.services";
import ReviewsList from "@/components/ReviewComponents/ReviewsList/ReviewsLists";
import RestaurantCuisineType from "@/components/RestaurantComponents/RestaurantCuisineType/RestaurantCuisineType";
import RestaurantOperatingHours from "@/components/RestaurantComponents/RestaurantOperatingHours/RestaurantOperatingHours";
import AddReviewForm from "@/components/ReviewComponents/AddReviewForm/AddReviewForm";
import HandleFavButtons from "@/components/HandleFavButtons/HandleFavButtons";
import RestaurantImage from "@/components/RestaurantComponents/RestaurantImage/RestaurantImage";

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
    image,
  } = restaurant;

  return (
    <main className="flex-1 flex flex-col overflow-y-auto">
      <div className="relative w-full h-1/2">
        <RestaurantImage
          src={image || "/images/hero.jpeg"}
          width="w-full"
          height="h-full"
        />
        <div className="absolute top-1/2 translate-y-[-50%] w-full text-center text-white">
          <h2 className="font-bold text-xl sm:text-4xl mb-3">{name}</h2>
          <p className="hidden sm:block">{address}</p>
          <div className="mt-5">
            <HandleFavButtons id={id} isMobile={true} />
          </div>
        </div>
      </div>
      <div className="xl:mx-20 xl:mt-10">
        <div className="lg:grid lg:grid-cols-10 p-5">
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-between">
            <div className="w-full">
              <div className="flex flex-row gap-2 items-center sm:mb-3">
                <span className="hidden sm:block">
                  <RestaurantCuisineType cuisine_type={cuisine_type} />
                </span>
                <h2 className="text-lg sm:text-2xl font-bold">{name}</h2>
              </div>
              <p>
                <span className="text-sm sm:text-base font-bold">
                  Neighborhood:
                </span>
                <span className="text-sm sm:text-base"> {neighborhood}</span>
              </p>
              <p>
                <span className="text-sm sm:text-base font-bold">Address:</span>
                <span className="text-sm sm:text-base"> {address}</span>
              </p>
            </div>
            <div className="hidden md:block mt-5 lg:mt-0">
              <RestaurantOperatingHours
                operating_hours={operating_hours}
                size="large"
              />
            </div>
          </div>
          <div className="mt-5 lg:mt-0 lg:col-span-4 xl:col-span-3 border border-black rounded-lg">
            <AddReviewForm />
          </div>
        </div>
        <div className="xl:grid xl:grid-cols-10 text-left">
          <div className="xl:col-span-7">
            <ReviewsList reviews={reviews} />
          </div>
        </div>
      </div>
    </main>
  );
}
