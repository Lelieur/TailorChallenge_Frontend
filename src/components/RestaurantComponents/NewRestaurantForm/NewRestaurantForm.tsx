"use client";

import { useState, useRef, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/auth.context";
import { Restaurant } from "@/interfaces/Restaurante.interface";
import { User } from "@/interfaces/User.interface";

import UploadServices from "@/services/cloudinary.services";
import RestaurantServices from "@/services/restaurant.services";

import Spinner from "@/components/Spinner/Spinner";
import RestaurantImage from "@/components/RestaurantComponents/RestaurantImage/RestaurantImage";

export default function NewRestaurantForm() {
  const router = useRouter();
  const imageFileInputRef = useRef<HTMLInputElement | null>(null);
  const { loggedUser } = useContext(AuthContext);

  console.log(loggedUser);

  const [formData, setFormData] = useState<Restaurant>({
    name: "",
    neighborhood: "",
    address: "",
    image: "",
    description: "",
    cuisine_type: "",
    latlang: {
      latitude: 0,
      longitude: 0,
    },
    operating_hours: {
      Monday: "",
      Tuesday: "",
      Wednesday: "",
      Thursday: "",
      Friday: "",
      Saturday: "",
      Sunday: "",
    },
    reviews: [],
    createdBy: loggedUser?.id || "",
  });

  const [isImageLoading, setIsImageLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    RestaurantServices.createRestaurant(formData)
      .then((response) => {
        router.push(`/restaurants/${response.data._id}`);
      })
      .catch((error) => {
        console.error("Error creando el restaurante:", error);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 gap-3 w-3/4 m-auto"
    >
      {formData.image === "" ? (
        <fieldset>
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
        </fieldset>
      ) : (
        <RestaurantImage src={formData.image} width="w-full" />
      )}
      <fieldset>
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
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Dirección"
            className="block w-full rounded-full border border-black px-3 py-1 focus:outline-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="neighborhood">Barrio:</label>
            <input
              type="text"
              id="neighborhood"
              name="neighborhood"
              value={formData.neighborhood}
              onChange={handleChange}
              placeholder="Barrio del restaurante"
              className="block w-full rounded-full border border-black px-3 py-1 focus:outline-none"
            />
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
        <button
          type="submit"
          className="text-black font-bold border border-black px-3 py-1 rounded-xl mt-5"
        >
          Guardar{" "}
        </button>
      </fieldset>
    </form>
  );
}
