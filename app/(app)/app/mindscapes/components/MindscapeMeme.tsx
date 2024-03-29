import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useState } from "react";
interface CollectionMemeProps {
  meme: Meme;
  onRemove: (id: number) => void;
  dndMode: boolean;
}
function CollectionMeme({ meme, onRemove, dndMode }: CollectionMemeProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: meme.id, disabled: !dndMode });
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
    onRemove(meme.id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="w-full"
    >
      <div
        className={
          "flex p-6 py-5 justify-between items-center bg-base-200 rounded-xl"
        }
        onClick={toggleOpen}
      >
        <div className="">
          <span className="text-lg font-semibold">{meme.title}</span>
        </div>
        {!dndMode && (
          <button type="button" className="btn btn-ghost" onClick={onRemove2}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
      <div className={`${isOpen ? "max-h-96 p-6 pl-7 pr-14" : "hidden"}`}>
        <span>{meme.description}</span>
      </div>
    </div>
  );
}

export default CollectionMeme;
