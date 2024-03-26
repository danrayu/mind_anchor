import { getBorderColordClasses } from "@/app/util/colors";
import React from "react";

interface FilterItemProps {
  onAdd: () => any;
  onRemove: () => any;
  state: number;
  name: string;
  borderColorId?: number;
}

function FilterItem({ onAdd, onRemove, state, name, borderColorId }: FilterItemProps) {
  const styleBtn =
    "font-semibold rounded p-1 px-2.5 rounded-xl focus:outline-none focus:ring-0";
  const styleAddSelected = " text-green-600 ";
  const styleRemoveSelected = " text-red-600 join-item ";
  return (
    <div className={`flex items-center badge badge-outline border mr-2 ${borderColorId && getBorderColordClasses(borderColorId)} py-4 my-1 mr-1 space-x-1`}>
      <button
        className={
          styleBtn +
          (state === 1 && styleAddSelected) +
          " hover:text-white hover:bg-green-700 "
        }
        onClick={onAdd}
      >
        +
      </button>
      <span
        className={`font-medium rounded text-sm ${
          state === 1 && "text-green-700 font-bold"
        } ${state === -1 && "text-red-700 font-bold"}
        ${state === 0 && "pr-[2.5px]"}`}
      >
        {name}
      </span>
      <button
        className={
          styleBtn +
          (state === -1 && styleRemoveSelected) +
          " hover:text-white hover:bg-red-700 "
        }
        onClick={onRemove}
      >
        -
      </button>
    </div>
  );
}

export default FilterItem;
