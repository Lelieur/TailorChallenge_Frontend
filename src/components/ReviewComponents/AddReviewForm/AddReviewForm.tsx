"use client";

import { useState, useContext } from "react";
import { useParams } from "next/navigation";
import { AuthContext } from "@/context/auth.context";

import Star from "@/assets/star.svg";
import ReviewServices from "@/services/review.services";

import { useRouter } from "next/navigation";

import { Review } from "@/interfaces/Review.inteface";

export default function AddReviewForm() {
  const router = useRouter();
  const { id } = useParams();
  const { loggedUser } = useContext(AuthContext);

  const [formData, setFormData] = useState<Review>({
    rating: 0,
    name: loggedUser?.username || "",
    date: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    comments: "",
    authorId: loggedUser?.id || "",
    restaurantId: (id as string) || "",
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
    ReviewServices.createReview(formData)
      .then(() => {
        setFormData({
          rating: 0,
          name: "",
          date: "",
          comments: "",
          authorId: "",
          restaurantId: "",
        });
      })
      .then(() => {
        router.refresh();
      })
      .catch((error) => {
        console.log(error);
      });
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
                formData.rating && formData.rating >= index + 1
                  ? "opacity-100"
                  : "opacity-50"
              }`}
            />
          ))}
        </div>
        <textarea
          id="comments"
          name="comments"
          value={formData.comments}
          onChange={handleChange}
          placeholder="Escribe tu comentario sobre el restaurante"
          className="test-sm sm:text-base w-full resize-none focus:outline-none"
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
