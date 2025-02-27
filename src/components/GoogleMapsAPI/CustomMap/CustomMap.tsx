"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import { Restaurant } from "@/interfaces/Restaurant.interface";

import darkMapStyle from "@/styles/darkMapStyle";
import RestaurantServices from "@/services/restaurant.services";
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
  const mapRef = useRef<google.maps.Map | null>(null);

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
      window.google.maps.event.trigger(map, "resize");
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

  useEffect(() => {
    const handleResize = () => {
      if (mapRef.current) {
        window.google.maps.event.trigger(mapRef.current, "resize");
        // Opcionalmente, reubicar los límites
        if (markers.length > 0) {
          fitBoundsToMarkers(mapRef.current);
        }
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [markers, fitBoundsToMarkers]);

  return (
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
