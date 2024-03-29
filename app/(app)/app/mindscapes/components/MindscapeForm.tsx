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
import AlertBody from "../../components/utility/AlertBody";
import SuccessAlertBody from "../../components/utility/SuccessAlertBody";
import ErrorAlertBody from "../../components/utility/ErrorAlertBody";

interface CMindscapeFormInterface {
  mindscape?: Mindscape;
}

type CMemeModel = {
  indexInMindscape: number;
  memeId: number;
  mindscapeId: number;
};

type AlertState = {
  showAlert: boolean;
  actionSuccess: boolean;
  alertMessage: string;
}

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
  const [alertState, setAlertState] = useState<AlertState>({showAlert: false, actionSuccess: false, alertMessage: ""});

  const [orderedMemes, setOrderedMemes] = useState<Meme[]>(
    mindscape.memes.map((meme: MindscapeMeme) => meme.meme)
  );


const playAlert = () => {
  setAlertState((prevState: AlertState) => {
    return { ...prevState, showAlert: true };
  });
  setTimeout(() => {
    setAlertState((prevState: AlertState) => {
      return { ...prevState, showAlert: false };
    });
  }, 4000);
};

const setAlertSuccessful = (actionSuccess: boolean) => {
  setAlertState((prevState: AlertState) => {
    return { ...prevState, actionSuccess };
  });
}

const setAlertMessage = (message: string) => {
  setAlertState((prevState: AlertState) => {
    return { ...prevState, alertMessage: message };
  });
}

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
      description: mindscape.description,
      memes: memeData || mindscape.memes,
    };
    const request = isNew ? fetchCreateMindscape : fetchUpdateMindscape;
    try {
      const response = await request(requestData);
      
      if (!response.ok) {
        console.log("!response.ok")
        setAlertMessage("There was a problem. Please try again.");
        setAlertSuccessful(false);
        playAlert();
        throw new Error(
          `HTTP error status: ${response.status} - ${response.statusText}`
        );
      } else {
        
        
        dispatch(appFetch(Types.Mindscapes));
        const data = await response.json();
        if (isNew) {
          //router.push("/app/mindscapes/" + data.id);
        }
        setAlertMessage("Success! Added mindscape.");
        setAlertSuccessful(true);
        playAlert();
      }
    } catch (error) {
      console.log(error)
      setAlertMessage("There was a problem. Please try again.");
      setAlertSuccessful(false);
      playAlert();
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
          setAlertMessage("Deleted.");
          setAlertSuccessful(true);
          playAlert();
          dispatch(load(Types.Mindscapes));
          router.back();
        }
      }
    } catch (error) {
      setAlertMessage("There was a problem. Please try again.");
      setAlertSuccessful(false);
      playAlert();
    }
  };

  const titleInputBlur = () => {
    setTitleInputError("");
  };

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

  const changedDescription = (event: any) => {
    setMindscape((oldState) => {
      return { ...oldState, description: event.target!.value };
    });
  };

  return (
    <>
      <Modal title={"Meme Catalog"} id={"meme-catalog"}>
        <MemeCatalogModal
          orderedMemes={orderedMemes}
          setOrderedMemes={setOrderedMemes}
        />
      </Modal>

      <AlertBody show={alertState.showAlert}>
        {alertState.actionSuccess ? (
          <SuccessAlertBody message={alertState.alertMessage} />
        ) : (
          <ErrorAlertBody message={alertState.alertMessage} />
        )}
      </AlertBody>
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
            placeholder="Enter the title of the mindscape"
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
        <div className="label">
          <span className="label-text text-base">Description</span>
        </div>
        <textarea
          className="textarea textarea-bordered w-full h-[150px] text-base"
          placeholder="Enter the description of the mindscape"
          value={mindscape.description}
          onChange={changedDescription}
        ></textarea>
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
