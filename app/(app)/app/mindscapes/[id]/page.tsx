"use client";
import React, { useState } from "react";
import { useAppSelector } from "@/app/store/hooks";
import { useColorsValid, useMindscapesValid } from "@/app/util/stateValidationHooks";
import MindscapeView from "../components/MindscapeView";

interface EditPageProps {
  params: { id: string };
}

function Page({ params: { id } }: EditPageProps) {
  const mindscapeState = useAppSelector((state) => state.mindscapes);
  const mindscapesValid = useMindscapesValid();
  const colorsValid = useColorsValid();

  var mindscape: Mindscape | undefined = undefined;
  if (mindscapesValid) {
    mindscape = mindscapeState.mindscapes.find(
      (mindscape: Mindscape) => mindscape.id === parseInt(id)
    );
  }

  return (
    <div className="mt-10">
      {mindscapeState.loading && (
        <div className="flex items-center justify-center h-screen pb-[200px]">
          <span className="loading loading-dots loading-lg "></span>
        </div>
      )}
      {mindscape !== undefined && mindscapesValid && colorsValid && (
        <MindscapeView mindscape={mindscape!} />
      )}
    </div>
  );
}

export default Page;
