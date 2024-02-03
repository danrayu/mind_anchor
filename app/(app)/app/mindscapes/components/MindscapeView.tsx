"use client";
import { useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import DnDMemeDisplay from "../../components/dnd/DnDMemeDisplay";
import Collapse from "../../components/Collapse";
import { fetchUpdateMindscape } from "@/app/fetchActions";
import DropdownDescription from "./DropdownDescription";
import { useAppSelector } from "@/app/store/hooks";
import DescriptionField from "./DescriptionField";
import CollectionPicker from "./CollectionPicker";

interface MindscapeViewProps {
  mindscape: Mindscape;
}

function MindscapeView({ mindscape }: MindscapeViewProps) {
  const breadcrumbs = [{ label: "Mindscapes" }, { label: mindscape.title }];
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(mindscape.title);
  const [description, setDescription] = useState(mindscape.description);
  const [collection, setCollection] = useState<Collection | undefined>(undefined);
  const memes = useAppSelector((state) => state.memes.memes);
  const collections = useAppSelector(state => state.collections.collections);

  const handleOnEdit = async () => {
    // If saving
    if (editMode) {
      const data = {
        id: mindscape.id,
        title,
        description,
      };
      const response = await fetchUpdateMindscape(data);
      console.log("ok", response.ok);
    }
    setEditMode((state) => !state);
  };

  const handleTitleChange = (event: any) => {
    setTitle(event.target!.value);
  };

  const handleDescriptionChange = (event: any) => {
    setDescription(event.target!.value);
  }

  const handleSelect = (event: any) => {
    console.log("selected collection id", event.target!.value);
    setCollection(collections.find((col: Collection) => col.id === parseInt(event.target!.value)))
  }

  return (
    <div className="mt-10">
      <Breadcrumbs items={breadcrumbs} />
      <div className="flex flex-wrap">
        <div className="w-full flex flex-wrap justify-between mb-2">
          {editMode ? (
            <input
              type="text"
              placeholder="Title"
              className="text-[35px] p-0 border-0 outline-0 "
              value={title}
              onKeyDown={handleTitleChange}
              onChange={handleTitleChange}
            />
          ) : (
            <h1 className="text-[35px] font-bold">{title}</h1>
          )}

          <button className="btn btn-primary" onClick={handleOnEdit}>
            {editMode ? "Save" : "Edit"}
          </button>
        </div>
        {editMode && <DescriptionField value={description} onChange={handleDescriptionChange}/>}
        {!editMode && <DropdownDescription description={description} />}
        
      </div>
      {!editMode && collection && <DnDMemeDisplay memes={collection.memes.map((meme: CollectionMeme) => meme.meme)} />}
      {editMode && <CollectionPicker onSelect={handleSelect}/>}
    </div>
  );
}

export default MindscapeView;
