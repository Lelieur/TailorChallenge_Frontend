import type { ReactNode } from "react";

export default function IconButton({
  type,
  children,
  action,
  disabled,
  position,
  backgroundColor,
  border,
  ariaLabel,
}: {
  type: "submit" | "reset" | "button" | undefined;
  children: ReactNode;
  action?: () => void;
  disabled?: boolean;
  position?: string;
  backgroundColor?: string;
  border?: string;
  ariaLabel: string;
}) {
  return (
    <button
      type={type}
      aria-label={ariaLabel}
      className={`${position === "left" ? "mr-auto ml-0" : position === "right" ? "mr-0 ml-auto" : ""} ${
        disabled
          ? "bg-[var(--tailor-grey)] text-gray-400"
          : `cursor-pointer ${border ? border : "border border-black"} bg-${backgroundColor} text-black transition-all duration-300 hover:bg-black hover:text-white`
      } rounded-2xl px-3 py-2 font-bold`}
      onClick={action}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
