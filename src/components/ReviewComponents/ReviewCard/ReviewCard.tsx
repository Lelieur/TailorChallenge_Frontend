"use client";

import { Review } from "@/interfaces/Review.inteface";
import { useContext } from "react";
import { AuthContext } from "@/context/auth.context";

import ReviewServices from "@/services/review.services";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Stars from "@/components/Stars/Stars";
import EditReviewForm from "../EditReviewForm/EditReviewForm";

export default function ReviewCard({ review }: { review: any }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const { loggedUser } = useContext(AuthContext);
  const { name, date, rating, comments, authorId } = review;

  const handleDeleteReview = () => {
    if (!review._id) return;

    ReviewServices.deleteReview(review._id)
      .then(() => {
        router.refresh();
      })
      .catch((error) => {
        console.error("Error deleting review", error);
      });
  };

  return isEditing ? (
    <EditReviewForm review={review} setIsEditing={setIsEditing} />
  ) : (
    <div className="grid grid-cols-10 items-center border-b border-[var(--tailor-blue)] p-5">
      <p className="font-bold text-xl">{name}</p>
      <div className="col-span-9 pl-5">
        <div className="w-full flex flex-col items-end mb-3">
          <p className="text-xs">{date}</p>
          <Stars rating={rating} />
        </div>
        <p className="text-sm text-justify">{comments}</p>
      </div>
      {loggedUser && loggedUser?.id === authorId && (
        <div className="col-span-10 flex justify-end items-end gap-3">
          <button
            className="font-bold border border-black px-4 py-2 rounded-xl"
            onClick={() => setIsEditing(true)}
          >
            Editar
          </button>
          <button
            className="font-bold border border-black px-4 py-2 rounded-xl"
            onClick={() => handleDeleteReview()}
          >
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
}
