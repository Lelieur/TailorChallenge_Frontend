"use client";

import React, { useEffect, useRef } from "react";

interface AutocompleteAddres {
  handleAddressChanged: (place: google.maps.places.PlaceResult) => void;
  placeholder?: string;
  formData?: any;
  id?: string;
}

export default function AutocompleteInput({
  handleAddressChanged,
  placeholder,
  formData,
  id,
}: AutocompleteAddres) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete>(null);

  useEffect(() => {
    if (!window.google || !inputRef.current) return;

    autocompleteRef.current = new google.maps.places.Autocomplete(
      inputRef.current,
      {
        types: [`${id === "neighborhood" ? "(regions)" : "address"}`],
      }
    );

    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current?.getPlace();
      if (place) {
        handleAddressChanged(place);
      }
    });
  }, [handleAddressChanged]);

  return (
    <input
      type="text"
      ref={inputRef}
      name={id}
      value={formData}
      placeholder={placeholder}
      id={id}
      className="block w-full rounded-full border border-black px-3 py-1 focus:outline-none"
      autoComplete="off"
      spellCheck="false"
    />
  );
}
