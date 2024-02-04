"use client";
import React, { useState } from "react";
import { useAppSelector } from "@/app/store/hooks";
import { useAllValid, useMindscapesValid } from "@/app/util/stateValidationHooks";
import MindscapeView from "../components/MindscapeView";

interface EditPageProps {
  params: { id: string };
}

function Page({ params: { id } }: EditPageProps) {
  const mindscapeState = useAppSelector((state) => state.mindscapes);
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
