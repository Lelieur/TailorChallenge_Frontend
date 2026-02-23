import ReviewsList from '@/components/ReviewComponents/ReviewsList/ReviewsLists';
import RestaurantCuisineType from '@/components/RestaurantComponents/RestaurantCuisineType/RestaurantCuisineType';
import RestaurantOperatingHours from '@/components/RestaurantComponents/RestaurantOperatingHours/RestaurantOperatingHours';
import AddReviewForm from '@/components/ReviewComponents/AddReviewForm/AddReviewForm';
import HandleFavButtons from '@/components/HandleFavButtons/HandleFavButtons';
import RestaurantImage from '@/components/RestaurantComponents/RestaurantImage/RestaurantImage';
import { getRestaurantById } from '@/services/restaurant.server.services';
import { getCurrentUser } from '@/app/api/auth/dal';

export default async function RestaurantPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const restaurant = await getRestaurantById(id);
  const loggedUser = await getCurrentUser();

  const { name, address, neighborhood, cuisine_type, reviews, operating_hours, image } = restaurant;

  return (
    <main className="flex flex-1 flex-col overflow-y-auto">
      <div className="relative h-1/2 w-full">
        <RestaurantImage src={image || '/images/hero.jpeg'} width="w-full" height="h-full" />
        <div className="absolute top-1/2 w-full translate-y-[-50%] text-center text-white">
          <h2 className="mb-3 text-xl font-bold sm:text-4xl">{name}</h2>
          <p className="hidden sm:block">{address}</p>
          <div className="mt-5">
            <HandleFavButtons restaurantId={id} isMobile={true} loggedUser={loggedUser!} />
          </div>
        </div>
      </div>
      <div className="xl:mx-20 xl:mt-10">
        <div className="p-5 lg:grid lg:grid-cols-10">
          <div className="flex flex-col justify-between lg:col-span-6 xl:col-span-7">
            <div className="w-full">
              <div className="flex flex-row items-center gap-2 sm:mb-3">
                <span className="hidden sm:block">
                  <RestaurantCuisineType cuisine_type={cuisine_type} />
                </span>
                <h2 className="text-lg font-bold sm:text-2xl">{name}</h2>
              </div>
              <p>
                <span className="text-sm font-bold sm:text-base">Neighborhood:</span>
                <span className="text-sm sm:text-base"> {neighborhood}</span>
              </p>
              <p>
                <span className="text-sm font-bold sm:text-base">Address:</span>
                <span className="text-sm sm:text-base"> {address}</span>
              </p>
            </div>
            <div className="mt-5 hidden md:block lg:mt-0">
              <RestaurantOperatingHours operating_hours={operating_hours} size="large" />
            </div>
          </div>
          <div className="mt-5 rounded-lg border border-black lg:col-span-4 lg:mt-0 xl:col-span-3">
            <AddReviewForm loggedUser={loggedUser} restaurantId={id} />
          </div>
        </div>
        <div className="text-left xl:grid xl:grid-cols-10">
          <div className="xl:col-span-7">
            <ReviewsList reviews={reviews} />
          </div>
        </div>
      </div>
    </main>
  );
}
