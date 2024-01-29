"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ItemActionsMenu, { Position } from "../../components/ItemActionsMenu";
import { fetchDeleteMeme } from "@/app/fetchActions";
import { useAppDispatch } from "@/app/store/hooks";
import { load } from "@/app/store/actions";

interface MemeProps {
  meme: Meme;
}

function MemeContainer({ meme }: MemeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [position, setPosition] = useState<Position>({ top: 0, left: 0 });
  const [menuVisible, setMenuVisibility] = useState<boolean>(false);

  const buttonRef = useRef(null);

  const autoSetPosition = () => {
    const buttonElement: any = buttonRef.current!;
    const button = buttonElement.getBoundingClientRect();
    if (button) {
      let offset = 59;
      if (window.innerWidth - button.right < 250) {
        offset = -224;
      }
      setPosition({
        top: button.top + window.scrollY,
        left: button.left + window.scrollX + offset,
      });
    }
  };

  useEffect(() => {
    if (menuVisible) {
      window.addEventListener("resize", autoSetPosition);

      return () => {
        window.removeEventListener("resize", autoSetPosition);
      };
    }
  }, [menuVisible]);

  // Toggle the open state
  const toggleOpen = () => setIsOpen(!isOpen);

  function editMeme(event: any) {
    // propagation is when by hovering over a button you are also hovering above the button's parent elements
    event.stopPropagation();
    autoSetPosition();

    setMenuVisibility((value) => !value);
  }

  const onClose = () => {
    setMenuVisibility(false);
  };

  const onEdit = () => {
    router.push("/app/memes/" + meme.id + "/edit");
  };

  const onDelete = async () => {
    try {
      var proceed = confirm(
        `Are you sure you want to delete meme ${meme!.title}?`
      );
      if (proceed) {
        const response = await fetchDeleteMeme(meme.id);
        if (response.ok) {
          dispatch(load(Types.Memes));
          console.log("Meme deleted", response);
          router.back();
        }
      }
    } catch (error) {
      console.error("Error deleting meme:", error);
    }
  };

  return (
    <>
      {menuVisible && (
        <ItemActionsMenu
          position={position}
          onClose={onClose}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
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
          <button
            className="btn btn-outline "
            onClick={editMeme}
            ref={buttonRef}
          >
            ...
          </button>
        </div>
        <div className={`${isOpen ? "max-h-96 p-6 pl-12 pr-14" : "hidden"}`}>
          <span>{meme.description}</span>
        </div>
      </div>
    </>
  );
}

export default MemeContainer;
