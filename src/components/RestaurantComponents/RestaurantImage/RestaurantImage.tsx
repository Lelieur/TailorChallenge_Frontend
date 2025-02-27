"use client";

import { useState } from "react";
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
  const [srcImage, setSrcImage] = useState(src);
  const fallbackSrc = "/images/home.jpeg";

  const handleImageError = () => {
    if (srcImage !== fallbackSrc) {
      setSrcImage(fallbackSrc);
    }
  };

  return (
    <div
      className={`${
        isCard && "hidden sm:block"
      } relative rounded-lg overflow-hidden ${width} ${
        height ? `${height} aspect-[2/1]` : "aspect-square me-2"
      }`}
    >
      <Image
        src={srcImage}
        alt="Restaurant image"
        className="w-full h-full object-cover"
        onError={handleImageError}
        fill
        sizes="full"
        priority
      />
    </div>
  );
}
