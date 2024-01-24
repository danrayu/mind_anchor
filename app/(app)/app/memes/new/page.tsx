"use client";
import { useAppSelector } from "@/app/store/hooks";
import MemeEdit from "../components/MemeEdit";
import { useAllValid } from "@/app/util/stateValidationHooks";

function NewMemePage() {
  const categories = useAppSelector((state) => state.categories.categories);
  const allValid = useAllValid();
  return (
    <div className="mt-10">
      {allValid && <MemeEdit categories={categories} />}
    </div>
  );
}

export default NewMemePage;
