"use server";
import Image from "next/image";
import React from "react";

interface CarouselSegmentProps {
  images: NextImage[];
}

function CarouselSegment({ images }: CarouselSegmentProps) {
  const prevIndex = (index: number) => {
    if (index === 0) {
      return images.length - 1;
    } else return index - 1;
  };
  const nextIndex = (index: number) => {
    if (images.length - 1 === index) {
      return 0;
    } else return index + 1;
  };
  return (
    <>
      {images.map((image: NextImage, index: number) => {
        return (
          <div id={"slide" + index} key={index} className="carousel-item relative w-full">
            <Image
              alt={image.alt}
              width={image.width}
              height={image.height}
              src={image.src}
              className="w-full"
            />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href={"#slide" + nextIndex(index)} className="btn btn-circle">
                ❮
              </a>
              <a href={"#slide" + prevIndex(index)} className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default CarouselSegment;
