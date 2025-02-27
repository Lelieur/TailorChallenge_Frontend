"use client";

import { useState, useRef, useContext } from "react";
import { useRouter } from "next/navigation";

import { AuthContext } from "@/context/auth.context";
import { Restaurant } from "@/interfaces/Restaurant.interface";
import { GogleMapsApiProvider } from "@/providers/GogleMapsApiProvider";

import UploadServices from "@/services/cloudinary.services";
import RestaurantClientServices from "@/services/restaurant.client.services";

import Spinner from "@/components/Spinner/Spinner";
import RestaurantImage from "@/components/RestaurantComponents/RestaurantImage/RestaurantImage";
import AutocompleteAddress from "@/components/GoogleMapsAPI/AutocompleteAddress/AutocompleteAddress";

export default function NewRestaurantForm() {
  const router = useRouter();
  const imageFileInputRef = useRef<HTMLInputElement | null>(null);

  const { loggedUser } = useContext(AuthContext);

  const [formData, setFormData] = useState<Restaurant>({
    name: "",
    neighborhood: "",
    address: "",
    image: "",
    description: "",
    cuisine_type: "",
    latlng: {
      lat: 0,
      lng: 0,
    },
    operating_hours: {
      Monday: "-",
      Tuesday: "-",
      Wednesday: "-",
      Thursday: "-",
      Friday: "-",
      Saturday: "-",
      Sunday: "-",
    },
    reviews: [],
    createdBy: loggedUser?.id || "",
  });

  const [isImageLoading, setIsImageLoading] = useState(false);
  const [staticOpenHours, setStaticOpenHours] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddressChanged = (place: google.maps.places.PlaceResult) => {
    setFormData({
      ...formData,
      ["address"]: place.formatted_address,
      ["latlng"]: {
        lat: place.geometry?.location?.lat() || 0,
        lng: place.geometry?.location?.lng() || 0,
      },
    });
  };

  const handleNeighborhoodChanged = (place: google.maps.places.PlaceResult) => {
    setFormData({
      ...formData,
      ["neighborhood"]: place.formatted_address?.split(",")[0] || "",
    });
  };

  const handleImageButtonClick = () => {
    if (imageFileInputRef.current) {
      imageFileInputRef.current.click();
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      try {
        const imageUrl = await UploadServices.uploadImage(e.target.files[0]);

        setFormData({
          ...formData,
          ["image"]: imageUrl,
        });
        setIsImageLoading(false);
      } catch (error) {
        console.error("Error subiendo la imagen:", error);
      }
    }
  };

  const handleOpenHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const day: keyof Restaurant["operating_hours"] =
      name as keyof Restaurant["operating_hours"];

    setFormData({
      ...formData,
      ["operating_hours"]: {
        ...formData.operating_hours,
        [day]:
          value < "13"
            ? value + " am"
            : (Number(value.slice(0, 2)) - 12).toString() +
              value.slice(2) +
              " pm",
      },
    });

    setStaticOpenHours(
      value < "13"
        ? value + " am"
        : (Number(value.slice(0, 2)) - 12).toString() + value.slice(2) + " pm"
    );
  };

  const handleCloseHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const day: keyof Restaurant["operating_hours"] =
      name as keyof Restaurant["operating_hours"];

    setFormData({
      ...formData,
      ["operating_hours"]: {
        ...formData.operating_hours,
        [day]: formData.operating_hours && staticOpenHours,
      },
    });

    setFormData({
      ...formData,
      ["operating_hours"]: {
        ...formData.operating_hours,
        [day]:
          staticOpenHours +
          " - " +
          (value < "13"
            ? value + " am"
            : (Number(value.slice(0, 2)) - 12).toString() +
              value.slice(2) +
              " pm"),
      },
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    RestaurantClientServices.createRestaurant(formData)
      .then((response) => {
        router.push(`/success/${response.data._id}`);
      })
      .catch((error) => {
        console.error("Error creando el restaurante:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full sm:w-3/4 m-auto">
      <div className="grid grid-cols-2 gap-3">
        {formData.image === "" ? (
          <div className="col-span-2 md:col-span-1">
            <button
              type="button"
              onClick={() => handleImageButtonClick()}
              className="w-full bg-gray-200 rounded-xl aspect-square border border-black"
            >
              {isImageLoading ? <Spinner /> : "Añadir imagen"}
            </button>
            <input
              type="file"
              id="image"
              name="image"
              ref={imageFileInputRef}
              onChange={(e) => {
                handleImageUpload(e);
                setIsImageLoading(true);
              }}
              className="hidden"
            />
          </div>
        ) : (
          <div className="col-span-2 md:col-span-1 w-full relative">
            <RestaurantImage src={formData?.image || ""} width="w-full" />
            <button
              type="button"
              onClick={() => setFormData({ ...formData, ["image"]: "" })}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-white text-white rounded-xl px-5 py-1"
            >
              Eliminar
            </button>
          </div>
        )}
        <div className="col-span-2 md:col-span-1 flex flex-col gap-3">
          <div>
            <label htmlFor="name">Nombre del restaurante:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nombre del restaurante"
              className="block w-full rounded-full border border-black px-3 py-1 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="address">Dirección del restaurante:</label>
            <GogleMapsApiProvider>
              <AutocompleteAddress
                handleAddressChanged={handleAddressChanged}
                placeholder="Dirección"
                id="address"
              />
            </GogleMapsApiProvider>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="neighborhood">Barrio:</label>
              <GogleMapsApiProvider>
                <AutocompleteAddress
                  handleAddressChanged={handleNeighborhoodChanged}
                  placeholder="Barrio"
                  id="neighborhood"
                />
              </GogleMapsApiProvider>
            </div>
            <div>
              <label htmlFor="cuisine_type">Tipo de cocina:</label>
              <select
                id="cuisine_type"
                name="cuisine_type"
                value={formData.cuisine_type}
                onChange={handleChange}
                className="block w-full rounded-xl border border-black px-3 py-1 focus:outline-none"
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
              value={formData.description}
              onChange={handleChange}
              placeholder="Escribe información acerca del restaurante"
              className="w-full resize-none focus:outline-none rounded-xl border border-black px-3 py-1"
            />
          </div>
        </div>
        <div className="col-span-2">
          <label htmlFor="operating_hours">Horarios de apertura:</label>
          {formData.operating_hours &&
            Object.keys(formData.operating_hours).map((day) => (
              <div
                key={day}
                className="grid grid-cols-3 text-base items-center mb-2"
              >
                <label htmlFor={day} className="col-span-1">
                  {day}:
                </label>
                <div className="col-span-2 flex border border-black rounded-xl px-3 py-1">
                  <span>De:</span>
                  <input
                    type="time"
                    id={day}
                    name={day}
                    onChange={handleOpenHoursChange}
                    className="text-center w-1/2 cursor-pointer focus:outline-none"
                  />
                  <span>a</span>
                  <input
                    type="time"
                    id={day}
                    name={day}
                    onChange={handleCloseHoursChange}
                    className="text-center w-1/2 cursor-pointer focus:outline-none"
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
      <button
        type="submit"
        className="text-black font-bold border border-black px-3 py-1 rounded-xl mt-5 block w-full"
      >
        Guardar{" "}
      </button>
    </form>
  );
}
