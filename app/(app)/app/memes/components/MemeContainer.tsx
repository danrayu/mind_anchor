"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ItemActionsMenu, { Position } from "../../components/ItemActionsMenu";
import { fetchDeleteMeme } from "@/app/fetchActions";
import { useAppDispatch } from "@/app/store/hooks";
import { appFetch, load } from "@/app/store/actions";
import { Types } from "@/app/types/Types";
import { HiDotsHorizontal } from "react-icons/hi";
import { getGradientBgClasses, getHoverBgClass } from "@/app/util/colorToClass";

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

  const toggleOpen = () => setIsOpen(!isOpen);

  function openMenu(event: any) {
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
          dispatch(appFetch(Types.Memes));
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
      <div className={`${getGradientBgClasses(meme.color)} text-white rounded-xl`}>
        <div
          className={
            `flex p-4 px-6 justify-between rounded-xl items-center ${getHoverBgClass(meme.color)} hover:cursor-pointer ` +
            (!isOpen ? "" : "pb-2")
          }
          onClick={toggleOpen}
        >
          <div className="">
            <span className="text-lg font-semibold">{meme.title}</span>
          </div>
          <button
            className="btn btn-ghost "
            onClick={openMenu}
            ref={buttonRef}
          >
            <HiDotsHorizontal size={16}/>
          </button>
        </div>
        <div
          className={`${
            isOpen ? "max-h-96 max-w-2xl p-4 pt-0 pl-6 pr-14" : "hidden"
          }`}
        >
          <span className="whitespace-pre-line mb-2">{meme.description ? meme.description : "No description"}</span>
        </div>
      </div>
    </>
  );
}

export default MemeContainer;
