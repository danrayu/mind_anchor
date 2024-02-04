"use client";
import React from "react";
import MindscapeForm from "../components/MindscapeForm";
import { useCatsValid, useMemesValid } from "@/app/util/stateValidationHooks";

function NewMindscapePage() {
  const memesValid = useMemesValid();
  const categoriesValid = useCatsValid();
  return (memesValid && categoriesValid && <MindscapeForm />);
}

export default NewMindscapePage;
