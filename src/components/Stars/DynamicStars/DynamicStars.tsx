import Star from "@/assets/star.svg";

export default function DynamicStarts({
  rating,
  setRating,
  isEditEnabled,
}: {
  rating: number | undefined;
  setRating: (value: number) => void;
  isEditEnabled: boolean;
}) {
  return (
    <div className="col-span-10 ml-auto flex gap-1">
      {Array.from({ length: 5 }).map((_, index) => {
        const value = index + 1;
        const active = (rating ?? 0) >= value;

        return (
          <button
            key={`star-${value}`}
            type="button"
            onClick={() => setRating(value)}
            disabled={!isEditEnabled}
            aria-label={`Puntuar ${value} estrellas`}
            className={!isEditEnabled ? "cursor-default" : "cursor-pointer"}
          >
            <Star className={active ? "opacity-100" : "opacity-50"} />
          </button>
        );
      })}
    </div>
  );
}
