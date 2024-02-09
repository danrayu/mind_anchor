"use client";
import React, { useEffect, useState } from "react";
import SwitchCategory from "../../components/utility/SwitchCategory";
import {
  fetchCreateMeme,
  fetchDeleteMeme,
  fetchUpdateMeme,
} from "@/app/fetchActions";
import { useAppDispatch } from "@/app/store/hooks";
import { useRouter } from "next/navigation";
import { appFetch, load } from "@/app/store/actions";
import { Types } from "@/app/types/Types";
import SuccessAlert from "../../components/SuccessAlert";

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
  const router = useRouter();
  const dispatch = useAppDispatch();
  let isNew = false;
  if (initialMeme === undefined) {
    isNew = true;
    initialMeme = createEmptyMeme();
  }

  const [meme, setMeme] = useState<Meme>({ ...initialMeme });
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!meme.title) {
      alert("Please enter a title.");
      return;
    }
    await saveMeme(meme);
    if (isNew) {
      setMeme(createEmptyMeme());
    }
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
    const request = isNew ? fetchCreateMeme : fetchUpdateMeme;
    try {
      const response = await request(memeData);

      if (!response.ok) {
        throw new Error(
          `HTTP error status: ${response.status} - ${response.statusText}`
        );
      } else {
        dispatch(appFetch(Types.Memes));
        const data = await response.json();
        console.log("Meme saved:", data);
        setUpdateSuccess(true);
        setTimeout(() => setUpdateSuccess(false), 2224);
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
          dispatch(load(Types.Memes));
          console.log("Meme deleted", response);
          router.back();
        }
      }
    } catch (error) {
      console.error("Error deleting meme:", error);
    }
  };

  useEffect(() => {
  // setUpdateSuccess(true);

  }, [])

  return (
    <>
      {updateSuccess && (
        <SuccessAlert message={isNew ? "Meme added" : "Meme updated"}/>
      )}
      <div className="container mx-auto p-4 mt-6">
        <form onSubmit={handleSubmit} className="max-w-[600px] mx-auto">
          <h1 className="text-[35px] font-bold mb-4">
            {isNew && "Add"} {!isNew && "Edit"} meme
          </h1>

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
              spellCheck="false"
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
          >
            Categories
          </label>
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
          <div
            className={
              "mt-4 flex " + (!isNew ? "justify-between" : "justify-end")
            }
          >
            {!isNew && (
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
