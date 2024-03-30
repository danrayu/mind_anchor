"use client";
import { useState } from "react";

interface AddableMemeProps {
  meme: Meme;
  initIsAdded: boolean;
  onChange: (id: number) => void;
}

function AddableMeme({ meme, initIsAdded, onChange }: AddableMemeProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the open state
  const toggleOpen = () => setIsOpen(!isOpen);

  function editMeme(event: any) {
    // propagation is when by hovering over a button you are also hovering above the button's parent elements
    event.stopPropagation();
  }

  const [isAdded, setAdded] = useState(initIsAdded);

  const onSwitch = () => {
    onChange(meme.id);
    setAdded((state) => !state);
  };

  return (
    <div
      className={"bg-base-200 mb-2 rounded-xl " + (isAdded && "bg-gray-700")}
    >
      <div
        className={
          "flex p-4 px-4 justify-between items-center"
        }
        onClick={toggleOpen}
      >
        <div className="space-x-3 ">
          <span className="text-lg font-regular">{meme.title}</span>
        </div>
        <label className="swap">
          <input type="checkbox" onClick={onSwitch} />
          <div className="swap-on">{isAdded ? "Remove" : "Add"}</div>
          <div className="swap-off">{isAdded ? "Remove" : "Add"}</div>
        </label>
      </div>
      <div
        className={`${
          isOpen ? "max-h-96 px-4 p-4 pl-5 pr-14 max-w-xl " : "hidden"
        }`}
      >
        <span>{meme.description}</span>
      </div>
    </div>
  );
}

export default AddableMeme;
