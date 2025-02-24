"use client";

import { useState } from "react";

export default function RestaurantImageCard({
  src,
  width,
}: {
  src: string;
  width: string;
}): React.ReactNode {
  const [srcImage, setSrcImage] = useState(src);
  const fallbackSrc = "/images/taberna-hobbit.jpeg";

  return (
    <div
      className={`relative w-${width} aspect-square rounded-lg overflow-hidden me-2`}
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
