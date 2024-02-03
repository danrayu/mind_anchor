import { useAppSelector } from "@/app/store/hooks";
import React from "react";
interface CollectionPickerProps {
  onSelect: (event: any) => void
}

function CollectionPicker({onSelect}: CollectionPickerProps) {
  const collections = useAppSelector((state) => state.collections.collections);
  return (
    <select className="select select-bordered w-full max-w-xs" onChange={onSelect}>
      {collections.map((collection: Collection) => (
        <option value={collection.id} key={collection.id}>{collection.title}</option>
      ))}
    </select>
  );
}

export default CollectionPicker;
