import Image from "next/image";

export default function RestaurantImageCard({
  src,
  width,
  height,
  isCard,
}: {
  src: string;
  width?: string;
  height?: string;
  isCard?: boolean;
}): React.ReactNode {
  return (
    <div
      className={`${
        isCard && "hidden sm:block"
      } relative rounded-lg overflow-hidden ${width} ${
        height ? `${height} aspect-[2/1]` : "aspect-square me-2"
      }`}
    >
      <Image
        src={src}
        alt="Restaurant image"
        className="w-full h-full object-cover"
        fill
        sizes="full"
        priority
      />
    </div>
  );
}
