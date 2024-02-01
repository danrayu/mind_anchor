import { useAppSelector } from '@/app/store/hooks'
import React from 'react'
import CollectionItem from './CollectionItem'

function CollectionsView() {
  const collections = useAppSelector((state) => state.collections.collections)
  return (
    <div>{collections.map((collection: Collection) => {
      return <CollectionItem key={collection.id} collection={collection}/>
    })}</div>
  )
}

export default CollectionsView