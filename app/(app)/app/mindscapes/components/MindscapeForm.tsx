"use client";
import {
  fetchCreateMindscape,
  fetchDeleteMindscape,
  fetchUpdateMindscape,
} from "@/app/fetchActions";
import { load } from "@/app/store/actions";
import { useAppDispatch } from "@/app/store/hooks";
import { Types } from "@/app/types/Types";
import { useRouter } from "next/navigation";
import React, { FormEventHandler, useState } from "react";
interface MindscapeFormProps {
  mindscape?: Mindscape;
}

function createEmptyMindscape(): Mindscape {
  return {
    id: 0,
    title: "",
    description: "",
    authorId: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    collections: [],
  };
}

function MindscapeForm({ mindscape: initialMindscape }: MindscapeFormProps) {
  const isNew: boolean = initialMindscape === undefined;

  const dispatch = useAppDispatch();
  const router = useRouter();
  const [mindscape, setMindscape] = useState<Mindscape>(
    initialMindscape || createEmptyMindscape()
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await saveMindscape(mindscape);
    
  };

  const changedTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMindscape((oldState) => {
      return { ...oldState, title: event.target!.value };
    });
  };

  const changedDescription = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMindscape((oldState) => {
      return { ...oldState, description: event.target!.value };
    });
  };

  const saveMindscape = async (mindscape: Mindscape) => {
    let mindscapeData = {
      id: mindscape.id,
      title: mindscape.title,
      description: mindscape.description,
      authorId: mindscape.authorId,
    };
    const request = isNew ? fetchCreateMindscape : fetchUpdateMindscape;
    try {
      const response = await request(mindscapeData);

      if (!response.ok) {
        throw new Error(
          `HTTP error status: ${response.status} - ${response.statusText}`
        );
      } else {
        dispatch(load(Types.Mindscapes));
        const data = await response.json();
        console.log("Mindscape saved:", data);
        if (isNew) {
          router.push("/app/mindscapes/" + data.mindscape.id);
        } 
        // display success
        // setUpdateSuccess(true);
        // setTimeout(() => setUpdateSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Error saving mindscape:", error);
      // display failure
      // setUpdateSuccess(false);
    }
  };

  const deleteMindscape = async () => {
    try {
      var proceed = confirm(
        `Are you sure you want to delete mindscape ${mindscape.title}?`
      );
      if (proceed) {
        const response = await fetchDeleteMindscape(mindscape.id);
        if (response.ok) {
          dispatch(load(Types.Mindscapes));
          console.log("Meme deleted", response);
          router.back();
        }
      }
    } catch (error) {
      console.error("Error deleting meme:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-[600px] mx-auto">
      <h1 className="text-[35px] font-bold mb-4">
        {isNew && "Add"} {!isNew && "Edit"} mindscape
      </h1>

      <div className="mb-4">
        <label htmlFor="title" className="block font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={mindscape.title}
          onChange={changedTitle}
          className="mt-1 p-2 block rounded outline w-full"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="description"
          className="block font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={mindscape.description}
          onChange={changedDescription}
          spellCheck="false"
          className="mt-1 p-2 block rounded outline w-full h-40"
        ></textarea>
      </div>

      <div
        className={"mt-4 flex " + (!isNew ? "justify-between" : "justify-end")}
      >
        {!isNew && (
          <button
            className="mt-2 btn btn-link font-normal text-red-700"
            type="button"
            onClick={deleteMindscape}
          >
            Delete
          </button>
        )}
        <button type="submit" className="mt-2 btn btn-primary">
          Save
        </button>
      </div>
    </form>
  );
}

export default MindscapeForm;
