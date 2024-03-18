import { getBubbleColorClasses } from "@/app/util/colorToClass";
import React, { useEffect, useState } from "react";
interface Props {
  onClick?: (color: Color) => void;
  color: Color;
}

function ColorBubble({ onClick, color }: Props) {
  const [classes, setClasses] = useState(getBubbleColorClasses(color));
  useEffect(() => {
    setClasses(getBubbleColorClasses(color));
  }, [color]);
  const onSelect = () => {
    if (onClick) {
      onClick(color);
    }
  };
  return (
    <div onClick={onSelect} className="m2">
      <div
        className={
          "rounded-full cursor-pointer w-7 h-7 " + classes
        }
      />
    </div>
  );
}

export default ColorBubble;
