"use client";

import ReviewServices from "@/services/client/review";
import type { Review } from "@/interfaces/Review.inteface";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BasicButton from "@/components/Buttons/BasicButton";
import DynamicStarts from "@/components/Stars/DynamicStars/DynamicStars";
import { handleWithToast, handleSubmitWithToast } from "@/lib/handleWithToast";

export default function EditReviewForm({ review, canEdit }: { review: Review; canEdit: boolean }) {
  const router = useRouter();
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [comments, setComments] = useState(review.comments ?? "");
  const [rating, setRating] = useState(review.rating ?? 0);

  useEffect(() => {
    setComments(review.comments ?? "");
    setRating(review.rating ?? 0);
    setIsEditEnabled(false);
  }, [review.id, review.comments, review.rating]);

  const updateReview = async () => {
    await ReviewServices.updateReview(review.id!, {
      ...review,
      comments,
      rating,
    });
    setIsEditEnabled(false);
    return "refresh";
  };

  const deleteReview = async () => {
    await ReviewServices.deleteReview(review.id!);
    return "refresh";
  };

  const onCancel = () => {
    setComments(review.comments ?? "");
    setRating(review.rating ?? 0);
    setIsEditEnabled(false);
  };

  const isDirty = comments !== (review.comments ?? "") || rating !== (review.rating ?? 0);

  const handleRatingChange = (value: number) => {
    if (!isEditEnabled) return;
    setRating(value);
  };

  return (
    <form
      onSubmit={(e) =>
        handleSubmitWithToast({
          event: e,
          apiCall: updateReview,
          success: "¡Reseña actualizada!",
          navigate: () => router.refresh(),
          isSubmitting: () => setIsEditEnabled(false),
        })
      }
      className="border-b border-[var(--tailor-blue)] p-5 sm:grid sm:grid-cols-10 sm:items-center"
    >
      <div className="col-span-10 ml-auto flex flex-col gap-1">
        <DynamicStarts
          rating={rating}
          setRating={handleRatingChange}
          isEditEnabled={isEditEnabled}
        />
        <p className="text-right text-xs">{review.date}</p>
      </div>
      <div className="col-span-10 mt-3 grid grid-cols-12">
        <p className="col-span-2 text-xl leading-none font-bold">{review.name}</p>

        <div className="col-span-10 sm:pl-5">
          <fieldset disabled={!isEditEnabled}>
            <textarea
              value={comments}
              onChange={(event) => setComments(event.target.value)}
              placeholder="Escribe tu comentario sobre el restaurante"
              className={`w-full resize-none text-justify text-xs leading-6 focus:outline-none sm:text-sm ${
                !isEditEnabled ? "opacity-80" : ""
              }`}
            />
          </fieldset>
        </div>
      </div>

      {canEdit && (
        <div className="col-span-10 mr-0 ml-auto grid grid-cols-2 gap-2">
          {!isEditEnabled ? (
            <>
              <BasicButton type="button" text="Editar" action={() => setIsEditEnabled(true)} />
              <BasicButton
                type="button"
                text={isDeleting ? "Eliminando..." : "Eliminar"}
                action={() =>
                  handleWithToast({
                    action: deleteReview,
                    data: review.id!.toString(),
                    success: "¡Reseña eliminada!",
                    navigate: () => router.refresh(),
                    updateState: setIsDeleting,
                  })
                }
                disabled={isDeleting}
              />
            </>
          ) : (
            <>
              <BasicButton type="button" text="Cancelar" action={onCancel} />
              <BasicButton type="submit" text="Guardar" disabled={!isDirty} />
            </>
          )}
        </div>
      )}
    </form>
  );
}
