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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const DAYS_ES = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"] as const;

type DayEs = (typeof DAYS_ES)[number];
type DayEn = keyof Restaurant["operating_hours"];

const DAY_EQUIVALENCE: Record<DayEs, DayEn> = {
  Lunes: "Monday",
  Martes: "Tuesday",
  Miércoles: "Wednesday",
  Jueves: "Thursday",
  Viernes: "Friday",
  Sábado: "Saturday",
  Domingo: "Sunday",
};

type Hours = Record<DayEs, string>;
type ClosedDays = Record<DayEs, boolean>;

function formatTime(value: string): string {
  if (!value) return "";
  const [h, m] = value.split(":");
  const hour = Number(h);
  if (!Number.isFinite(hour) || !m) return value;
  const period = hour < 12 ? "am" : "pm";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${m} ${period}`;
}

function buildOperatingHours(
  openHours: Hours,
  closeHours: Hours,
  closedDays: ClosedDays,
): Restaurant["operating_hours"] {
  return DAYS_ES.reduce(
    (acc, day) => {
      const enDay = DAY_EQUIVALENCE[day];
      if (closedDays[day]) {
        acc[enDay] = "-";
        return acc;
      }
      const open = openHours[day];
      const close = closeHours[day];
      acc[enDay] = open && close ? `${formatTime(open)} - ${formatTime(close)}` : "-";
      return acc;
    },
    {} as Restaurant["operating_hours"],
  );
}

function emptyHours(): Hours {
  return DAYS_ES.reduce((acc, day) => {
    acc[day] = "";
    return acc;
  }, {} as Hours);
}

function emptyClosedDays(): ClosedDays {
  return DAYS_ES.reduce((acc, day) => {
    acc[day] = false;
    return acc;
  }, {} as ClosedDays);
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
  const [closedDays, setClosedDays] = useState<ClosedDays>(emptyClosedDays());

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
    const day = name as DayEs;
    setOpenHours((prev) => ({ ...prev, [day]: value }));
  };

  const handleCloseHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const day = name as DayEs;
    setCloseHours((prev) => ({ ...prev, [day]: value }));
  };

  const handleClosedToggle = (day: DayEs) => {
    setClosedDays((prev) => {
      const next = { ...prev, [day]: !prev[day] };
      return next;
    });
    setOpenHours((prev) => ({ ...prev, [day]: "" }));
    setCloseHours((prev) => ({ ...prev, [day]: "" }));
  };

  const applyHoursToDays = (sourceDay: DayEs, targetDays: readonly DayEs[]) => {
    const open = openHours[sourceDay];
    const close = closeHours[sourceDay];
    const isClosed = closedDays[sourceDay];
    setOpenHours((prev) => {
      const next = { ...prev };
      targetDays.forEach((day) => {
        next[day] = open;
      });
      return next;
    });
    setCloseHours((prev) => {
      const next = { ...prev };
      targetDays.forEach((day) => {
        next[day] = close;
      });
      return next;
    });
    setClosedDays((prev) => {
      const next = { ...prev };
      targetDays.forEach((day) => {
        isClosed ? (next[day] = true) : (next[day] = false);
      });
      return next;
    });
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
      operating_hours: buildOperatingHours(openHours, closeHours, closedDays),
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
              <Select>
                <SelectTrigger className="rounded-full border-black">
                  <SelectValue placeholder="Selecciona..." />
                </SelectTrigger>
                <SelectContent position="item-aligned">
                  <SelectGroup>
                    <SelectItem value="Asian">🍱 Asiática</SelectItem>
                    <SelectItem value="American">🍔 Americana</SelectItem>
                    <SelectItem value="Pizza">🍕 Pizza</SelectItem>
                    <SelectItem value="Mexican">🌮 Mexicana</SelectItem>
                    <SelectItem value="Healthy">🥗 Saludable</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/* <select
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
              </select> */}
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
          <label className="mb-2 block" htmlFor="operating_hours">
            Horarios de apertura:
          </label>
          <div className="mb-2 flex flex-wrap items-center gap-2 text-sm">
            <BasicButton
              type="button"
              text="Copiar lunes a todos"
              action={() => applyHoursToDays("Lunes", DAYS_ES)}
            />
            <BasicButton
              type="button"
              text="Lun–Vie"
              action={() =>
                applyHoursToDays("Lunes", ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"])
              }
            />
            <BasicButton
              type="button"
              text="Sáb–Dom"
              action={() => applyHoursToDays("Sábado", ["Sábado", "Domingo"])}
            />
          </div>
          {DAYS_ES.map((day) => (
            <div key={day} className="grid h-10 grid-cols-10 items-center text-base">
              <label htmlFor={day} className="col-span-2">
                {day}:
              </label>
              <label className="col-span-2 flex items-center gap-2 text-sm">
                <Checkbox
                  className="cursor-pointer"
                  checked={closedDays[day]}
                  onCheckedChange={() => handleClosedToggle(day)}
                />
                Cerrado
              </label>
              {!closedDays[day] && (
                <div className="col-span-6 mr-0 flex items-center gap-2 rounded-xl border border-black px-3 py-1">
                  <span>De:</span>
                  <input
                    type="time"
                    id={day}
                    name={day}
                    value={openHours[day]}
                    onChange={handleOpenHoursChange}
                    className={`w-1/2 ${!closedDays[day] && "cursor-pointer"} text-center focus:outline-none`}
                    required={!closedDays[day]}
                    disabled={closedDays[day]}
                  />
                  <span>a</span>
                  <input
                    type="time"
                    id={day}
                    name={day}
                    value={closeHours[day]}
                    onChange={handleCloseHoursChange}
                    className={`w-1/2 ${!closedDays[day] && "cursor-pointer"} text-center focus:outline-none`}
                    required={!closedDays[day]}
                    disabled={closedDays[day]}
                  />
                </div>
              )}
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
