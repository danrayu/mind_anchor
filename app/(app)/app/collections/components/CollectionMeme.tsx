import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useState } from "react";
interface CollectionMemeProps {
  meme: Meme;
  onRemove: (id: number) => void;
}
function CollectionMeme({ meme, onRemove }: CollectionMemeProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: meme.id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((state) => !state);
  };

  const onRemove2 = (event: any) => {
    event.stopPropagation();
    console.log("clicked")
    onRemove(meme.id)
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className=" border-b-2 w-full"
    >
      <div
        className={
          "flex p-6 py-5 justify-between items-center hover:bg-slate-100" +
          (isOpen && " border-b border-slate-200")
        }
        onClick={toggleOpen}
      >
        <div className="">
          <span className="text-lg font-semibold">{meme.title}</span>
        </div>
        <button type="button" className="btn btn-outline" onClick={onRemove2}>
          X
        </button>
      </div>
      <div className={`${isOpen ? "max-h-96 p-6 pl-7 pr-14" : "hidden"}`}>
        <span>{meme.description}</span>
      </div>
    </div>
  );
}

export default CollectionMeme;
