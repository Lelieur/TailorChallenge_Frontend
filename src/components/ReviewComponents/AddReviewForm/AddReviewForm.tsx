"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import ReviewServices from "@/services/client/review";
import type { Review } from "@/interfaces/Review.inteface";
import type { User } from "@/interfaces/User.interface";
import BasicButton from "@/components/Buttons/BasicButton";
import DynamicStars from "@/components/Stars/DynamicStars/DynamicStars";
import { handleSubmitWithToast } from "@/lib/handleWithToast";

export default function AddReviewForm({
  loggedUser,
  restaurantId,
}: {
  loggedUser: User | null;
  restaurantId: string;
}) {
  const router = useRouter();

  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setRating(0);
    setComments("");
  };

  const apiCall = async () => {
    const payload: Review = {
      rating,
      name: loggedUser?.username || "",
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      comments,
      authorId: loggedUser?.id || "",
      restaurantId: restaurantId || "",
    };

    await ReviewServices.createReview(payload);
    resetForm();
    return "refresh";
  };

  return (
    <form
      onSubmit={(e) =>
        handleSubmitWithToast({
          event: e,
          apiCall: apiCall,
          isSubmitting: setIsSubmitting,
          navigate: () => router.refresh(),
          success: "¡Reseña publicada!",
        })
      }
      className="flex h-full flex-col justify-between p-3"
    >
      <div>
        <DynamicStars rating={rating} setRating={setRating} isEditEnabled={true} />
        <textarea
          id="comments"
          name="comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Escribe tu comentario sobre el restaurante"
          className="test-sm w-full resize-none focus:outline-none sm:text-base"
        />
      </div>
      <BasicButton
        type="submit"
        text={isSubmitting ? "Enviando..." : "Enviar"}
        position="left"
        disabled={isSubmitting}
      />
    </form>
  );
}
