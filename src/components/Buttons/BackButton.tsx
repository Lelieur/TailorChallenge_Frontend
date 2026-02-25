import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

export default function BackButton({
  type,
  url,
  action,
}: {
  type: "link" | "button";
  url?: string;
  action?: () => void;
}) {
  return (
    <>
      {type === "link" ? (
        <Link
          href={url!}
          className="my-5 inline-flex cursor-pointer rounded-2xl border border-white px-6 py-2 font-bold transition-all duration-300 hover:bg-white hover:text-[var(--tailor-blue)]"
        >
          <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
        </Link>
      ) : (
        <button
          type="button"
          className="my-5 inline-flex cursor-pointer rounded-2xl border border-white px-6 py-2 font-bold transition-all duration-300 hover:bg-white hover:text-[var(--tailor-blue)]"
          onClick={() => action && action()}
        >
          <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      )}
    </>
  );
}
