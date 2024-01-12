import { Action, Dispatch, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const fetchMemes = (): ThunkAction<
  void,
  RootState,
  undefined,
  Action<string>
> => {
  return async (dispatch: Dispatch): Promise<void> => {
    dispatch({ type: "FETCH_MEMES_START" });

    const response = await fetch(`/api/memes/?wCats`);

    if (!response.ok) {
      const errorData = await response.json();
      dispatch({ type: "FETCH_MEMES_FAILURE", error: errorData.error });
      return;
    }
    response.json()
      .then((data) => {
        dispatch({ type: "FETCH_MEMES_SUCCESS", payload: data });
        console.log("dispatch finished");
      })
      .catch((error) => {
        dispatch({ type: "FETCH_MEMES_FAILURE", error });
      });
  };
};

export const fetchCats = () => {
  return async (dispatch: any, getState: any) => {
    dispatch({ type: "FETCH_CATS_START" });

    const response = await fetch(`/api/categories`);

    if (!response.ok) {
      const errorData = await response.json();
      dispatch({ type: "FETCH_CATS_FAILURE", error: errorData.error });
      return;
    }
    response
      .json()
      .then((data) => {
        dispatch({ type: "FETCH_CATS_SUCCESS", payload: data });
      })
      .catch((error) => {
        dispatch({ type: "FETCH_CATS_FAILURE", error });
      });
  };
};
