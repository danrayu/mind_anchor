import { useAppSelector } from '@/app/store/hooks'
import React from 'react'

function CollectionsView() {
  const collection = useAppSelector((state) => state.collections.collections)
  return (
    <div>{JSON.stringify(collection)}</div>
  )
}

export default CollectionsView