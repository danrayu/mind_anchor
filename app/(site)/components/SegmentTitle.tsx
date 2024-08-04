import React from "react";
interface TitleSegmentProps {
  text: string;
}

function SegmentTitle({ text }: TitleSegmentProps) {
  return (
    <h1 className="md:text-4xl text-3xl text-center text-white font-semibold line-h leading-[1.2em]">
      {text}
    </h1>
  );
}

export default SegmentTitle;
