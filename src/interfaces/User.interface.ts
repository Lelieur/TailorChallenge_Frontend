export interface User {
  id: string;
  username: string;
  email: string;
  favoriteRestaurants: string[];
  reviews: string[];
}

export interface SignUpUser {
  username: string;
  email: string;
  password: string;
}
