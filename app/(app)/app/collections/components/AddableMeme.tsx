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

  const [blackMode, setBMode] = useState(initIsAdded);

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
          <span className="text-lg font-semibold">{meme.title}</span>
        </div>
        <label className="swap">
          <input type="checkbox" onClick={onSwitch}/>
          <div className="swap-on">{blackMode ? "Remove" : "Add"}</div> 
          <div className="swap-off">{blackMode ? "Remove" : "Add"}</div>
        </label>
      </div>
      <div className={`${isOpen ? "max-h-96 px-4 p-4 pl-5 pr-14 max-w-xl " : "hidden"}`}>
        <span>{meme.description}</span>
      </div>
    </div>
  );
}

export default AddableMeme;
