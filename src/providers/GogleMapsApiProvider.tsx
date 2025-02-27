"use client";

import { Libraries, useJsApiLoader } from "@react-google-maps/api";
import { ReactNode } from "react";
import LoadingMap from "@/components/LoadingMap/LoadingMap";

const libraries = ["places"];

export function GogleMapsApiProvider({ children }: { children: ReactNode }) {
  const { isLoaded: scriptLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: libraries as Libraries,
  });

  if (loadError) return <p>Encountered error while loading google maps</p>;

  if (!scriptLoaded)
    return (
      <div className="w-full h-full flex justify-center items-center bg-gray-900">
        <LoadingMap />
      </div>
    );

  return children;
}
