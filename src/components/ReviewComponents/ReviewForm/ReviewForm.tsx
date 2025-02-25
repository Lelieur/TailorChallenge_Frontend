"use client";

import { useState } from "react";
import Star from "@/assets/star.svg";
export default function ReviewForm() {
  const [formData, setFormData] = useState({
    rating: 0,
    comment: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRatingChange = (rating: number) => {
    setFormData({ ...formData, ["rating"]: rating });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-full p-3 flex flex-col justify-between"
    >
      <div>
        <div className="flex flex-row">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={`star-${index}`}
              onClick={() => handleRatingChange(index + 1)}
              className={`cursor-pointer ${
                formData.rating >= index + 1 ? "opacity-100" : "opacity-50"
              }`}
            />
          ))}
        </div>
        <textarea
          id="comment"
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          placeholder="Escribe tu comentario sobre el restaurante"
          className="w-full resize-none focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="px-6 py-2 mt-10 mr-auto font-bold rounded-2xl border border-black text-black hover:bg-black hover:text-white transition-all duration-300"
      >
        Enviar
      </button>
    </form>
  );
}
