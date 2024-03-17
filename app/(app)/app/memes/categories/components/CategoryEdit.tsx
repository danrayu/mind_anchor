import { fetchUpdateCategory } from "@/app/fetchActions";
import { appFetch } from "@/app/store/actions";
import { useAppDispatch } from "@/app/store/hooks";
import { Types } from "@/app/types/Types";
import React, { useEffect, useState } from "react";
import ColorBubble from "../../../components/ColorBubble";
import Modal from "../../../components/Modal";

interface Props {
  category: Category;
}

const colors: Color[] = [
  { id: 1, classes: "bg-green-700 hover:bg-green-600" },
  { id: 2, classes: "bg-blue-700 hover:bg-blue-600" },
];

function CategoryEdit({ category }: Props) {
  console.log(category);
  const [inputError, setInputError] = useState("");
  const dispatch = useAppDispatch();

  const [categoryName, setCategoryName] = useState(category.name);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
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
    });
    const updatedCat = await response.json();

    if (response.ok) {
      dispatch({ type: "UPDATE_CAT", payload: updatedCat });
    }
    dispatch(appFetch(Types.Categories));
  };

  const onChange = (event: any) => {
    console.log(!inputError.length && "hidden");
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

  const onSelectColor = (color: Color) => {
    setSelectedColor(color);
  }

  const openColorMenu = () => {
    (document.getElementById("modal-color")! as any).showModal();
  }

  return (
    <>
      <Modal title="Select Hue" id="modal-color">
        <div className="flex space-x-2 mt-3">
          {colors.map((color: Color) => {
            return <ColorBubble color={color} onClick={onSelectColor}/>
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
              <ColorBubble color={selectedColor} onClick={openColorMenu} />
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
