"use client";
import { fetchCreateCategory } from "@/app/fetchActions";
import { appFetch } from "@/app/store/actions";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { Types } from "@/app/types/Types";
import React, { useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import ColorBubble from "../../../components/ColorBubble";
import { colors } from "@/app/util/colors";

function QuickAddCat() {
  var catName = "";
  const [inputError, setInputError] = useState("");
  const dispatch = useAppDispatch();

  const [categoryName, setCategoryName] = useState(catName);

  const [selectedColor, setSelectedColor] = useState(1);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    save();
  };

  const save = async () => {
    if (!categoryName) {
      alert("Please enter a category name");
      return;
    }

    const response = await fetchCreateCategory({
      name: categoryName,
      colorId: selectedColor,
    });
    const newCat = await response.json();

    // Adding the new cat while waiting for the full refetch to happen
    if (response.ok) {
      dispatch({ type: "ADD_CAT", payload: newCat });
    }
    dispatch(appFetch(Types.Categories));
    setCategoryName("");
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
    (document.getElementById("cat-pick-color")! as any).close();
  };

  const openColorMenu = () => {
    (document.getElementById("cat-pick-color")! as any).showModal();
  };

  return (
    <>
      {selectedColor && (
        <Modal title="Select Hue" id="cat-pick-color">
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
      )}
      <div className="mx-auto">
        <form onSubmit={handleSubmit}>
          <h3 className="pb-2 ">Add Category</h3>
          <div className="justify-between flex">
            <div className="flex space-x-4 items-center flex-wrap">
              <div className="flex items-center">
                <label className="flex items-center flex-row space-x-6 form-control w-full max-w-xs">
                  <input
                    type="text"
                    id="categoryName"
                    value={categoryName}
                    className="input input-bordered w-full m-0 rounded max-w-xl"
                    onChange={onChange}
                    onKeyDown={onChange}
                    maxLength={40}
                  />

                  <div className={"label  " + (!inputError.length && "hidden")}>
                    <span className="label-text-alt text-error text-base">
                      {inputError}
                    </span>
                  </div>
                </label>
              </div>
              {selectedColor && (
                  <ColorBubble colorId={selectedColor} onClick={openColorMenu} />
                )}
            </div>

            <div className="flex justify-end space-x-2">
              <button className="btn btn-primary" type="submit">
                Add Category
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default QuickAddCat;
