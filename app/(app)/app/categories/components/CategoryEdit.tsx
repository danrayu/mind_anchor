"use client";
import {
  fetchCreateCategory,
  fetchDeleteCategory,
  fetchUpdateCategory,
} from "@/app/fetchActions";
import { load } from "@/app/store/actions";
import { useAppDispatch } from "@/app/store/hooks";
import { Types } from "@/app/types/Types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface CategoryEditProps {
  category?: Category;
}
function CategoryEdit({ category }: CategoryEditProps) {
  const dispatch = useAppDispatch();
  var catName = "";
  const isNew = category == undefined;

  if (!isNew) {
    catName = category.name;
  }
  const [categoryName, setCategoryName] = useState(catName);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    save();
  };

  const save = async () => {
    if (!categoryName) {
      alert("Please enter a category name");
      return;
    }

    if (isNew) {
      const newCategory = {
        name: categoryName,
        authorId: 1,
      };
      const response = await fetchCreateCategory(newCategory);
      if (response.ok) {
        setCategoryName("");
        dispatch(load(Types.Categories));
      }
    } else {
      await fetchUpdateCategory(category.id, { name: categoryName });
    }
  };

  const deleteCat = async () => {
    var proceed = confirm(
      `Are you sure you want to delete category ${category!.name}?`
    );
    if (proceed) {
      const response = await fetchDeleteCategory(category!.id);
      if (response.ok) {
        dispatch(load(Types.Categories));
        router.push("/app/categories");
      }
    }
  };

  const onChange = (event: any) => {
    setCategoryName(event.target.value);
    if (event.key === "Enter") {
      save();
    }
  };

  return (
    <div className="mx-auto">
      <form onSubmit={handleSubmit}>
        <div className={"justify-between " + (isNew ? "flex" : "")}>
          <div className="flex space-x-4 items-center">
            <label htmlFor="categoryName">Name</label>
            <input
              type="text"
              id="categoryName"
              value={categoryName}
              className="outline p-1 rounded"
              onChange={onChange}
            />
          </div>
          <div className={"flex justify-end space-x-2" + (isNew && "")}>
            <button className="btn btn-primary" type="submit">
              {isNew ? "Add Category" : "Save changes"}
            </button>
          </div>
        </div>
        {!isNew && (
          <button
            className="btn btn-link text-red-700 font-normal text-sm"
            type="button"
            onClick={deleteCat}
          >
            Delete
          </button>
        )}
      </form>
    </div>
  );
}

export default CategoryEdit;
