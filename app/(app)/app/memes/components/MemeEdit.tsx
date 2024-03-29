"use client";
import React, { useState } from "react";
import SwitchCategory from "../../components/utility/SwitchCategory";
import {
  fetchCreateMeme,
  fetchDeleteMeme,
  fetchUpdateMeme,
} from "@/app/fetchActions";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { useRouter } from "next/navigation";
import { appFetch, load } from "@/app/store/actions";
import { Types } from "@/app/types/Types";
import AlertBody from "../../components/utility/AlertBody";
import SuccessAlertBody from "../../components/utility/SuccessAlertBody";
import ErrorAlertBody from "../../components/utility/ErrorAlertBody";
import Modal from "../../components/Modal";
import ColorBubble from "../../components/ColorBubble";
import { colors } from "@/app/util/colors";

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
    colorId: 1,
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
  const [showAlert, setShowAlert] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [selectedColor, setSelectedColor] = useState(initialMeme.colorId);

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
      return { ...oldState, favorite: !oldState.favorite };
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
      colorId: selectedColor,
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
        setAlertSuccess(true);
        playAlert();
      }
    } catch (error) {
      console.error("Error saving meme:", error);
      setAlertSuccess(false);
      playAlert();
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
          router.back();
        }
      }
    } catch (error) {
      console.error("Error deleting meme:", error);
    }
  };

  const playAlert = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 4000);
  } 

  const onSelectColor = (colorId: number) => {
    setSelectedColor(colorId);
    (document.getElementById("modal-color")! as any).close();
  };

  const openColorMenu = () => {
    (document.getElementById("modal-color")! as any).showModal();
  };

  return (
    <>
      <AlertBody show={showAlert}>
        {alertSuccess ? <SuccessAlertBody message="Meme updated."/> : <ErrorAlertBody message="Failed to update meme. Please try again later." />}
      </AlertBody>
      <Modal title="Select Hue" id="modal-color">
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
      <div className="container mx-auto p-4 mt-6">
        <form onSubmit={handleSubmit} className="max-w-[600px] mx-auto">
          <h1 className="text-[35px] font-bold mb-4">
            {isNew && "Add"} {!isNew && "Edit"} meme
          </h1>

          <div className="mb-4">
            <label htmlFor="title" className="block font-medium">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={meme.title}
              onChange={changedTitle}
              className="input input-bordered mt-1 p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={meme.description}
              onChange={changedDescription}
              spellCheck="false"
              className="mt-1 p-2 textarea textarea-bordered w-full h-40"
            ></textarea>
          </div>

          <div className="mb-4 flex space-x-4 items-center">
            <input
              type="checkbox"
              className={"mt-2 btn"}
              onChange={changedFavorite}
              aria-label="Favorite"
              checked={meme.favorite}
            />
          </div>
          <ColorBubble colorId={selectedColor} onClick={openColorMenu} />
          <label htmlFor="categories" className="block font-medium mt-6">
            Categories
          </label>
          <div id="categories" className="flex flex-wrap ">
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
                className="mt-2 btn btn-outline btn-error font-normal"
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
