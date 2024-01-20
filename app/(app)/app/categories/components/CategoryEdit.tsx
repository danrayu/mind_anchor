"use client";
import {
  fetchCreateCategory,
  fetchDeleteCategory,
  fetchUpdateCategory,
} from "@/app/fetchActions";
import { fetchCats } from "@/app/store/actions";
import { useAppDispatch } from "@/app/store/hooks";
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
        dispatch(fetchCats());
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
        dispatch(fetchCats());
        router.push("/app/categories");
      }
    }
  };

  return (
    <div className="max-w-[600px] mx-auto">
      <form onSubmit={handleSubmit}>
        <h1 className="text-[35px] font-bold mb-4">
          {isNew && "Add"} {!isNew && "Edit"} category
        </h1>
        <div className="mt-2 flex space-x-4 items-center">
          <label htmlFor="categoryName">Name</label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            className="outline p-1 rounded"
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>
        <div className="flex justify-end space-x-2">
          {!isNew && (
            <button
              className="btn btn-link text-red-700 font-normal text-sm"
              type="button"
              onClick={deleteCat}
            >
              Delete
            </button>
          )}

          <button className="btn btn-primary" type="submit">
            Save Category
          </button>
        </div>
      </form>
    </div>
  );
}

export default CategoryEdit;
