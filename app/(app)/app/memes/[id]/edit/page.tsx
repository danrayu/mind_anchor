"use client";
import React from "react";
import MemeEdit from "../../components/MemeEdit";
import { useAppSelector } from "@/app/store/hooks";
import { useCatsValid, useMemesValid } from "@/app/util/stateValidationHooks";

interface EditMemePageProps {
  params: { id: string };
}

function EditMemePage({ params: { id } }: EditMemePageProps) {

  const memeState = useAppSelector((state) => state.memes);
  const categoryState = useAppSelector((state) => state.categories);
  const catsValid = useCatsValid();

  var meme: Meme | undefined = undefined;
  if (useMemesValid()) {
    meme = memeState.memes.find(
      (meme: Meme) => meme.id === parseInt(id)
    );
  }
  
  const categories = categoryState.categories;
  

  return (
    <div className="mt-10">
      {(memeState.loading || categoryState.loading) && <h3>Loading...</h3>}
      {meme !== undefined && catsValid && (
        <MemeEdit meme={meme!} categories={categories} />
      )}
    </div>
  );
}

export default EditMemePage;
