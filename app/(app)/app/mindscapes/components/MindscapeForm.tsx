import {
  fetchCreateMindscape,
  fetchDeleteMindscape,
  fetchUpdateMindscape,
} from "@/app/fetchActions";
import { appFetch, load } from "@/app/store/actions";
import { useAppDispatch } from "@/app/store/hooks";
import { Types } from "@/app/types/Types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import MemeCatalogModal from "./MemeCatalogModal";
import Modal from "../../components/Modal";
import DnDMindscapeMemes from "./DnDMindscapeMemes";

interface CMindscapeFormInterface {
  mindscape?: Mindscape;
}

type CMemeModel = {
  indexInMindscape: number;
  memeId: number;
  mindscapeId: number;
};

function createEmptyMindscape(): Mindscape {
  return {
    id: 0,
    title: "",
    description: "",
    authorId: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    memes: [],
  };
}

function MindscapeForm({
  mindscape: initialMindscape,
}: CMindscapeFormInterface) {
  const isNew = initialMindscape === undefined;
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [mindscape, setMindscape] = useState<Mindscape>(
    initialMindscape || createEmptyMindscape()
  );
  const [titleInputError, setTitleInputError] = useState<string>("");
  const [orderedMemes, setOrderedMemes] = useState<Meme[]>(
    mindscape.memes.map((meme: MindscapeMeme) => meme.meme)
  );

  const changedTitle = (event: any) => {
    setTitleInputError(() => {
      if (event.target!.value.length === event.target.maxLength) {
        return "Max length 80 characters.";
      } else {
        return "";
      }
    });
    setMindscape((oldState) => {
      return { ...oldState, title: event.target!.value };
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await saveMindscape(mindscape);
  };

  const saveMindscape = async (mindscape: Mindscape) => {
    const memeData = orderedMemes.map(
      (meme: Meme, index: number): CMemeModel => {
        return {
          indexInMindscape: index,
          memeId: meme.id,
          mindscapeId: mindscape.id,
        };
      }
    );
    let requestData = {
      id: mindscape.id,
      title: mindscape.title,
      memes: memeData || mindscape.memes,
    };
    const request = isNew ? fetchCreateMindscape : fetchUpdateMindscape;
    try {
      const response = await request(requestData);

      if (!response.ok) {
        throw new Error(
          `HTTP error status: ${response.status} - ${response.statusText}`
        );
      } else {
        dispatch(appFetch(Types.Mindscapes));
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

  const handleDelete = async () => {
    try {
      var proceed = confirm(
        `Are you sure you want to delete mindscape ${mindscape.title}?`
      );
      if (proceed) {
        const response = await fetchDeleteMindscape(mindscape.id);
        if (response.ok) {
          dispatch(load(Types.Mindscapes));
          console.log("Mindscape deleted", response);
          router.back();
        }
      }
    } catch (error) {
      console.error("Error deleting Mindscape:", error);
    }
  };

  const titleInputBlur = () => {
    setTitleInputError("");
  };

  return (
    <>
      <Modal title={"Meme Catalog"} id={"meme-catalog"}>
        <MemeCatalogModal
          orderedMemes={orderedMemes}
          setOrderedMemes={setOrderedMemes}
        />
      </Modal>
      <form onSubmit={handleSubmit} className="max-w-[800px] mx-auto mt-10">
        <h1 className="text-[35px] font-bold mb-4">
          {isNew && "Add"} {!isNew && "Edit"} mindscape
        </h1>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-base">Title</span>
            {/* top right <span className="label-text-alt"></span> */}
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
            value={mindscape.title}
            onChange={changedTitle}
            onKeyDown={changedTitle}
            maxLength={80}
            onBlur={titleInputBlur}
          />
          <div className="label">
            {titleInputError && (
              <span className="label-text-alt text-base text-error">
                {titleInputError}
              </span>
            )}
          </div>
        </label>
        <DnDMindscapeMemes
          orderedMemes={orderedMemes}
          setOrderedMemes={setOrderedMemes}
        />

        <div
          className={
            "mt-4 flex " + (!isNew ? "justify-between" : "justify-end")
          }
        >
          {!isNew && (
            <button
              className="mt-2 btn btn-link font-normal text-red-700"
              type="button"
              onClick={handleDelete}
            >
              Delete
            </button>
          )}
          <button type="submit" className="mt-2 btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </>
  );
}

export default MindscapeForm;
