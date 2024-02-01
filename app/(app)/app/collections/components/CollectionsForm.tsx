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
interface CollectionsFormInterface {
  collection?: Collection;
}

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

const SortableMeme = ({ meme }: { meme: CollectionMeme }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: meme.meme.id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      key={meme.meme.id}
      style={style}
      {...attributes}
      {...listeners}
      className="w-[300px] h-18"
    >
     {meme.meme.title}
    </div>
  );
};

function CollectionsForm({
  collection: initialCollection,
}: CollectionsFormInterface) {
  const isNew = initialCollection === undefined;
  const [collection, setCollection] = useState<Collection>(
    initialCollection || createEmptyCollections()
  );

  const [orderedMemes, setOrderedMemes] = useState<CollectionMeme[]>(
    collection.memes
  );

  const dispatch = useAppDispatch();
  const router = useRouter();

  const changedTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCollection((oldState) => {
      return { ...oldState, title: event.target!.value };
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await saveCollection(collection);
  };

  const saveCollection = async (collection: Collection) => {
    let requestData = {
      id: collection.id,
      title: collection.title,
      memes: collection.memes || [],
      authorId: collection.authorId,
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

  const onDragEnd = (event: DragEndEvent) => {
    console.log("drag end", event)
    const { active, over } = event;
    if (over && active.id === over.id) {
      return;
    }

    setOrderedMemes((memes: CollectionMeme[]) => {
      const oldIndex = memes.findIndex(
        (meme: CollectionMeme) => meme.meme.id === active.id
      );
      const newIndex = memes.findIndex(
        (meme: CollectionMeme) => meme.meme.id === over!.id
      );
      return arrayMove(memes, oldIndex, newIndex);
    });
  };
  console.log(orderedMemes);
  return (
    <>
      <MemeCatalogModal
          orderedMemes={orderedMemes}
          setOrderedMemes={setOrderedMemes}
        />
      <form onSubmit={handleSubmit} className="max-w-[600px] mx-auto">
        <h1 className="text-[35px] font-bold mb-4">
          {isNew && "Add"} {!isNew && "Edit"} collection
        </h1>

        <div className="mb-4">
          <label htmlFor="title" className="block font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={collection.title}
            onChange={changedTitle}
            className="mt-1 p-2 block rounded outline w-full"
          />
        </div>

        <div id="manage-memes">
          <button
            className="btn btn-outline"
            onClick={() =>
              (document.getElementById("meme-catalog")! as any).showModal()
            }
            type="button"
          >
            <span className="text-lg">+</span> Meme
          </button>
          {orderedMemes && (
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={onDragEnd}
            >
              <SortableContext
                items={orderedMemes}
                strategy={rectSortingStrategy}
              >
                {orderedMemes.map((meme: CollectionMeme) => (
                  <SortableMeme key={meme.meme.id} meme={meme} />
                ))}
              </SortableContext>
            </DndContext>
          )}
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
