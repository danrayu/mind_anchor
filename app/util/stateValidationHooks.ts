import { useAppSelector } from "../store/hooks";

export function useMemesValid(): boolean {
  return useAppSelector((state) => {
    return (
      !state.memes.error &&
      state.memes.memes !== undefined &&
      !state.memes.loading
    );
  });
}

export function useCatsValid(): boolean {
  return useAppSelector((state) => {
    return (
      !state.categories.error &&
      state.categories.categories !== undefined &&
      !state.categories.loading
    );
  });
}

export function useMindscapesValid(): boolean {
  return useAppSelector((state) => {
    return (
      !state.mindscapes.error &&
      state.mindscapes.mindscapes !== undefined &&
      !state.mindscapes.loading
    );
  });
}

export function useAllValid(): boolean {
  return useAppSelector((state) => !state.memes.error &&
  state.memes.memes &&
  !state.memes.loading &&
  !state.categories.error &&
  state.categories.categories &&
  !state.categories.loading &&
  !state.mindscapes.error &&
  state.mindscapes.mindscapes &&
  !state.mindscapes.loading);
}
