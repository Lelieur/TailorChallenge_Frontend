"use client";

import { useCallback, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import darkMapStyle from "@/styles/darkMapStyle";

interface MarkerType {
  lat: number;
  lng: number;
}

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

export default function CustomMap({ markers }: { markers: MarkerType[] }) {
  const [map, setMap] = useState<google.maps.Map | null>(null);

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
    setMap(null);
  }, []);

  const mapOptions: google.maps.MapOptions = {
    disableDefaultUI: true,
    styles: darkMapStyle,
  };

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
