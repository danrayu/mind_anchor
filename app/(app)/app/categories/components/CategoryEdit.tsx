"use client";
import { fetchCreateCategory } from "@/app/fetchActions";
import { appFetch } from "@/app/store/actions";
import { useAppDispatch } from "@/app/store/hooks";
import { Types } from "@/app/types/Types";
import React, { useState } from "react";

function CategoryEdit() {
  var catName = "";
  const [inputError, setInputError] = useState("");
  const dispatch = useAppDispatch();

  const [categoryName, setCategoryName] = useState(catName);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    save();
  };

  const save = async () => {
    if (!categoryName) {
      alert("Please enter a category name");
      return;
    }

    await fetchCreateCategory({ name: categoryName });
    dispatch(appFetch(Types.Categories));
    setCategoryName("");
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

  return (
    <div className="mx-auto">
      <form onSubmit={handleSubmit}>
        <h3 className="pb-2">New category</h3>
        <div className="justify-between flex">
          <div className="flex space-x-4 items-center">
            <label className="form-control w-full max-w-xs">
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
          <div className="flex justify-end space-x-2">
            <button className="btn btn-primary" type="submit">
              Add Category
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CategoryEdit;
