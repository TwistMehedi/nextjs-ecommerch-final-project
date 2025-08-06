

"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";  

export function Carousel({ images = [] }) {
  const [emblaRef] = useEmblaCarousel({ loop: true });

  return (
    <div className="overflow-hidden rounded-xl border" ref={emblaRef}>
      <div className="flex">
        {images.map((image, idx) => (
          <div
            key={idx}
            className="min-w-0 flex-[0_0_100%] p-2"
          >
            <img
              src={image.secure_url}
              alt={`Product ${idx}`}
              className="w-full h-64 object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
