import { Action, Dispatch, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import {
  fetchGetCategories,
  fetchGetMemes,
  fetchGetMindscapes,
  fetchGetSchedule,
} from "../fetchActions";
import { Types } from "../types/Types";

enum StageTypes {
  start,
  failure,
  success,
  fetch,
}

const getDispatchCode = (type: Types, stage: StageTypes) => {
  let code = stage !== StageTypes.fetch ? "LOAD_" : "FETCH_";

  switch (type) {
    case Types.Memes:
      code += "MEMES_";
      break;
    case Types.Categories:
      code += "CATS_";
      break;
    case Types.Mindscapes:
      code += "MINDSCAPES_";
      break;
    case Types.Schedule:
      code += "SCHEDULE_";
      break;
  }

  switch (stage) {
    case StageTypes.start:
      code += "START";
      break;
    case StageTypes.failure:
      code += "FAILURE";
      break;
    case StageTypes.success:
      code += "SUCCESS";
      break;
    case StageTypes.fetch:
      code += "SUCCESS";
      break;
  }
  return code;
};

export const load = (
  type: Types
): ThunkAction<void, RootState, undefined, Action<string>> => {
  return async (dispatch: Dispatch): Promise<void> => {
    dispatch({ type: getDispatchCode(type, StageTypes.start) });

    let response;
    switch (type) {
      case Types.Memes:
        response = await fetchGetMemes();
        break;
      case Types.Categories:
        response = await fetchGetCategories();
        break;
      case Types.Mindscapes:
        response = await fetchGetMindscapes();
        break;
      case Types.Schedule:
        response = await fetchGetSchedule();
        break;
    }

    if (!response.ok) {
      const errorData = await response.json();
      dispatch({
        type: getDispatchCode(type, StageTypes.failure),
        error: errorData.error,
      });
      return;
    }
    response
      .json()
      .then((data) => {
        dispatch({
          type: getDispatchCode(type, StageTypes.success),
          payload: data,
        });
      })
      .catch((error) => {
        dispatch({ type: getDispatchCode(type, StageTypes.failure), error });
      });
  };
};

export const appFetch = (
  type: Types
): ThunkAction<void, RootState, undefined, Action<string>> => {
  return async (dispatch: Dispatch): Promise<void> => {
    let response;
    switch (type) {
      case Types.Memes:
        response = await fetchGetMemes();
        break;
      case Types.Categories:
        response = await fetchGetCategories();
        break;
      case Types.Mindscapes:
        response = await fetchGetMindscapes();
        break;
      case Types.Schedule:
        response = await fetchGetSchedule();
        break;
    }

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData.error);
      return;
    }
    response
      .json()
      .then((data) => {
        dispatch({
          type: getDispatchCode(type, StageTypes.fetch),
          payload: data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const url = process.env.NEXT_PUBLIC_API_BASE_URL;

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
    dispatch({ type: "LOAD_SCHEDULE_START" });

    const [memesResponse, catsResponse, mindscapesResponse, scheduleResponse] = await Promise.all(
      [
        fetch(url + `/api/memes/?wCats`),
        fetch(url + `/api/categories`),
        fetch(url + `/api/mindscapes`),
        fetch(url + `/api/schedule`),
      ]
    );

    if (!memesResponse.ok) {
      const errorData = await memesResponse.json();
      dispatch({
        type: getDispatchCode(Types.Memes, StageTypes.failure),
        error: errorData.error,
      });
    } else {
      memesResponse
      .json()
      .then((data) => {
        dispatch({
          type: getDispatchCode(Types.Memes, StageTypes.success),
          payload: data,
        });
      })
      .catch((error) => {
        dispatch({ type: getDispatchCode(Types.Memes, StageTypes.failure), error });
      });
    }
    
    if (!catsResponse.ok) {
      const errorData = await catsResponse.json();
      dispatch({
        type: getDispatchCode(Types.Categories, StageTypes.failure),
        error: errorData.error,
      });
    } else {
      catsResponse
      .json()
      .then((data) => {
        dispatch({
          type: getDispatchCode(Types.Categories, StageTypes.success),
          payload: data,
        });
      })
      .catch((error) => {
        dispatch({ type: getDispatchCode(Types.Categories, StageTypes.failure), error });
      });
    }
    
    if (!mindscapesResponse.ok) {
      const errorData = await mindscapesResponse.json();
      dispatch({
        type: getDispatchCode(Types.Mindscapes, StageTypes.failure),
        error: errorData.error,
      });
    } else {
      mindscapesResponse
      .json()
      .then((data) => {
        dispatch({
          type: getDispatchCode(Types.Mindscapes, StageTypes.success),
          payload: data,
        });
      })
      .catch((error) => {
        dispatch({ type: getDispatchCode(Types.Mindscapes, StageTypes.failure), error });
      });
    }

    if (!scheduleResponse.ok) {
      const errorData = await scheduleResponse.json();
      dispatch({
        type: getDispatchCode(Types.Schedule, StageTypes.failure),
        error: errorData.error,
      });
    } else {
      scheduleResponse
      .json()
      .then((data) => {
        dispatch({
          type: getDispatchCode(Types.Schedule, StageTypes.success),
          payload: data,
        });
      })
      .catch((error) => {
        dispatch({ type: getDispatchCode(Types.Schedule, StageTypes.failure), error });
      });
    }

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

  
export const setDebug = (doDebug: boolean): ThunkAction<
  void,
  RootState,
  undefined,
  Action<string>
> => {
  return async (dispatch: Dispatch): Promise<void> => {
    if (doDebug) {
      dispatch({ type: "DEBUG_ON"});
    }
    else {
      dispatch({ type: "DEBUG_OFF" });
    }
  };
};