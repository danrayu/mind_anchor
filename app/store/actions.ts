import { Action, Dispatch, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

const url = "http://localhost:3000";

export const loadMemes = (): ThunkAction<
  void,
  RootState,
  undefined,
  Action<string>
> => {
  return async (dispatch: Dispatch): Promise<void> => {
    dispatch({ type: "LOAD_MEMES_START" });

    const response = await fetch(url + `/api/memes/?wCats`);

    if (!response.ok) {
      const errorData = await response.json();
      dispatch({ type: "LOAD_MEMES_FAILURE", error: errorData.error });
      return;
    }
    response
      .json()
      .then((data) => {
        dispatch({ type: "LOAD_MEMES_SUCCESS", payload: data });
      })
      .catch((error) => {
        dispatch({ type: "LOAD_MEMES_FAILURE", error });
      });
  };
};

export const loadCats = () => {
  return async (dispatch: any, getState: any) => {
    dispatch({ type: "LOAD_CATS_START" });

    const response = await fetch(url + `/api/categories`);

    if (!response.ok) {
      const errorData = await response.json();
      dispatch({ type: "LOAD_CATS_FAILURE", error: errorData.error });
      return;
    }
    response
      .json()
      .then((data) => {
        dispatch({ type: "LOAD_CATS_SUCCESS", payload: data });
      })
      .catch((error) => {
        dispatch({ type: "LOAD_CATS_FAILURE", error });
      });
  };
};

export const loadMindscapes = (): ThunkAction<
  void,
  RootState,
  undefined,
  Action<string>
> => {
  return async (dispatch: Dispatch): Promise<void> => {
    dispatch({ type: "LOAD_MINDSCAPES_START" });

    const response = await fetch(url + `/api/mindscapes`);

    if (!response.ok) {
      const errorData = await response.json();
      dispatch({ type: "LOAD_MINDSCAPES_FAILURE", error: errorData.error });
      return;
    }
    response
      .json()
      .then((data) => {
        dispatch({ type: "LOAD_MINDSCAPES_SUCCESS", payload: data });
      })
      .catch((error) => {
        dispatch({ type: "LOAD_MINDSCAPES_FAILURE", error });
      });
  };
};

export const loadAll = (): ThunkAction<
  void,
  RootState,
  undefined,
  Action<string>
> => {
  return async (dispatch: Dispatch): Promise<void> => {
    dispatch({ type: "LOAD_MEMES_START" });
    dispatch({ type: "LOAD_CATS_START" });
    dispatch({ type: "LOAD_MINDSCAPES_START" });

    const [memesResponse, catsResponse, mindscapesResponse] = await Promise.all(
      [
        fetch(url + `/api/memes/?wCats`),
        fetch(url + `/api/categories`),
        fetch(url + `/api/mindscapes`),
      ]
    );

    if (!memesResponse.ok) {
      const errorData = await memesResponse.json();
      dispatch({ type: "LOAD_MEMES_FAILURE", error: errorData.error });
      return;
    }
    memesResponse
      .json()
      .then((data) => {
        dispatch({ type: "LOAD_MEMES_SUCCESS", payload: data });
      })
      .catch((error) => {
        dispatch({ type: "LOAD_MEMES_FAILURE", error });
      });

    if (!catsResponse.ok) {
      const errorData = await catsResponse.json();
      dispatch({ type: "LOAD_CATS_FAILURE", error: errorData.error });
      return;
    }
    catsResponse
      .json()
      .then((data) => {
        dispatch({ type: "LOAD_CATS_SUCCESS", payload: data });
      })
      .catch((error) => {
        dispatch({ type: "LOAD_CATS_FAILURE", error });
      });

    if (!mindscapesResponse.ok) {
      const errorData = await mindscapesResponse.json();
      dispatch({ type: "LOAD_MINDSCAPES_FAILURE", error: errorData.error });
      return;
    }
    mindscapesResponse
      .json()
      .then((data) => {
        dispatch({ type: "LOAD_MINDSCAPES_SUCCESS", payload: data });
      })
      .catch((error) => {
        dispatch({ type: "LOAD_MINDSCAPES_FAILURE", error });
      });
  };
};

export const fetchAll = (): ThunkAction<
  void,
  RootState,
  undefined,
  Action<string>
> => {
  return async (dispatch: Dispatch): Promise<void> => {
    const [memesResponse, catsResponse, mindscapesResponse] = await Promise.all(
      [
        fetch(url + `/api/memes/?wCats`),
        fetch(url + `/api/categories`),
        fetch(url + `/api/mindscapes`),
      ]
    );

    if (!memesResponse.ok) {
      const errorData = await memesResponse.json();
      console.log("Could not fetch memes data:", errorData.error);
      return;
    }
    if (!catsResponse.ok) {
      const errorData = await catsResponse.json();
      console.log("Could not fetch categories data:", errorData.error);
      return;
    }
    if (!mindscapesResponse.ok) {
      const errorData = await mindscapesResponse.json();
      console.log("Could not fetch mindscapes data:", errorData.error);
      return;
    }

    memesResponse
      .json()
      .then((data) => {
        dispatch({ type: "FETCH_MEMES_SUCCESSFUL", payload: data });
      })
      .catch((error) => {
        console.log("Could not fetch memes data:", error);
      });

    catsResponse
      .json()
      .then((data) => {
        dispatch({ type: "FETCH_CATS_SUCCESSFUL", payload: data });
      })
      .catch((error) => {
        console.log("Could not fetch categories data:", error);
      });

    mindscapesResponse
      .json()
      .then((data) => {
        dispatch({ type: "FETCH_MINDSCAPES_SUCCESS", payload: data });
      })
      .catch((error) => {
        console.log("Could not fetch mindscapes data:", error);
      });
  };
};
