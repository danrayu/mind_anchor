import { fetchUpdateCategory } from "@/app/fetchActions";
import { appFetch } from "@/app/store/actions";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { Types } from "@/app/types/Types";
import React, { useEffect, useState } from "react";
import ColorBubble from "../../../components/ColorBubble";
import Modal from "../../../components/Modal";
import { colors } from "@/app/util/colors";

interface Props {
  category: Category;
}

function CategoryEdit({ category }: Props) {
  const [inputError, setInputError] = useState("");
  const dispatch = useAppDispatch();

  const [categoryName, setCategoryName] = useState(category.name);
  const [selectedColor, setSelectedColor] = useState(category.colorId);

  useEffect(() => {
    setCategoryName(category.name);
  }, [category]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    save();
  };

  const save = async () => {
    if (!categoryName) {
      alert("Please enter a category name");
      return;
    }
    const response = await fetchUpdateCategory(category.id, {
      name: categoryName,
      colorId: selectedColor,
    });
    const updatedCat = await response.json();

    if (response.ok) {
      dispatch({ type: "UPDATE_CAT", payload: updatedCat });
      (document.getElementById("edit-cat-modal")! as any).close();
    }
    dispatch(appFetch(Types.Categories));
  };

  const onChange = (event: any) => {
    if (event.target.value.length === event.target.maxLength) {
      setInputError("Max length 40 characters.");
    } else {
      setInputError("");
    }
    setCategoryName(event.target.value);
    if (event.key === "Enter") {
      save();
    }
  };

  const onSelectColor = (colorId: number) => {
    setSelectedColor(colorId);
    (document.getElementById("modal-color")! as any).close();
  };

  const openColorMenu = () => {
    (document.getElementById("modal-color")! as any).showModal();
  };

  return (
    <>
      <Modal title="Select Hue" id="modal-color">
        <div className="flex space-x-2 mt-3">
          {colors.map((color: Color) => {
            return (
              <ColorBubble
                key={color.id}
                colorId={color.id}
                onClick={onSelectColor}
              />
            );
          })}
        </div>
      </Modal>
      <div className="container mx-auto p-4 mt-6">
        <form onSubmit={handleSubmit} className="max-w-[600px] mx-auto">
          <div className="mb-4">
            <label htmlFor="title" className="block font-medium">
              Title
            </label>
            <div className="flex space-x-3 items-center">
              <input
                type="text"
                id="title"
                name="title"
                value={categoryName}
                onChange={onChange}
                className="input input-bordered mt-1 p-2 w-full"
              />
              <ColorBubble colorId={selectedColor} onClick={openColorMenu} />
            </div>
          </div>
          <button type="submit" className="mt-2 btn btn-primary">
            Save
          </button>
        </form>
      </div>
    </>
  );
}

export default CategoryEdit;
