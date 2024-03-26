import { getBubbleColorClasses } from "@/app/util/colors";
import React, { useEffect, useState } from "react";
interface Props {
  onClick?: (colorId: number) => void;
  colorId: number;
}

function ColorBubble({ onClick, colorId }: Props) {
  const [classes, setClasses] = useState(getBubbleColorClasses(colorId));
  useEffect(() => {
    setClasses(getBubbleColorClasses(colorId));
  }, [colorId]);
  const onSelect = () => {
    if (onClick) {
      onClick(colorId);
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
