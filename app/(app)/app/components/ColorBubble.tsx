import React from "react";
interface Props {
  onClick: (color: Color) => void;
  color: Color;
}

function ColorBubble({ onClick, color }: Props) {
  const onSelect = () => {
    onClick(color);
  }
  return (
    <div onClick={onSelect} className="m2">
      <div className={"rounded-full border border-1 cursor-pointer w-7 h-7 " + color.classes}/>
    </div>
  );
}

export default ColorBubble;
