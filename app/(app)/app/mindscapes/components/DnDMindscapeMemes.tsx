import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import React from "react";
import CollectionMeme from "./MindscapeMeme";
interface DndMindscapeMemesProps {
  orderedMemes: Meme[];
  setOrderedMemes: React.Dispatch<React.SetStateAction<Meme[]>>;
}

function DnDMindscapeMemes({
  orderedMemes,
  setOrderedMemes,
}: DndMindscapeMemesProps) {
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
      console.log("state", state.slice());
      return state.slice();
    });
  };
  return (
    <div id="order-memes" className="mt-6">
      <div className="flex flex-wrap justify-between items-center">
        <h3 className="">Memes</h3>
        <button
          className="btn btn-outline btn-normal"
          onClick={() =>
            (document.getElementById("meme-catalog")! as any).showModal()
          }
          type="button"
        >
          <span className="text-base">+</span> Meme
        </button>
      </div>
      <div className="mt-2 border border-base-content rounded-xl">
        {orderedMemes && (
          <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext
              items={orderedMemes}
              strategy={rectSortingStrategy}
            >
              {orderedMemes.map((meme: Meme) => (
                <CollectionMeme
                  meme={meme}
                  key={meme.id}
                  onRemove={onRemoveMeme}
                />
              ))}
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
}

export default DnDMindscapeMemes;
