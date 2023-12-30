import React, { useState } from "react";

function CategoryEdit() {
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!categoryName) {
      alert("Please enter a category name");
      return;
    }

    const newCategory = {
      name: categoryName,
      authorId: 1,
    };

    await fetchToNew(newCategory);

    setCategoryName("");
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
        Add Category
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

export default CategoryEdit;
