import React from "react";
interface SegmentTitleInterface {
  text: string;
}

function SegmentSubtitle({ text }: SegmentTitleInterface) {
  return (
    <h1 className="text-lg text-white font-medium line-h leading-[1.2em]">{text}</h1>
  );
}

export default SegmentSubtitle;
