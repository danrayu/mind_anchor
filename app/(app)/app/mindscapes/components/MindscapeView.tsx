"use client";
import { useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import { fetchDeleteMindscape, fetchUpdateMindscape } from "@/app/fetchActions";
import DropdownDescription from "./DropdownDescription";
import DescriptionField from "./DescriptionField";
import { useAppDispatch } from "@/app/store/hooks";
import { appFetch } from "@/app/store/actions";
import { Types } from "@/app/types/Types";
import DnDMindscapeMemes from "./DnDMindscapeMemes";
import Modal from "../../components/Modal";
import MemeCatalogModal from "./MemeCatalogModal";
import MemeContainer from "../../memes/components/MemeContainer";

interface MindscapeViewProps {
  mindscape: Mindscape;
}

function MindscapeView({ mindscape }: MindscapeViewProps) {
  const breadcrumbs = [{ label: "Mindscapes" }];
  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(mindscape.title);
  const [description, setDescription] = useState(mindscape.description);
  const [orderedMemes, setOrderedMemes] = useState<Meme[]>(
    mindscape.memes.map((meme: MindscapeMeme) => meme.meme)
  );

  const handleOnEdit = async () => {
    // If saving
    if (editMode) {
      if (!title) {
        alert("Please enter a title for the mindscape.");
        return;
      }
      const memeData = orderedMemes.map((meme: Meme, index: number) => {
        return {
          indexInMindscape: index,
          memeId: meme.id,
          mindscapeId: mindscape.id,
        };
      });
      const data = {
        id: mindscape.id,
        title,
        description,
        memes: memeData || mindscape.memes,
      };
      const response = await fetchUpdateMindscape(data);
      if (response.ok) {
        dispatch(appFetch(Types.Mindscapes));
      }
    }
    setEditMode((state) => !state);
  };

  const handleTitleChange = (event: any) => {
    setTitle(event.target!.value);
  };

  const handleDescriptionChange = (event: any) => {
    setDescription(event.target!.value);
  };

  const handleDelete = async () => {
    const ok = confirm(
      "Are you sure you would like to delete Mindscape " + mindscape.title + "?"
    );
    if (ok) {
      try {
        const response = await fetchDeleteMindscape(mindscape.id);
        if (response.ok) {
          dispatch(appFetch(Types.Mindscapes));
        }
      } catch (error) {
      }
    }
  };

  return (
    <>
      <Modal
        title={"Meme Catalog"}
        id={"meme-catalog"}
        className={"width-11/12 max-w-3xl"}
      >
        <MemeCatalogModal
          orderedMemes={orderedMemes}
          setOrderedMemes={setOrderedMemes}
        />
      </Modal>
      <div className="mt-2">
        <div>
          {!editMode && <Breadcrumbs items={breadcrumbs} />}

          <div className="w-full flex flex-grow overflow-hidden items-center justify-between">
            {editMode ? (
              <input
                type="text"
                placeholder="Title"
                className="text-[35px] p-0 border-0 outline-0 bg-transparent grow break-words overflow-hidden"
                value={title}
                onKeyDown={handleTitleChange}
                onChange={handleTitleChange}
                maxLength={50}
              />
            ) : (
              <h1 className="text-[35px] font-bold -mt-1">{title}</h1>
            )}
            <button className="btn btn-primary" onClick={handleOnEdit}>
              {editMode ? "Save" : "Edit"}
            </button>
          </div>
          <div className="mt-6">
            {editMode && (
              <DescriptionField
                value={description}
                onChange={handleDescriptionChange}
              />
            )}
            {!editMode && <DropdownDescription description={description} />}
          </div>

          <div className="mt-12 space-y-4">
            {!editMode &&
              orderedMemes.map((meme: Meme) => (
                <MemeContainer key={meme.id} meme={meme} />
              ))}
          </div>
          {editMode && (
            <DnDMindscapeMemes
              orderedMemes={orderedMemes}
              setOrderedMemes={setOrderedMemes}
            />
          )}
          {editMode && (
            <button
              className="mt-2 btn btn-link font-normal text-red-700"
              type="button"
              onClick={handleDelete}
            >
              Delete mindscape
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default MindscapeView;
