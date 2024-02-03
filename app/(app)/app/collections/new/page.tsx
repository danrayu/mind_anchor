"use client";
import React from "react";
import CollectionsForm from "../components/CollectionsForm";
import { useCatsValid, useMemesValid } from "@/app/util/stateValidationHooks";

function Page() {
  const memesValid = useMemesValid();
  const catsValid = useCatsValid();

  return <>{memesValid && catsValid && <CollectionsForm />}</>;
}

export default Page;
