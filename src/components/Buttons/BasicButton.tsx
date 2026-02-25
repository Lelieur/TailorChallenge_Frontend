import { ReactNode } from "react";

export default function BasicButton({
  type,
  text,
  action,
  disabled,
  position,
  backgroundColor,
  noBorder,
  children,
  fullWidth,
}: {
  type: "submit" | "reset" | "button" | undefined;
  text?: string;
  children?: ReactNode;
  action?: () => void;
  disabled?: boolean;
  position?: string;
  backgroundColor?: string;
  noBorder?: boolean;
  fullWidth?: boolean;
}) {
  return (
    <button
      type={type}
      className={`${position === "left" ? "mr-auto ml-0" : position === "right" ? "mr-0 ml-auto" : ""} ${
        disabled
          ? "bg-[var(--tailor-grey)] text-gray-400"
          : `cursor-pointer ${noBorder ? "" : "border border-black"} bg-${backgroundColor} text-black transition-all duration-300 hover:bg-black hover:text-white`
      } rounded-2xl px-6 py-2 font-bold ${fullWidth ? "w-full" : ""}`}
      onClick={action}
      disabled={disabled}
    >
      {text ?? children}
    </button>
  );
}
