"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";

interface MemeProps {
  meme: Meme;
}

function MemeContainer({ meme }: MemeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // Toggle the open state
  const toggleOpen = () => setIsOpen(!isOpen);

  function editMeme(event: any) {
    // propagation is when by hovering over a button you are also hovering above the button's parent elements
    event.stopPropagation();
    router.push("/app/memes/" + meme.id + "/edit");
  }

  return (
    <div className="outline mb-4 rounded-xl">
      <div
        className={
          "flex p-6 justify-between items-center hover:bg-slate-100" +
          (isOpen && " border-b border-slate-200")
        }
        onClick={toggleOpen}
      >
        <div className="space-x-3 ">
          <span className={!isOpen ? "ml-[3px]" : ""}>
            {isOpen ? "▼" : ">"}
          </span>
          <span className="text-lg font-semibold">{meme.title}</span>
        </div>
        <button className="btn btn-outline " onClick={editMeme}>
          Edit
        </button>
      </div>
      <div className={`${isOpen ? "max-h-96 p-6 pl-12 pr-14" : "hidden"}`}>
        <span>{meme.description}</span>
      </div>
    </div>
  );
}

export default MemeContainer;
