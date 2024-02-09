"use client";

import { useAppSelector } from "@/app/store/hooks";
import MemesPage from "./components/MemesPage";
import { useAllValid } from "@/app/util/stateValidationHooks";

function Page() {
  const memesState = useAppSelector((state) => state.memes);
  const categoryState = useAppSelector((state) => state.categories);

  return (
    <div>
      {memesState.loading && (
        <div className="flex items-center justify-center h-screen pb-[200px]">
          <span className="loading loading-dots loading-lg "></span>
        </div>
      )}
      {useAllValid() && (
        <MemesPage
          memes={memesState.memes}
          categories={categoryState.categories}
        ></MemesPage>
      )}
    </div>
  );
}

export default Page;
