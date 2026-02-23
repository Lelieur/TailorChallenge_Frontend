export type MarkerType = { lat: number; lng: number; id?: string };

export type MapboxSelection = {
  label: string;
  lat: number;
  lng: number;
  featureType?: string;
  raw: unknown;
};

export type Props = {
  onSelect: (selection: MapboxSelection) => void;
  placeholder?: string;
  id?: string;
};

export type AutocompleteAddressProps = {
  onSelect: (selection: MapboxSelection) => void;
  placeholder?: string;
  id?: string;
};
