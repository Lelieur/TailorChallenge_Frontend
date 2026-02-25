export interface Review {
  id?: string;
  name: string;
  date: string;
  rating: number;
  comments: string;
  authorId: string;
  restaurantId: string;
}
