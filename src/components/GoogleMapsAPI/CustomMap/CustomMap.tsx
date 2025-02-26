"use client";

import { useCallback, useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import { Restaurant } from "@/interfaces/Restaurant.interface";

import darkMapStyle from "@/styles/darkMapStyle";
import RestaurantServices from "@/services/restaurant.services";
import Spinner from "@/components/Spinner/Spinner";

interface MarkerType {
  lat: number;
  lng: number;
}

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

export default function CustomMap() {
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: restaurants } =
          await RestaurantServices.getAllRestaurants();
        const markersData = restaurants.map(
          (restaurant: Restaurant) => restaurant.latlng
        );
        setMarkers(markersData);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchData();
    setIsLoading(false);
  }, []);

  const fitBoundsToMarkers = useCallback(
    (mapInstance: google.maps.Map) => {
      if (markers.length === 0) return;
      const bounds = new google.maps.LatLngBounds();
      markers.forEach((marker) => {
        bounds.extend(new google.maps.LatLng(marker.lat, marker.lng));
      });
      mapInstance.fitBounds(bounds);
    },
    [markers]
  );

  const onLoad = useCallback(
    (map: google.maps.Map) => {
      fitBoundsToMarkers(map);
    },
    [fitBoundsToMarkers]
  );

  const onUnmount = useCallback(() => {
    setMarkers([]);
  }, []);

  const mapOptions: google.maps.MapOptions = {
    disableDefaultUI: true,
    styles: darkMapStyle,
  };

  return isLoading ? (
    <div className="w-full h-full flex justify-center items-center bg-gray-900">
      <Spinner />
    </div>
  ) : (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""}
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={mapOptions}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: "/assets/marker.svg",
            }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}
