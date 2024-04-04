import React from "react";
interface SegmentTitleInterface {
  text: string;
}

function SegmentSubtitle({ text }: SegmentTitleInterface) {
  return (
    <h1 className="md:text-4xl text-3xl text-accent font-medium line-h leading-[1.2em]">{text}</h1>
  );
}

export default SegmentSubtitle;
