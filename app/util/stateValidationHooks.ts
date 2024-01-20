import { useAppSelector } from "../store/hooks";

export function useMemesValid(): boolean {
  console.log("useMemes");
  return useAppSelector(state => {
    return !state.memes.error && state.memes.memes !== undefined && !state.memes.loading;
  });
}

export function useCatsValid(): boolean {
  console.log("useCats");
  return useAppSelector(state => {
    return !state.categories.error && state.categories.categories !== undefined && !state.categories.loading;
  })
}

export function useAllValid(): boolean {
  const memesValid = useMemesValid();
  const catsValid = useCatsValid();

  return memesValid && catsValid;
}