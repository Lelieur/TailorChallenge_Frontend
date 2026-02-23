"use client";

import { useMemo, useState } from "react";
import { SearchBox } from "@mapbox/search-js-react";
import { AutocompleteAddressProps } from "@/lib/mapbox/types";

const ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? "";

const themeLikeTailwindInput = {
  variables: {
    fontFamily: "inherit",
    padding: "0.25rem 0.75rem",
    border: "1px solid #000",
    boxShadow: "none",
    colorText: "#000",
    colorBackground: "#fff",
    colorPrimary: "#000",
    colorBackgroundHover: "#f3f4f6",
    colorBackgroundActive: "#e5e7eb",
  },
};

export default function AutocompleteAddress({
  onSelect,
  placeholder,
  id,
}: AutocompleteAddressProps) {
  const [value, setValue] = useState("");

  const types = useMemo(() => {
    if (id === "neighborhood") {
      return new Set(["neighborhood", "locality", "place", "region"] as const);
    }
    return "address";
  }, [id]);

  return (
    <SearchBox
      accessToken={ACCESS_TOKEN}
      theme={themeLikeTailwindInput}
      value={value}
      onChange={setValue}
      placeholder={placeholder}
      options={{
        types,
      }}
      onRetrieve={(res) => {
        const f = res.features?.[0];
        if (!f?.geometry?.coordinates) return;

        const [lng, lat] = f.geometry.coordinates;
        if (typeof lat !== "number" || typeof lng !== "number") return;

        const label =
          (f.properties as any)?.full_address || (f.properties as any)?.name || `${lat}, ${lng}`;

        onSelect({
          label,
          lat,
          lng,
          featureType: (f.properties as any)?.feature_type,
          raw: f,
        });
      }}
    />
  );
}
