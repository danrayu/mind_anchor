"use client";
import { useEffect, useState } from "react";
import FilterSelector from "./FilterSelector";
import MemeContainer from "./Meme";
import Searchbar from "../../components/Searchbar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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

const positiveFilterActivated = (catStates: CategoryFilterState[]): boolean => {
  let activated = false;
  catStates.forEach((cat) => {
    if (cat.state === 1) activated = true;
  });
  return activated;
};

const encodeURICategories = (categoryStates: CategoryFilterState[]): string => {
  let cp = categoryStates.map((cat) => `${cat.id}:${cat.state}`);
  return cp.join(",");
};
const decodeURICategories = (param: string): CategoryFilterState[] => {
  if (!param) return [];
  let catsString = param.split(",");
  return catsString.map((cat: string) => {
    const [id, st] = cat.split(":")!;
    return { id: parseInt(id), state: parseInt(st) };
  });
};

export const setQueryCategories = (
  params: URLSearchParams,
  categoryStates: CategoryFilterState[]
) => {
  let cats = categoryStates.filter(
    (state) => state.state === 1 || state.state === -1
  );

  const paramsNew = new URLSearchParams(params);
  paramsNew.set("cats", encodeURICategories(cats));
  return paramsNew.toString();
};

function MemeView({ categories, memes }: MemeViewProps) {
  const pathname = usePathname();
  const params = useSearchParams();
  const router = useRouter();

  const [filterState, setFilter] = useState<MemeFilter>(
    setupFilterState(categories)
  );
  const [filteredMemes, setFilteredMemes] = useState<any[]>([...memes]);

  // TODO make not overwrite state if one exists
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

  useEffect(() => {
    setFilteredMemes(filterByFavorites(filterByCategories([...memes])));
  }, [filterState]);

  useEffect(() => {
    router.push(
      pathname + "?" + setQueryCategories(params, filterState.categories)
    );
  }, [filterState.categories]);

  function filterByFavorites(memes: Meme[]): Meme[] {
    switch (filterState.favoritedState) {
      case 1:
        return memes.filter((meme) => meme["favorite"]);
      case -1:
        return memes.filter((meme) => !meme["favorite"]);
      default:
        return memes;
    }
  }
  function filterByCategories(memes: Meme[]): Meme[] {
    const catAllowedIds = new Set(filterState.categories.filter(cat => cat.state === 1).map(cat => cat.id));
    const catForbiddenIds = new Set(filterState.categories.filter(cat => cat.state === -1).map(cat => cat.id));
    
    let pFilter = positiveFilterActivated(filterState.categories);
    return memes.filter((meme) => {
      const memeCatIds = meme.categories.map(cat => cat.id);

      const isForbidden = memeCatIds.some(id => catForbiddenIds.has(id));
      if (isForbidden) return false;

      if (!pFilter) return true;
      const isAllowed = memeCatIds.some(id => catAllowedIds.has(id));
      return isAllowed;
    });
  }

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
