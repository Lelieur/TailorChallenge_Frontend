"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Review } from "@/interfaces/Review.inteface";

import Star from "@/assets/star.svg";
import ReviewServices from "@/services/review.services";

export default function EditReviewForm({
  review,
  setIsEditing,
}: {
  review: Review;
  setIsEditing: (isEditing: boolean) => void;
}) {
  const router = useRouter();
  const { id } = useParams();

  const [formData, setFormData] = useState<Review>(review);

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
    if (!formData._id) return;

    ReviewServices.updateReview(formData._id, formData)
      .then(() => {
        router.push(`/restaurants/${id}`);
      })
      .then(() => {
        setIsEditing(false);
        router.refresh();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="grid grid-cols-10 items-center border-b border-[var(--tailor-blue)] p-5"
    >
      <p className="font-bold text-xl">{formData.name}</p>
      <div className="col-span-9 pl-5">
        <div className="w-full flex flex-col items-end mb-3">
          <p className="text-xs">{formData.date}</p>
          <div className="flex flex-row justify-end">
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
        </div>
        <textarea
          id="comments"
          name="comments"
          value={formData.comments}
          onChange={handleChange}
          placeholder="Escribe tu comentario sobre el restaurante"
          className="text-sm text-justify w-full resize-none focus:outline-none"
        />
      </div>
      <div className="col-span-10 flex justify-end items-end gap-3">
        <button
          type="submit"
          className="font-bold border border-black px-4 py-2 rounded-xl"
        >
          Terminar edición
        </button>
      </div>
    </form>
  );
}
