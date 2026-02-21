import NewRestaurantForm from "@/components/RestaurantComponents/NewRestaurantForm/NewRestaurantForm";
import { getCurrentUserId } from "../../api/auth/dal";

export default async function CreateRestaurant() {
  const loggedUserId = await getCurrentUserId();
  return <NewRestaurantForm loggedUserId={loggedUserId!} />;
}
