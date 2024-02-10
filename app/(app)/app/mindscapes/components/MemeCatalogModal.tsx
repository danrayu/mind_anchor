import { useAppSelector } from "@/app/store/hooks";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import FilterSelector from "../../memes/components/FilterSelector";
import {
  CategoryFilterState,
  MemeFilter,
} from "../../memes/components/MemesPage";
import Searchbar from "../../components/Searchbar";
import AddableMeme from "./AddableMeme";
import { useMemesValid } from "@/app/util/stateValidationHooks";

const defaultFilterState: MemeFilter = {
  favoritedState: 0,
  categories: [],
  searchString: "",
};

const positiveFilterActivated = (catStates: CategoryFilterState[]): boolean => {
  let activated = false;
  catStates.forEach((cat) => {
    if (cat.state === 1) activated = true;
  });
  return activated;
};

interface MemeCatalogModalProps {
  orderedMemes: Meme[];
  setOrderedMemes: Dispatch<SetStateAction<Meme[]>>;
}

function MemeCatalogModal({
  orderedMemes,
  setOrderedMemes,
}: MemeCatalogModalProps) {
  const memes = useAppSelector((state) => state.memes.memes);
  const categories = useAppSelector((state) => state.categories.categories);
  const memesValid = useMemesValid();

  const [filterState, setFilter] = useState<MemeFilter>(
    setupFilterState(categories)
  );
  const [filteredMemes, setFilteredMemes] = useState<any[]>([]);

  function setupFilterState(categories: Category[]) {
    let fState = {
      ...defaultFilterState,
      categories: [...defaultFilterState.categories],
    };
    categories.forEach((cat: Category) => {
      fState.categories.push({
        id: cat.id,
        state: 0,
      });
    });
    return fState;
  }

  const filterBySearchString = useCallback(
    (memes: Meme[]): Meme[] => {
      return memes.filter(
        (meme) =>
          meme.title
            .toLowerCase()
            .includes(filterState.searchString.toLowerCase()) ||
          meme.description
            .toLowerCase()
            .includes(filterState.searchString.toLowerCase()) ||
          meme.categories
            .map((cat) => cat.name)
            .join("")
            .toLowerCase()
            .includes(filterState.searchString.toLowerCase())
      );
    },
    [filterState.searchString]
  );

  const filterByFavorites = useCallback(
    (memes: Meme[]): Meme[] => {
      switch (filterState.favoritedState) {
        case 1:
          return memes.filter((meme) => meme["favorite"]);
        case -1:
          return memes.filter((meme) => !meme["favorite"]);
        default:
          return memes;
      }
    },
    [filterState.favoritedState]
  );

  const filterByCategories = useCallback((memes: Meme[]): Meme[] => {
    const catAllowedIds = new Set(
      filterState.categories
        .filter((cat) => cat.state === 1)
        .map((cat) => cat.id)
    );
    const catForbiddenIds = new Set(
      filterState.categories
        .filter((cat) => cat.state === -1)
        .map((cat) => cat.id)
    );

    let pFilter = positiveFilterActivated(filterState.categories);
    return memes.filter((meme) => {
      const memeCatIds = meme.categories.map((cat) => cat.id);

      const isForbidden = memeCatIds.some((id) => catForbiddenIds.has(id));
      if (isForbidden) return false;

      if (!pFilter) return true;
      const isAllowed = memeCatIds.some((id) => catAllowedIds.has(id));
      return isAllowed;
    });
  }, [filterState.categories]);

  const filter = useCallback(() => {
    if (memesValid && memes.length !== 0) {
      setFilteredMemes(
        filterBySearchString(filterByFavorites(filterByCategories([...memes])))
      );
    }
  }, [setFilteredMemes, filterBySearchString, filterByFavorites, filterByCategories, memesValid, memes])

  useEffect(() => {
    filter();
  }, [filterState, memes, orderedMemes, filter]);

  const onSearchbarChange = (value: string) => {
    setFilter({ ...filterState, searchString: value });
  };

  const onSwitchAdded = (id: number) => {
    setOrderedMemes((oldState: Meme[]) => {
      const index = oldState.findIndex((meme) => meme.id === id);
      if (index === -1) {
        const newMeme = memes.find((meme: Meme) => meme.id === id);
        return [newMeme, ...oldState];
      } else {
        oldState.splice(index, 1);
        return oldState.slice();
      }
    });
  };

  const resetFilter = () => {
    setFilter(setupFilterState(categories));
  }

  return (
    <div>
      <Searchbar onChange={onSearchbarChange} />
      <FilterSelector filterState={filterState} setFilter={setFilter} resetFilter={resetFilter} />
      <div className="mt-4">
        {filteredMemes.map((meme: Meme) => (
          <AddableMeme
            key={meme.id}
            meme={meme}
            initIsAdded={
              orderedMemes.find((m) => m.id === meme.id) !== undefined
            }
            onChange={onSwitchAdded}
          />
        ))}
      </div>
    </div>
  );
}

export default MemeCatalogModal;
