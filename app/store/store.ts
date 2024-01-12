import { configureStore } from '@reduxjs/toolkit'

interface MemesState {
  memes: Meme[];
  loading: boolean;
  error: Error | null;
}

interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: Error | null;
}

interface MindscapesState {
  mindscapes: any[];
  loading: boolean;
  error: Error | null;
}

const initialMemesState: MemesState = {
  memes: [],
  loading: false,
  error: null,
}
function memesReducer(state: MemesState = initialMemesState, action: any) {
  // Reducers usually look at the type of action that happened
  // to decide how to update the state
  switch (action.type) {
    case 'FETCH_MEMES_START':
      return { ...state, loading: true };
    case 'FETCH_MEMES_SUCCESS':
      return { ...state, loading: false, memes: action.payload };
    case 'FETCH_MEMES_FAILURE':
      return { ...state, loading: false, error: action.error };
    case 'SET_MEMES':
      return { ...state, memes: action.payload};
    default: 
      return state;
  }
}

const initialCategoriesState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
}
function categoriesReducer(state: CategoriesState = initialCategoriesState, action: any) {
  switch (action.type) {
    case 'FETCH_CATS_START':
      return { ...state, loading: true };
    case 'FETCH_CATS_SUCCESS':
      return { ...state, loading: false, categories: action.payload };
    case 'FETCH_CATS_FAILURE':
      return { ...state, loading: false, error: action.error };
      case 'SET_CATS':
        return { ...state, categories: action.payload};
    default:
      return state;
  }
}

const initialMindscapesState: MindscapesState = {
  mindscapes: [],
  loading: false,
  error: null,
}
function mindscapesReducer(state: MindscapesState = initialMindscapesState, action: any) {
  switch (action.type) {
    case 'FETCH_MINDSCAPES_START':
      return { ...state, loading: true };
    case 'FETCH_MINDSCAPES_SUCCESS':
      return { ...state, loading: false, mindscapes: action.payload };
    case 'FETCH_MINDSCAPES_FAILURE':
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}

const store = configureStore({
  reducer: {
    memes: memesReducer,
    categories: categoriesReducer,
    mindscapes: mindscapesReducer,
  },
})

export default store;

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch