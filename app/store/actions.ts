import { Action, Dispatch, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

const url = "http://localhost:3000";

export const fetchMemes = (): ThunkAction<
  void,
  RootState,
  undefined,
  Action<string>
> => {
  return async (dispatch: Dispatch): Promise<void> => {
    dispatch({ type: "LOAD_MEMES_START" });

    const response = await fetch(url+`/api/memes/?wCats`);

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

export const fetchCats = () => {
  return async (dispatch: any, getState: any) => {
    dispatch({ type: "LOAD_CATS_START" });

    const response = await fetch(url+`/api/categories`);

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

export const loadAll = (): ThunkAction<
  void,
  RootState,
  undefined,
  Action<string>
> => {
  return async (dispatch: Dispatch): Promise<void> => {
    dispatch({ type: "LOAD_MEMES_START" });
    dispatch({ type: "LOAD_CATS_START" });

    const [memesResponse, catsResponse] = await Promise.all([
      fetch(url+`/api/memes/?wCats`),
      fetch(url+`/api/categories`),
    ]);

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
  };
};

export const fetchAll = (): ThunkAction<
  void,
  RootState,
  undefined,
  Action<string>
> => {
  return async (dispatch: Dispatch): Promise<void> => {
    const [memesResponse, catsResponse] = await Promise.all([
      fetch(url+`/api/memes/?wCats`),
      fetch(url+`/api/categories`),
    ]);

    if (!memesResponse.ok) {
      const errorData = await memesResponse.json();
      console.log("Could not fetch new data:", errorData.error);
      return;
    }
    if (!catsResponse.ok) {
      const errorData = await catsResponse.json();
      console.log("Could not fetch new data:", errorData.error);
      return;
    }

    memesResponse
      .json()
      .then((data) => {
        dispatch({ type: "FETCH_MEMES_SUCCESSFUL", payload: data });
      })
      .catch((error) => {
        console.log("Could not fetch new data:", error);
      });
    
    catsResponse
      .json()
      .then((data) => {
        dispatch({ type: "FETCH_CATS_SUCCESSFUL", payload: data });
      })
      .catch((error) => {
        console.log("Could not fetch new data:", error);
      });
  };
};