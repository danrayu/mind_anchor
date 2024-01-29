"use client";

import { useAppSelector } from "@/app/store/hooks";
import { useAllValid, useCollectionsValid, useMemesValid } from "@/app/util/stateValidationHooks";
import CollectionsView from "./components/CollectionsView";

function Page() {
  const collectionsState = useAppSelector((state) => state.collections);
  const memesState = useAppSelector((state) => state.memes);
  const collectionsValid = useCollectionsValid();
  const memesValid = useMemesValid();

  return (
    <div>
      {collectionsValid && memesValid && <CollectionsView></CollectionsView>}
      {(memesState.loading || collectionsState.loading) && <h3>Loading</h3>}
    </div>
  );
}

export default Page;