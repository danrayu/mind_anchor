"use client";
import React, { useState } from "react";
import { useAppSelector } from "@/app/store/hooks";
import { useMindscapesValid } from "@/app/util/stateValidationHooks";
import MindscapeView from "../components/MindscapeView";

interface EditPageProps {
  params: { id: string };
}

function Page({ params: { id } }: EditPageProps) {
  const mindscapeState = useAppSelector((state) => state.mindscapes);
  const mindscapesValid = useMindscapesValid();


  var mindscape: Mindscape | undefined = undefined;
  if (mindscapesValid) {
    mindscape = mindscapeState.mindscapes.find(
      (mindscape: Mindscape) => mindscape.id === parseInt(id)
    );
  }
  
  return (
    <div className="mt-10">
      {(mindscapeState.loading) && <h3>Loading...</h3>}
      {mindscape !== undefined && mindscapesValid && (
        <MindscapeView mindscape={mindscape!} />
      )}
    </div>
  );
}

export default Page;
