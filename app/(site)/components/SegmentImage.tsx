import Image from 'next/image'
import React from 'react'
interface SegmentImageProps {
  image: NextImage
}

function SegmentImage({image}: SegmentImageProps) {
  return (
    <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="w-full h-auto cursor-default mt-4 mb-2 rounded-3xl max-w-[600px]"
          />
  )
}

export default SegmentImage