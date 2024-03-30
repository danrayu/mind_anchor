"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Searchbar from "../../components/Searchbar";
import FilterSelector from "./FilterSelector";
import MemeContainer from "./MemeContainer";

export type CategoryFilterState = {
  id: number;
  state: number;
};

export type MemeFilter = {
  favoritedState: number;
  categories: CategoryFilterState[];
  searchString: string;
};

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

const decodeURICategories = (param: string): CategoryFilterState[] => {
  if (!param) return [];
  let catsString = param.split(",");
  return catsString.map((cat: string) => {
    const [id, st] = cat.split(":")!;
    return { id: parseInt(id), state: parseInt(st) };
  });
};

interface MemesPage {
  memes: Meme[];
  categories: Category[];
}

function MemesPage({ memes, categories }: MemesPage) {
  const params = useSearchParams();

  const [filterState, setFilter] = useState<MemeFilter>(
    setupFilterState(categories)
  );
  const [filteredMemes, setFilteredMemes] = useState<any[]>([]);

  function setupFilterState(categories: Category[]) {
    const dataArray: CategoryFilterState[] = decodeURICategories(
      params.get("cats")!
    );
    let fState = {
      ...defaultFilterState,
      categories: [...defaultFilterState.categories],
    };
    categories.forEach((cat: Category) => {
      let catQuery = dataArray.find((item) => cat.id === item.id);
      if (catQuery !== undefined) {
        fState.categories.push(catQuery);
      } else {
        fState.categories.push({
          id: cat.id,
          state: 0,
        });
      }
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

  const filterByCategories = useCallback(
    (memes: Meme[]): Meme[] => {
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
    },
    [filterState.categories]
  );

  const filter = useCallback(() => {
    if (memes.length !== undefined) {
      setFilteredMemes(
        filterBySearchString(filterByFavorites(filterByCategories([...memes])))
      );
    }
  }, [
    memes,
    filterBySearchString,
    filterByFavorites,
    filterByCategories,
    setFilteredMemes,
  ]);

  useEffect(() => {
    filter();
  }, [filter]);

  useEffect(() => {
  }, [filteredMemes])

  const onSearchbarChange = (value: string) => {
    setFilter({ ...filterState, searchString: value });
  };

  const resetFilter = () => {
    setFilter(setupFilterState(categories));
  }

  return (
    <div className="mt-10 mb-10">
      <h1 className="text-[35px] font-bold">Memes</h1>
      <div className="flex flex-wrap">
        <div className="mr-auto w-full max-w-[600px]">
          <Searchbar onChange={onSearchbarChange} />
        </div>
      </div>
      
      <FilterSelector filterState={filterState} setFilter={setFilter} resetFilter={resetFilter} />

      <div className="mt-8 space-y-4">
        {filteredMemes.map((meme) => {
          return <MemeContainer key={meme.id} meme={meme} />;
        })}
        {filteredMemes.length === 0 && (
          <div className="mt-7">
            <span className="text-lg">No memes were found</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default MemesPage;
