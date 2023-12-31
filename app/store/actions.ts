import { Action, Dispatch, ThunkAction, UnknownAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const fetchMemes = (): ThunkAction<void, RootState, undefined, Action<string>> => {
  return async (dispatch: Dispatch): Promise<void> => {
    dispatch({ type: 'FETCH_MEMES_START' });

    const response = await fetch(`/api/memes/?wCats`);
    response.json()
      .then(data => {
        dispatch({ type: 'FETCH_MEMES_SUCCESS', payload: data });
      })
      .catch(error => {
        dispatch({ type: 'FETCH_MEMES_FAILURE', error });
      });
  };
};

export const fetchCats = () => {
  return async (dispatch: any, getState: any) => {
    dispatch({ type: 'FETCH_CAT_START' });
    const response = await fetch(`/api/categories`);

    response.json()
      .then(data => {
        dispatch({ type: 'FETCH_CAT_SUCCESS', payload: data });
      })
      .catch(error => {
        dispatch({ type: 'FETCH_CAT_FAILURE', error });
      });
  };
};