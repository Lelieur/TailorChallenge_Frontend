"use client";

import Star from "@/assets/star.svg";
import ReviewServices from "@/services/client/review";
import type { Review } from "@/interfaces/Review.inteface";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

type ReviewFormValues = {
  comments: string;
  rating: number;
};

export default function EditReviewForm({
  review,
  canEdit,
}: {
  review: Review;
  canEdit: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isEditEnabled, setIsEditEnabled] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isDirty },
  } = useForm<ReviewFormValues>({
    defaultValues: {
      comments: review.comments ?? "",
      rating: review.rating ?? 0,
    },
    mode: "onChange",
  });

  useEffect(() => {
    reset({
      comments: review.comments ?? "",
      rating: review.rating ?? 0,
    });
  }, [review._id, review.comments, review.rating, reset]);

  const rating = watch("rating");

  const setRating = (value: number) => {
    if (!isEditEnabled || isPending) return;
    setValue("rating", value, { shouldDirty: true, shouldValidate: true });
  };

  const submit = handleSubmit(async (values) => {
    if (!isEditEnabled || isPending) return;
    if (!review._id) return;

    try {
      await ReviewServices.updateReview(review._id, {
        ...review,
        ...values,
      });

      router.refresh();
    } catch (e) {
      console.error(e);
    }
    setIsEditEnabled(false);
  });

  const onDelete = async () => {
    if (!review._id) return;
    try {
      await ReviewServices.deleteReview(review._id);
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  const cancel = () => {
    reset({
      comments: review.comments ?? "",
      rating: review.rating ?? 0,
    });
    setIsEditEnabled(false);
  };

  return (
    <form
      onSubmit={submit}
      className="sm:grid sm:grid-cols-10 sm:items-center border-b border-[var(--tailor-blue)] p-5"
    >
      <p className="font-bold text-xl mb-2">{review.name}</p>

      <div className="col-span-9 sm:pl-5">
        <div className="w-full sm:flex sm:flex-col sm:items-end mb-3">
          <p className="text-xs">{review.date}</p>

          <div className="flex flex-row gap-1">
            {Array.from({ length: 5 }).map((_, index) => {
              const value = index + 1;
              const active = (rating ?? 0) >= value;

              return (
                <button
                  key={`star-${value}`}
                  type="button"
                  onClick={() => setRating(value)}
                  disabled={!isEditEnabled || isPending}
                  aria-label={`Puntuar ${value} estrellas`}
                  className={
                    !isEditEnabled || isPending
                      ? "cursor-default"
                      : "cursor-pointer"
                  }
                >
                  <Star className={active ? "opacity-100" : "opacity-50"} />
                </button>
              );
            })}
          </div>
        </div>

        <fieldset disabled={!isEditEnabled || isPending}>
          <textarea
            {...register("comments")}
            placeholder="Escribe tu comentario sobre el restaurante"
            className={`text-xs sm:text-sm text-justify w-full resize-none focus:outline-none ${
              !isEditEnabled ? "opacity-80" : ""
            }`}
          />
        </fieldset>
      </div>

      {canEdit && (
        <div className="col-span-10 flex justify-end items-end gap-3">
          {!isEditEnabled ? (
            <>
              <button
                type="button"
                className="font-bold border border-black px-4 py-2 rounded-xl"
                onClick={() => setIsEditEnabled(true)}
              >
                Editar
              </button>
              <button
                type="button"
                className="font-bold border border-black px-4 py-2 rounded-xl"
                onClick={onDelete}
              >
                Eliminar
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="font-bold border border-black px-4 py-2 rounded-xl"
                onClick={cancel}
                disabled={isPending}
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="font-bold border border-black px-4 py-2 rounded-xl"
                disabled={!isDirty || isPending}
              >
                {isPending ? "Guardando..." : "Guardar"}
              </button>
            </>
          )}
        </div>
      )}
    </form>
  );
}
