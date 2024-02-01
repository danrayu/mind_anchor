"use client"
import React, { useEffect } from 'react'
import CollectionsForm from '../components/CollectionsForm'
import { useAppSelector } from '@/app/store/hooks'
import { useCollectionsValid } from '@/app/util/stateValidationHooks';
interface EditPageProps {
  params: { id: string };
}

function Page({params: {id}}: EditPageProps) {
  const valid = useCollectionsValid();
  const collectionState = useAppSelector(state => state.collections);

  var collection: Collection | undefined = undefined;
  if (valid) {
    collection = collectionState.collections.find(
      (collection: Mindscape) => collection.id === parseInt(id)
    );
  }
  
  return (
    <div className="mt-10">
      {(collectionState.loading) && <h3>Loading...</h3>}
      {collection !== undefined && (
        <CollectionsForm collection={collection!} />
      )}
    </div>
  );
}

export default Page;