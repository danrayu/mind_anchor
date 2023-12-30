import React, { useState } from "react";
interface CategoryEditProps {
  category?: Category
}
function CategoryEdit({category}: CategoryEditProps) {
  const [categoryName, setCategoryName] = useState("");
  const isNew = category == undefined;

  if (!isNew) {
    setCategoryName(category.name);
  }

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
      await fetchToUpdate(category.id, {name: categoryName});
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

      <button className="btn btn-primary" type="submit">
        Save Category
      </button>
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

export default CategoryEdit;
