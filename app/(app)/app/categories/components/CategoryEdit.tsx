"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
interface CategoryEditProps {
  category?: Category;
}
function CategoryEdit({ category }: CategoryEditProps) {
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
      await fetchToNew(newCategory);
      setCategoryName("");
    } else {
      await fetchToUpdate(category.id, { name: categoryName });
    }
  };

  const deleteCat = async () => {
    var proceed = confirm(
      `Are you sure you want to delete category ${category!.name}?`
    );
    if (proceed) {
      await fetchToDelete(category!.id);
      router.push("/app/categories");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
  );
}

async function fetchToNew(catData: any) {
  return await fetch("/api/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(catData),
  });
}

async function fetchToUpdate(id: number, catData: any) {
  return await fetch("/api/categories/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function fetchToDelete(id: number) {
  return await fetch("/api/categories/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export default CategoryEdit;
