"use client";
import { useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import DnDMemeDisplay from "../../components/dnd/DnDMemeDisplay";
import Collapse from "../../components/utility/Collapse";
import { fetchUpdateMindscape } from "@/app/fetchActions";
import DropdownDescription from "./DropdownDescription";

interface MindscapeViewProps {
  mindscape: Mindscape;
}

function MindscapeView({ mindscape }: MindscapeViewProps) {
  const breadcrumbs = [{ label: "Mindscapes" }, { label: mindscape.title }];
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(mindscape.title);

  const handleOnEdit = async () => {
    // If saving
    if (editMode) {
      const data = {
        title,
        id: mindscape.id,
        description: mindscape.description,
      };
      const response = await fetchUpdateMindscape(data);
      console.log("ok", response.ok);
    }
    setEditMode((state) => !state);
  };

  const handleTitleChange = (event: any) => {
    setTitle(event.target!.value);
  };

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
        <DropdownDescription description={mindscape.description} />
      </div>

      <DnDMemeDisplay />
    </div>
  );
}

export default MindscapeView;
