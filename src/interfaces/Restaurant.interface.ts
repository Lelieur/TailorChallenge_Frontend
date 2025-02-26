export interface Restaurant {
  _id?: string;
  name?: string;
  neighborhood?: string;
  address?: string;
  image?: string;
  description?: string;
  cuisine_type?: string;
  latlng?: {
    lat: number;
    lng: number;
  };
  operating_hours?: {
    Monday?: string;
    Tuesday?: string;
    Wednesday?: string;
    Thursday?: string;
    Friday?: string;
    Saturday?: string;
    Sunday?: string;
  };
  reviews?: [];
  createdBy?: string;
}
