"use client";
import { useState } from "react";

interface AddableMemeProps {
  meme: Meme;
  onChange: (id: number) => void;
}

function AddableMeme({ meme, onChange }: AddableMemeProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the open state
  const toggleOpen = () => setIsOpen(!isOpen);

  function editMeme(event: any) {
    // propagation is when by hovering over a button you are also hovering above the button's parent elements
    event.stopPropagation();
  }

  const [blackMode, setBMode] = useState(false);

  const onSwitch = () => {
    console.log("switched")
    onChange(meme.id);
    setBMode(state => !state);
  }

  const getBorder = () => {
    return blackMode ? "border-slate-700" : "border-slate-200";
  }

  return (
    <div className="outline mb-2 rounded-xl" data-theme={blackMode ? "dark" : "light"}>
      <div
        className={
          "flex p-2 px-4 justify-between items-center" +
          (isOpen && " border-b " + getBorder())
        }
        onClick={toggleOpen}
      >
        <div className="space-x-3 ">
          <span className={!isOpen ? "ml-[3px]" : ""}>
            {isOpen ? "▼" : ">"}
          </span>
          <span className="text-lg font-semibold">{meme.title}</span>
        </div>
        <label className="swap">
          <input type="checkbox" onClick={onSwitch}/>
          <div className="swap-on">Remove</div>
          <div className="swap-off">Add</div>
        </label>
      </div>
      <div className={`${isOpen ? "max-h-96 px-4 p-2 pl-12 pr-14" : "hidden"}`}>
        <span>{meme.description}</span>
      </div>
    </div>
  );
}

export default AddableMeme;
