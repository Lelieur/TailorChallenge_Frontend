"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { Restaurant } from "@/interfaces/Restaurant.interface";

import UploadServices from "@/services/cloudinary.services";
import RestaurantClientServices from "@/services/client/restaurant";

import Spinner from "@/components/Spinner/Spinner";
import RestaurantImage from "@/components/RestaurantComponents/RestaurantImage/RestaurantImage";
import { MapboxSelection } from "@/lib/mapbox/types";
import AutocompleteAddress from "@/components/Mapbox/Search/AutocompleteAddress";
import { handleSubmitWithToast } from "@/lib/handleWithToast";
import BasicButton from "@/components/Buttons/BasicButton";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

type Day = (typeof DAYS)[number];

type Hours = Record<Day, string>;

function formatTime(value: string): string {
  if (!value) return "";
  const [h, m] = value.split(":");
  const hour = Number(h);
  if (!Number.isFinite(hour) || !m) return value;
  const period = hour < 12 ? "am" : "pm";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${m} ${period}`;
}

function buildOperatingHours(openHours: Hours, closeHours: Hours): Restaurant["operating_hours"] {
  return DAYS.reduce(
    (acc, day) => {
      const open = openHours[day];
      const close = closeHours[day];
      acc[day] = open && close ? `${formatTime(open)} - ${formatTime(close)}` : "-";
      return acc;
    },
    {} as Restaurant["operating_hours"],
  );
}

function emptyHours(): Hours {
  return DAYS.reduce((acc, day) => {
    acc[day] = "";
    return acc;
  }, {} as Hours);
}

export default function NewRestaurantForm({ loggedUserId }: { loggedUserId: string }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement | null>(null);
  const imageFileInputRef = useRef<HTMLInputElement | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [latlng, setLatlng] = useState({ lat: 0, lng: 0 });
  const [openHours, setOpenHours] = useState<Hours>(emptyHours());
  const [closeHours, setCloseHours] = useState<Hours>(emptyHours());

  const handleAddressChanged = (sel: MapboxSelection) => {
    setAddress(sel.label);
    setLatlng({ lat: sel.lat, lng: sel.lng });
  };

  const handleNeighborhoodChanged = (sel: MapboxSelection) => {
    setNeighborhood(sel.label.split(",")[0]?.trim() ?? "");
  };

  const handleImageButtonClick = () => {
    imageFileInputRef.current?.click();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setIsImageLoading(true);
    try {
      const url = await UploadServices.uploadImage(e.target.files[0]);
      setImageUrl(url);
    } catch (error) {
      console.error("Error subiendo la imagen:", error);
    } finally {
      setIsImageLoading(false);
    }
  };

  const handleOpenHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const day = name as Day;
    setOpenHours((prev) => ({ ...prev, [day]: value }));
  };

  const handleCloseHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const day = name as Day;
    setCloseHours((prev) => ({ ...prev, [day]: value }));
  };

  const apiCall = async (formData: FormData) => {
    const payload: Restaurant = {
      name: String(formData.get("name") ?? ""),
      neighborhood,
      address,
      image: imageUrl,
      description: String(formData.get("description") ?? ""),
      cuisine_type: String(formData.get("cuisine_type") ?? ""),
      latlng,
      operating_hours: buildOperatingHours(openHours, closeHours),
      reviews: [],
      createdBy: loggedUserId || "",
    };

    const res = await RestaurantClientServices.createRestaurant(payload);
    return `/success/${res.data.id}`;
  };

  return (
    <form
      ref={formRef}
      onSubmit={(e) =>
        handleSubmitWithToast({
          event: e,
          apiCall: apiCall,
          navigate: (to: string) => router.push(to),
          success: "Restaurante creado",
          isSubmitting: setIsSubmitting,
        })
      }
      className="m-auto w-full sm:w-3/4"
    >
      <div className="grid grid-cols-2 gap-3">
        {imageUrl === "" ? (
          <div className="col-span-2 md:col-span-1">
            <button
              type="button"
              onClick={handleImageButtonClick}
              className="aspect-square w-full cursor-pointer rounded-xl border border-black bg-gray-200"
            >
              {isImageLoading ? <Spinner /> : "Añadir imagen"}
            </button>
            <input
              type="file"
              id="image"
              name="image"
              ref={imageFileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        ) : (
          <div className="relative col-span-2 w-full md:col-span-1">
            <RestaurantImage src={imageUrl} width="w-full" />
            <button
              type="button"
              onClick={() => setImageUrl("")}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer rounded-xl border border-white px-5 py-1 text-white"
            >
              Eliminar
            </button>
          </div>
        )}
        <div className="col-span-2 flex flex-col gap-3 md:col-span-1">
          <div>
            <label htmlFor="name">Nombre del restaurante:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Nombre del restaurante"
              className="block w-full rounded-full border border-black px-3 py-1 focus:outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="address">Dirección del restaurante:</label>
            <AutocompleteAddress
              onSelect={handleAddressChanged}
              placeholder="Dirección"
              id="address"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="neighborhood">Barrio:</label>
              <AutocompleteAddress
                onSelect={handleNeighborhoodChanged}
                placeholder="Barrio"
                id="neighborhood"
              />
            </div>
            <div>
              <label htmlFor="cuisine_type">Tipo de cocina:</label>
              <select
                id="cuisine_type"
                name="cuisine_type"
                className="block w-full rounded-xl border border-black px-3 py-1 focus:outline-none"
                required
              >
                <option value="">Selecciona</option>
                <option value="Asian">🍱 Asiática</option>
                <option value="American">🍔 Americana</option>
                <option value="Pizza">🍕 Pizza</option>
                <option value="Mexican">🌮 Mexicana</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="description">Descripción del restaurante:</label>
            <textarea
              id="description"
              name="description"
              placeholder="Escribe información acerca del restaurante"
              className="w-full resize-none rounded-xl border border-black px-3 py-1 focus:outline-none"
            />
          </div>
        </div>
        <div className="col-span-2">
          <label htmlFor="operating_hours">Horarios de apertura:</label>
          {DAYS.map((day) => (
            <div key={day} className="mb-2 grid grid-cols-3 items-center text-base">
              <label htmlFor={day} className="col-span-1">
                {day}:
              </label>
              <div className="col-span-2 flex rounded-xl border border-black px-3 py-1">
                <span>De:</span>
                <input
                  type="time"
                  id={day}
                  name={day}
                  value={openHours[day]}
                  onChange={handleOpenHoursChange}
                  className="w-1/2 cursor-pointer text-center focus:outline-none"
                  required
                />
                <span>a</span>
                <input
                  type="time"
                  id={day}
                  name={day}
                  value={closeHours[day]}
                  onChange={handleCloseHoursChange}
                  className="w-1/2 cursor-pointer text-center focus:outline-none"
                  required
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <BasicButton
        type="submit"
        text={isSubmitting ? "Guardando..." : "Guardar"}
        disabled={isSubmitting}
      />
    </form>
  );
}
