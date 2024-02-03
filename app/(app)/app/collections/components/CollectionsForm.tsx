import {
  fetchCreateCollection,
  fetchDeleteCollection,
  fetchUpdateCollection,
} from "@/app/fetchActions";
import { load } from "@/app/store/actions";
import { useAppDispatch } from "@/app/store/hooks";
import { Types } from "@/app/types/Types";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import MemeCatalogModal from "./MemeCatalogModal";
import CollectionMeme from "./CollectionMeme";
interface CollectionsFormInterface {
  collection?: Collection;
}

type CMemeModel = {
  indexInCollection: number;
  memeId: number;
  collectionId: number;
};

function createEmptyCollections(): Collection {
  return {
    id: 0,
    title: "",
    authorId: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    memes: [],
  };
}

function CollectionsForm({
  collection: initialCollection,
}: CollectionsFormInterface) {
  const isNew = initialCollection === undefined;
  const [collection, setCollection] = useState<Collection>(
    initialCollection || createEmptyCollections()
  );

  const [titleInputError, setTitleInputError] = useState<string>("");

  const [orderedMemes, setOrderedMemes] = useState<Meme[]>(
    collection.memes.map((meme: CollectionMeme) => meme.meme)
  );

  const dispatch = useAppDispatch();
  const router = useRouter();

  const changedTitle = (event: any) => {
    setTitleInputError(() => {
      if (event.target!.value.length === event.target.maxLength) {
        return "Max length 80 characters.";
      } else {
        return "";
      }
    });
    setCollection((oldState) => {
      return { ...oldState, title: event.target!.value };
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await saveCollection(collection);
  };

  const saveCollection = async (collection: Collection) => {
    const memeData = orderedMemes.map(
      (meme: Meme, index: number): CMemeModel => {
        const collMeme = collection.memes.find(
          (collMeme: CollectionMeme) => collMeme.meme.id === meme.id
        );
        if (collMeme) {
          collMeme.index = index;
          return {
            indexInCollection: index,
            memeId: meme.id,
            collectionId: collection.id,
          };
        }
        return {
          indexInCollection: index,
          memeId: meme.id,
          collectionId: collection.id,
        };
      }
    );
    let requestData = {
      id: collection.id,
      title: collection.title,
      memes: memeData || collection.memes || [],
    };
    const request = isNew ? fetchCreateCollection : fetchUpdateCollection;
    try {
      const response = await request(requestData);

      if (!response.ok) {
        throw new Error(
          `HTTP error status: ${response.status} - ${response.statusText}`
        );
      } else {
        dispatch(load(Types.Collections));
        const data = await response.json();
        console.log("Collection saved:", data);
        if (isNew) {
          router.push("/app/collections/" + data.collection.id);
        }
        // display success
        // setUpdateSuccess(true);
        // setTimeout(() => setUpdateSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Error saving collection:", error);
      // display failure
      // setUpdateSuccess(false);
    }
  };

  const handleDelete = async () => {
    try {
      var proceed = confirm(
        `Are you sure you want to delete mindscape ${collection.title}?`
      );
      if (proceed) {
        const response = await fetchDeleteCollection(collection.id);
        if (response.ok) {
          dispatch(load(Types.Mindscapes));
          console.log("Meme deleted", response);
          router.back();
        }
      }
    } catch (error) {
      console.error("Error deleting meme:", error);
    }
  };

  const titleInputBlur = () => {
    setTitleInputError("");
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id === over.id) {
      return;
    }

    setOrderedMemes((memes: Meme[]) => {
      const oldIndex = memes.findIndex((meme: Meme) => meme.id === active.id);
      const newIndex = memes.findIndex((meme: Meme) => meme.id === over!.id);
      return arrayMove(memes, oldIndex, newIndex);
    });
  };

  const onRemoveMeme = (id: number) => {
    console.log(id);
    setOrderedMemes((state) => {
      const i = state.findIndex((meme) => meme.id === id);
      state.splice(i, 1);
      console.log("state", state.slice())
      return state.slice();
    })
  }

  return (
    <>
      <MemeCatalogModal
        orderedMemes={orderedMemes}
        setOrderedMemes={setOrderedMemes}
      />
      <form onSubmit={handleSubmit} className="max-w-[800px] mx-auto mt-10">
        <h1 className="text-[35px] font-bold mb-4">
          {isNew && "Add"} {!isNew && "Edit"} collection
        </h1>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-base">Title</span>
            {/* top right <span className="label-text-alt"></span> */}
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
            value={collection.title}
            onChange={changedTitle}
            onKeyDown={changedTitle}
            maxLength={80}
            onBlur={titleInputBlur}
          />
          <div className="label">
            {titleInputError && (
              <span className="label-text-alt text-base text-error">
                {titleInputError}
              </span>
            )}
          </div>
        </label>

        <div id="manage-memes">
          <div className="flex flex-wrap justify-between items-center">
            <h3 className="">Memes</h3>
            <button
              className="btn btn-outline"
              onClick={() =>
                (document.getElementById("meme-catalog")! as any).showModal()
              }
              type="button"
            >
              <span className="text-lg">+</span> Meme
            </button>
          </div>

          <div className="mt-2 outline rounded-xl">
          {orderedMemes && (
                  <DndContext
                    collisionDetection={closestCenter}
                    onDragEnd={onDragEnd}
                  >
                    <SortableContext
                      items={orderedMemes}
                      strategy={rectSortingStrategy}
                    >
                      {orderedMemes.map((meme: Meme) => (
                        <CollectionMeme meme={meme} key={meme.id} onRemove={onRemoveMeme} />
                      ))}
                    </SortableContext>
                  </DndContext>
                )}
          </div>
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
              onClick={handleDelete}
            >
              Delete
            </button>
          )}
          <button type="submit" className="mt-2 btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </>
  );
}

export default CollectionsForm;
