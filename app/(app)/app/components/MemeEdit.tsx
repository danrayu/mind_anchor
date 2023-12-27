"use client";
import React, { useState } from "react";
import SwitchCategory from "./utility/SwitchCategory";

// Import additional libraries as needed, e.g., for fetching and updating data
interface NewMemeProps {
  categories: Category[];
  meme?: Meme;
}

export type CategoryState = {
  category: Category;
  active: boolean;
};

function createEmptyMeme(): Meme {
  return {
    id: 0,
    title: "",
    description: "",
    authorId: 1,
    favorite: false,
    categories: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

function MemeEdit({ categories, meme: initialMeme }: NewMemeProps) {
  // Check if this is a new meme, or if one is being edited
  let newMeme = false;
  if (initialMeme === undefined) {
    newMeme = true;
    initialMeme = createEmptyMeme();
  }

  const [meme, setMeme] = useState<Meme>(initialMeme);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    await updateMeme(meme);
  };

  const changedTitle = (event: any) => {
    setMeme((oldState) => {
      return { ...oldState, title: event.target.value };
    });
  };

  const changedDescription = (event: any) => {
    setMeme((oldState) => {
      return { ...oldState, description: event.target.value };
    });
  };

  const changedFavorite = (event: any) => {
    setMeme((oldState) => {
      return { ...oldState, favorite: event.target.checked };
    });
  };

  const switchCategoryIncluded = (id: number) => {
    let i = meme.categories.findIndex((cat) => cat.id === id);
    if (i === -1) {
      let activatedCat = categories.find((cat) => cat.id === id);
      if (activatedCat) {
        setMeme((oldState) => {
          return {
            ...oldState,
            categories: [...oldState.categories, activatedCat!],
          };
        });
      }
    } else {
      let memeCategories = [...meme.categories];
      memeCategories.splice(i, 1);
      setMeme({ ...meme, categories: memeCategories });
    }
  };

  const updateMeme = async (meme: Meme) => {
    let memeData = {
      id: meme.id,
      title: meme.title,
      description: meme.description,
      favorite: meme.favorite,
      authorId: meme.authorId,
      categoryIds: meme.categories.map((cat: Category) => cat.id),
    };
    const request = newMeme ? fetchToNew : fetchToExisting;
    try {
      const response = await request(memeData);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Meme saved:", data);
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving meme:", error);
      setUpdateSuccess(false);
    }
  };

  const deleteMeme = async () => {
    try {
      const response = await fetchToDelete(meme.id);
      console.log("Meme deleted", response);
      // navigate back to meme page when deleted
      window.location.href = "/app/memes";
    } catch (error) {
      console.error("Error deleting meme:", error);
    }
  }

  return (
    <>
      {updateSuccess && (
        <div role="alert" className="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Successfully saved meme</span>
        </div>
      )}
      <div className="container mx-auto p-4 mt-6">
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={meme.title}
              onChange={changedTitle}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={meme.description}
              onChange={changedDescription}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            ></textarea>
          </div>

          <div className="mb-4">
            <label
              htmlFor="favorite"
              className="block text-sm font-medium text-gray-700"
            >
              Favorite
            </label>
            <input
              type="checkbox"
              id="favorite"
              name="favorite"
              checked={meme.favorite}
              onChange={changedFavorite}
              className="mt-1"
            />
          </div>
          <div className="flex flex-wrap space-x-1">
            {categories.map((cat: Category) => {
              return (
                <SwitchCategory
                  key={"cat_" + cat.id}
                  switch={switchCategoryIncluded}
                  category={cat}
                  state={meme}
                />
              );
            })}
          </div>

          <button type="submit" className="mt-2 btn btn-primary">
            Save
          </button>
        </form>
        {!newMeme && (
          <button className="mt-2 btn btn-warning" onClick={deleteMeme}>
            Delete
          </button>
        )}
      </div>
    </>
  );
}

async function fetchToNew(memeData: any) {
  return await fetch("/api/memes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(memeData),
  });
}

async function fetchToExisting(memeData: any) {
  return await fetch("/api/memes/" + memeData.id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(memeData),
  });
}

async function fetchToDelete(id: number) {
  return await fetch("/api/memes/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export default MemeEdit;
