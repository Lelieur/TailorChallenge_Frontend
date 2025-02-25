"use client";

import { useState } from "react";

export default function RestaurantImageCard({
  src,
  width,
  height,
}: {
  src: string;
  width: string;
  height?: string;
}): React.ReactNode {
  const [srcImage, setSrcImage] = useState(src);
  const fallbackSrc = "/images/taberna-hobbit.jpeg";

  return (
    <div
      className={`relative ${width} ${
        height ? `h-${height}` : "aspect-square"
      } rounded-lg overflow-hidden me-2`}
    >
      <img
        src={srcImage}
        alt="Restaurant image"
        className="w-full h-full object-cover"
        onError={(e) => {
          e.currentTarget.src = fallbackSrc;
          setSrcImage(fallbackSrc);
        }}
      />
    </div>
  );
}
