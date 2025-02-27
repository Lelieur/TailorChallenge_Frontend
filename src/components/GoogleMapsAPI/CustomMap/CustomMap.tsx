"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
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

  useEffect(() => {
    if (!mapRef.current || markers.length === 0) return;

    const bounds = new google.maps.LatLngBounds();
    markers.forEach((marker) => {
      bounds.extend(new google.maps.LatLng(marker.lat, marker.lng));
    });

    mapRef.current.fitBounds(bounds);
  }, [markers]);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (mapRef.current && markers.length > 0) {
        window.google.maps.event.trigger(mapRef.current, "resize");

        const bounds = new google.maps.LatLngBounds();
        markers.forEach((marker) => {
          bounds.extend(new google.maps.LatLng(marker.lat, marker.lng));
        });
        mapRef.current.fitBounds(bounds);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [markers]);

  const mapOptions: google.maps.MapOptions = {
    disableDefaultUI: true,
    styles: darkMapStyle,
  };

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={mapOptions}
    >
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={{ lat: marker.lat, lng: marker.lng }}
          icon={{ url: "/assets/marker.svg" }}
        />
      ))}
    </GoogleMap>
  );
}
