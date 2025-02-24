"use client";

import { useState } from "react";

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
  return (
    <form action="" className="h-full p-3 flex flex-col justify-between">
      <div>
        <input
          type="radio"
          id="rating"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
        />
        <textarea
          id="comment"
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          placeholder="Escribe tu comentario sobre el restaurante"
          className="w-full resize-none"
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
