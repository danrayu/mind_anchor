import { useAppDispatch } from "@/app/store/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useRef, useState } from "react";
import ItemActionsMenu, { Position } from "../../components/ItemActionsMenu";
import { fetchDeleteCategory } from "@/app/fetchActions";
import { appFetch } from "@/app/store/actions";
import { Types } from "@/app/types/Types";
interface CategoryContainerProps {
  category: Category;
}
function CategoryContainer({ category }: CategoryContainerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [position, setPosition] = useState<Position>({ top: 0, left: 0 });
  const [menuVisible, setMenuVisibility] = useState<boolean>(false);
  const params = useSearchParams();
  const buttonRef = useRef(null);


  const viewMemes = () => {
    const paramsNew = new URLSearchParams(params);
    paramsNew.set("cats", `${category.id}:${1}`);
    router.push("/app/memes?" + paramsNew.toString());
  };

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
    router.push("/app/categories/" + category.id);
  };

  const onDelete = async () => {
    try {
      var proceed = confirm(
        `Are you sure you want to delete category ${category!.name}?`
      );
      if (proceed) {
        const response = await fetchDeleteCategory(category.id);
        if (response.ok) {
          dispatch(appFetch(Types.Categories));
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
      <div className="outline mb-4 outline-slate-350 rounded-xl">
      <div className="flex p-4 justify-between items-center">
        <span className="font-semibold text-[17px] ml-4">{category.name}</span>
        <div className="space-x-2">
        <button
            className="btn btn-outline "
            onClick={openMenu}
            ref={buttonRef}
          >
            ...
          </button>
          <button className="btn btn-primary " onClick={viewMemes}>
            View Memes
          </button>
        </div>
      </div>
    </div>
      
      </>
    
  );
}

export default CategoryContainer;
