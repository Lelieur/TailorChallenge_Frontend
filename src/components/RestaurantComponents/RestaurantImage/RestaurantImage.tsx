"use client";

import { useState } from "react";
import Image from "next/image";

export default function RestaurantImageCard({
  src,
  width,
  height,
}: {
  src: string;
  width?: string;
  height?: string;
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
      className={`relative ${width} ${
        height ? `h-${height}` : "aspect-square"
      } rounded-lg overflow-hidden me-2`}
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
