import { useAppSelector } from "@/app/store/hooks";
import { useEffect, useState } from "react";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { useMemesValid } from "@/app/util/stateValidationHooks";
import {
  SortableContext,
  arrayMove,
  arraySwap,
  rectSortingStrategy,
  rectSwappingStrategy,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Collapse from "../Collapse";

const SortableMeme = ({ meme }: { meme: Meme }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: meme.id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="mb-6">
      <Collapse title={meme.title} description={meme.description} />
    </div>
  );
};
interface DnDMemeDisplayProps {
  memes: Meme[];
}

function DnDMemeDisplay({ memes }: DnDMemeDisplayProps) {
  const [orderedMemes, setOrderedMemes] = useState<Meme[]>([]);
  const memesOk = useMemesValid();

  useEffect(() => {
    memesOk && setOrderedMemes(memes);
  }, [memes, memesOk]);

  const onDragEnd = (event: DragEndEvent) => {
    console.log("drag end", event);
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

  return (
    <div className="mt-5">
      <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={orderedMemes} strategy={rectSortingStrategy}>
          {orderedMemes.map((meme: Meme) => (
            <SortableMeme key={meme.id} meme={meme} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default DnDMemeDisplay;
