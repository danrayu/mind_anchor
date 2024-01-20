"use client"
import React, { useState } from "react";
import SwitchCategory from "../../components/utility/SwitchCategory";
import {
  fetchCreateMeme,
  fetchDeleteMeme,
  fetchUpdateMeme,
} from "@/app/fetchActions";
import { useAppDispatch } from "@/app/store/hooks";
import { fetchMemes } from "@/app/store/actions";
import { useRouter } from "next/navigation";

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
  const router = useRouter()
  const dispatch = useAppDispatch();
  let newMeme = false;
  if (initialMeme === undefined) {
    newMeme = true;
    initialMeme = createEmptyMeme();
  }

  const [meme, setMeme] = useState<Meme>(initialMeme);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    await saveMeme(meme);
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

  const saveMeme = async (meme: Meme) => {
    let memeData = {
      id: meme.id,
      title: meme.title,
      description: meme.description,
      favorite: meme.favorite,
      authorId: meme.authorId,
      categoryIds: meme.categories.map((cat: Category) => cat.id),
    };
    const request = newMeme ? fetchCreateMeme : fetchUpdateMeme;
    try {
      const response = await request(memeData);

      if (!response.ok) {
        throw new Error(
          `HTTP error status: ${response.status} - ${response.statusText}`
        );
      } else {
        dispatch(fetchMemes());
        const data = await response.json();
        console.log("Meme saved:", data);
        setUpdateSuccess(true);
        setTimeout(() => setUpdateSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Error saving meme:", error);
      setUpdateSuccess(false);
    }
  };

  const deleteMeme = async () => {
    try {
      var proceed = confirm(
        `Are you sure you want to delete meme ${meme!.title}?`
      );
      if (proceed) {
        const response = await fetchDeleteMeme(meme.id);
        if (response.ok) {
          dispatch(fetchMemes());
          console.log("Meme deleted", response);
          router.back();
        }
      }
    } catch (error) {
      console.error("Error deleting meme:", error);
    }
  };

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
        <form onSubmit={handleSubmit} className="max-w-[600px] mx-auto">
          <h1 className="text-[35px] font-bold mb-4">{newMeme && "Add"} {!newMeme && "Edit"} meme</h1>

          <div className="mb-4">
            <label htmlFor="title" className="block font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={meme.title}
              onChange={changedTitle}
              placeholder="Title"
              className="mt-1 p-2 block rounded outline w-full"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={meme.description}
              onChange={changedDescription}
              placeholder="Description"
              className="mt-1 p-2 block rounded outline w-full h-40"
            ></textarea>
          </div>

          <div className="mb-4 flex space-x-4 items-center">
            <label
              htmlFor="favorite"
              className="block font-medium text-gray-700 mt-1"
            >
              Favorite
            </label>
            <input
              type="checkbox"
              id="favorite"
              name="favorite"
              checked={meme.favorite}
              onChange={changedFavorite}
              className="mt-1 checkbox border-slate-400"
            />
          </div>
          <label
              htmlFor="categories"
              className="block font-medium text-gray-700"
            >Categories</label>
          <div id="categories" className="flex flex-wrap space-x-1">
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
          <div className={"mt-4 flex " + (!newMeme ? "justify-between" : "justify-end")}>
            {!newMeme && (
              <button
                className="mt-2 btn btn-link font-normal text-red-700"
                type="button"
                onClick={deleteMeme}
              >
                Delete
              </button>
            )}
            <button type="submit" className="mt-2 btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default MemeEdit;
