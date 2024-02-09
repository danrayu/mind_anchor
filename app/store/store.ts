import { configureStore } from "@reduxjs/toolkit";

export interface MemesState {
  memes: Meme[] | undefined;
  loading: boolean;
  error: Error | null;
}

interface CategoriesState {
  categories: Category[] | undefined;
  loading: boolean;
  error: Error | null;
}

interface MindscapesState {
  mindscapes: any[] | undefined;
  loading: boolean;
  error: Error | null;
}

interface ScheduleState {
  schedule: Schedule | undefined;
  loading: boolean;
  error: Error | null;
}

const initialMemesState: MemesState = {
  memes: undefined,
  loading: false,
  error: null,
};
function memesReducer(state: MemesState = initialMemesState, action: any) {
  // Reducers usually look at the type of action that happened
  // to decide how to update the state
  switch (action.type) {
    case "LOAD_MEMES_START":
      return { ...state, loading: true };
    case "LOAD_MEMES_SUCCESS":
      return { ...state, loading: false, memes: action.payload, error: null };
    case "LOAD_MEMES_FAILURE":
      return { ...state, loading: false, error: action.error };
    case "FETCH_MEMES_SUCCESS":
      return { ...state, memes: action.payload };
    case "ADD_MEME":
      return { ...state, memes: [...state.memes!, action.payload] };
    default:
      return state;
  }
}

const initialCategoriesState: CategoriesState = {
  categories: undefined,
  loading: false,
  error: null,
};
function categoriesReducer(
  state: CategoriesState = initialCategoriesState,
  action: any
) {
  switch (action.type) {
    case "LOAD_CATS_START":
      return { ...state, loading: true };
    case "LOAD_CATS_SUCCESS":
      return {
        ...state,
        loading: false,
        categories: action.payload,
        error: null,
      };
    case "LOAD_CATS_FAILURE":
      return { ...state, loading: false, error: action.error };
    case "FETCH_CATS_SUCCESS":
      return { ...state, categories: action.payload };
    case "ADD_CAT":
      return { ...state, categories: [...state.categories!, action.payload] };
    default:
      return state;
  }
}

const initialMindscapesState: MindscapesState = {
  mindscapes: undefined,
  loading: false,
  error: null,
};
function mindscapesReducer(
  state: MindscapesState = initialMindscapesState,
  action: any
) {
  switch (action.type) {
    case "LOAD_MINDSCAPES_START":
      return { ...state, loading: true };
    case "LOAD_MINDSCAPES_SUCCESS":
      return {
        ...state,
        loading: false,
        mindscapes: action.payload,
        error: null,
      };
    case "LOAD_MINDSCAPES_FAILURE":
      return { ...state, loading: false, error: action.error };
    case "FETCH_MINDSCAPES_SUCCESS":
      return { ...state, mindscapes: action.payload };
    case "ADD_MINDSCAPE":
      return { ...state, mindscapes: [...state.mindscapes!, action.payload] };
    default:
      return state;
  }
}

const initialScheduleState: ScheduleState = {
  schedule: undefined,
  loading: false,
  error: null,
};
function scheduleReducer(
  state: ScheduleState = initialScheduleState,
  action: any
) {
  switch (action.type) {
    case "LOAD_SCHEDULE_START":
      return { ...state, loading: true };
    case "LOAD_SCHEDULE_SUCCESS":
      return {
        ...state,
        loading: false,
        schedule: action.payload,
        error: null,
      };
    case "LOAD_SCHEDULE_FAILURE":
      return { ...state, loading: false, error: action.error };
    case "FETCH_SCHEDULE_SUCCESS":
      return { ...state, schedule: action.payload };
    case "SET_SCHEDULE":
      return { ...state, schedule: action.payload };
    default:
      return state;
  }
}

const store = configureStore({
  reducer: {
    memes: memesReducer,
    categories: categoriesReducer,
    mindscapes: mindscapesReducer,
    schedule: scheduleReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
