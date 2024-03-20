"use client";
import { useAppSelector } from "@/app/store/hooks";
import MemeEdit from "../components/MemeEdit";
import {
  useCatsValid,
  useColorsValid,
  useMemesValid,
} from "@/app/util/stateValidationHooks";

function NewMemePage() {
  const categories = useAppSelector((state) => state.categories.categories);
  const memesValid = useMemesValid();
  const catsValid = useCatsValid();
  const colorsValid = useColorsValid();
  return (
    <div className="mt-10">
      {!(memesValid && catsValid) && (
        <div className="flex items-center justify-center h-screen pb-[200px]">
          <span className="loading loading-dots loading-lg "></span>
        </div>
      )}
      {memesValid && catsValid && colorsValid && <MemeEdit categories={categories} />}
    </div>
  );
}

export default NewMemePage;
