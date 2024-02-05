import { useAppDispatch } from "@/app/store/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import ItemActionsMenu, { Position } from "../../components/ItemActionsMenu";
import { fetchDeleteCategory, fetchUpdateCategory } from "@/app/fetchActions";
import { appFetch } from "@/app/store/actions";
import { Types } from "@/app/types/Types";
interface CategoryContainerProps {
  category: Category;
}
function CategoryContainer({ category }: CategoryContainerProps) {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(category.name);

  useEffect(() => {
    setTitle(category.name)
  }, [category.name, setTitle]);

  const [position, setPosition] = useState<Position>({ top: 0, left: 0 });
  const [menuVisible, setMenuVisibility] = useState<boolean>(false);
  const buttonRef = useRef(null);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const params = useSearchParams();

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
    setEditMode(true);
    onClose();
  };

  const handleSave = async () => {
    if (title.length === 0) {
      alert("Please enter a category name");
      return;
    }

    const response = await fetchUpdateCategory(category.id, { name: title });
    if (response.ok) {
      setEditMode(false);
    }
  };

  const handleTitleChange = (event: any) => {
    setTitle(event.target.value);
  }

  const handleCancel = () => {
    setEditMode(false);
    setTitle(category.name);
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
        <div className="flex p-4 flex-grow justify-between items-center flex-nowrap">
          {editMode ? (
            <input
              type="text"
              value={title}
              placeholder="Category name"
              className="input input-ghost font-regular text-[17px] ml-4 p-0 border-0 outline-0 rounded-none focus:outline-0 flex-grow "
              onChange={handleTitleChange}
              onKeyDown={handleTitleChange}
              maxLength={40}
            />
          ) : (
            <span className="font-semibold text-[17px] ml-4 break-words overflow-hidden max-w-[60%] flex-shrink ">
              {title}
            </span>
          )}

          <div className="space-x-2 flex-nowrap flex">
            {!editMode && (
              <>
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
              </>
            )}
            {editMode && (
              <>
                <button
                  className="btn btn-primary "
                  onClick={handleSave}
                  ref={buttonRef}
                >
                  Save
                </button>
                <button className="btn btn-outline " onClick={handleCancel}>
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryContainer;
