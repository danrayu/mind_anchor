"use client";
import React from "react";
import { useAppSelector } from "@/app/store/hooks";
import { useAllValid, useMindscapesValid } from "@/app/util/stateValidationHooks";
import MindscapeView from "../components/MindscapeView";

interface EditPageProps {
  params: { id: string };
}

function Page({ params: { id } }: EditPageProps) {

  const memeState = useAppSelector((state) => state.memes);
  const categoryState = useAppSelector((state) => state.categories);
  const mindscapeState = useAppSelector((state) => state.mindscapes);
  const allValid = useAllValid();
  const mindscapeValid = useMindscapesValid();

  var mindscape: Mindscape | undefined = undefined;
  if (mindscapeValid) {
    mindscape = mindscapeState.mindscapes.find(
      (mindscape: Mindscape) => mindscape.id === parseInt(id)
    );
  }
  
  return (
    <div className="mt-10">
      {(mindscapeState.loading) && <h3>Loading...</h3>}
      {mindscape !== undefined && (
        <MindscapeView mindscape={mindscape!} />
      )}
    </div>
  );
}

export default Page;
