"use client";
import { useEffect, useState } from "react";
import FilterSelector from "./FilterSelector";
import MemeContainer from "./Meme";
import Searchbar from "../../components/Searchbar";
import { useRouter, useSearchParams } from "next/navigation";

interface MemeViewProps {
  categories: Category[];
  memes: Meme[];
}

type CategoryFilterState = {
  id: number;
  state: number;
};

export type MemeFilter = {
  favoritedState: number;
  categories: CategoryFilterState[];
};

const defaultFilterState: MemeFilter = {
  favoritedState: 0,
  categories: [],
};

const catStringToIds = (catString: string | null): number[] => {
  if (catString === null) {
    return [];
  }
  return catString.split(',').map(catId => parseInt(catId));
}

export const AddQueryCategories = 
  (params: URLSearchParams, categoryIds: number[]) => {
    const catString = params.get('cats') ;
    let ids = [...catStringToIds(catString), ...categoryIds]

    const paramsNew = new URLSearchParams(params)
    paramsNew.set('cats', ids.join(','))
    return params.toString()
  }

function MemeView({ categories, memes }: MemeViewProps) {
  const params = useSearchParams();

  const [filterState, setFilter] = useState<MemeFilter>(
    setupFilterState(categories)
  );
  const [filteredMemes, setFilteredMemes] = useState<any[]>([...memes]);

  // TODO make not overwrite state if one exists
  function setupFilterState(categories: Category[]) {
    console.log("setup state");

    let fState = { ...defaultFilterState };
    categories.forEach((cat: Category) => {
      fState.categories.push({
        id: cat.id,
        state: 0,
      });
    });
    return fState;
  }

  useEffect(filterByFavorites, [filterState]);

  function filterByFavorites() {
    switch (filterState.favoritedState) {
      case 0:
        setFilteredMemes([...memes]);
        break;
      case 1:
        setFilteredMemes(memes.filter((meme) => meme["favorite"]));
        break;
      case -1:
        setFilteredMemes(memes.filter((meme) => !meme["favorite"]));
        break;
    }
  }

  useEffect(() => {
    // Function to apply filters based on URL query parameters
    const applyFilters = () => {
      let ids = filterState.categories.map(cat => cat.id);
      AddQueryCategories(params, ids)
      // Extract and apply filters from query parameters
      // Example: Check for favoritedState in query and filter memes accordingly
      // Update your filter logic based on how you structure query parameters
    };

    applyFilters();
  }, [params, memes]);

  return (
    <div className="mt-10">
      <h1 className="text-[35px] font-bold">Memes</h1>
      <div className="flex flex-wrap">
        <div className="mr-auto w-full max-w-[600px]">
          <Searchbar />
        </div>
        <div className="my-auto">
          <button className="btn btn-outline h-10">Search</button>
        </div>
      </div>
      <FilterSelector
        categories={categories}
        filterState={filterState}
        setFilter={setFilter}
      />

      <div className="mt-4">
        {filteredMemes.map((meme) => {
          return <MemeContainer key={meme.id} meme={meme} />;
        })}
      </div>
    </div>
  );
}

export default MemeView;
