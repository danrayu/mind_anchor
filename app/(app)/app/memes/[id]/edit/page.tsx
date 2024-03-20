"use client";
import React from "react";
import MemeEdit from "../../components/MemeEdit";
import { useAppSelector } from "@/app/store/hooks";
import { useCatsValid, useColorsValid, useMemesValid } from "@/app/util/stateValidationHooks";

interface EditMemePageProps {
  params: { id: string };
}

function EditMemePage({ params: { id } }: EditMemePageProps) {
  const memeState = useAppSelector((state) => state.memes);
  const categoryState = useAppSelector((state) => state.categories);
  const catsValid = useCatsValid();
  const colorsValid = useColorsValid();

  var meme: Meme | undefined = undefined;
  if (useMemesValid()) {
    meme = memeState.memes.find((meme: Meme) => meme.id === parseInt(id));
  }

  const categories = categoryState.categories;

  return (
    <div className="mt-10">
      {(memeState.loading || categoryState.loading) && (
        <div className="flex items-center justify-center h-screen pb-[200px]">
          <span className="loading loading-dots loading-lg "></span>
        </div>
      )}
      {meme !== undefined && colorsValid && catsValid && (
        <MemeEdit meme={meme!} categories={categories} />
      )}
    </div>
  );
}

export default EditMemePage;
