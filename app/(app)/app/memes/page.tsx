"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import Searchbar from "../components/Searchbar";
import FilterSelector from "./components/FilterSelector";
import MemeContainer from "./components/Meme";
import { fetchMemes } from "@/app/store/actions";

type CategoryFilterState = {
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

const setQueryCategories = (
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
function MemesPage() {
  var memesState = useAppSelector((state) => state.memes);
  var categories = useAppSelector((state) => state.categories.categories);
  const memes = useAppSelector((state) => state.memes.memes);

  console.log("logging from main page");

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchMemes());
  }, []);

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
    console.log(dataArray);
    let fState = JSON.parse(JSON.stringify(defaultFilterState));
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

  const onSearchbarChange = (value: string) => {
    setFilter({ ...filterState, searchString: value });
  };

  const filterBySearchString = (
    memes: Meme[],
    searchString: string
  ): Meme[] => {
    return memes.filter(
      (meme) =>
        meme.title.toLowerCase().includes(searchString.toLowerCase()) ||
        meme.description.toLowerCase().includes(searchString.toLowerCase()) ||
        meme.categories
          .map((cat) => cat.name)
          .join("")
          .toLowerCase()
          .includes(searchString.toLowerCase())
    );
  };

  const filter = () => {
    if (memes.length !== 0) {
      console.log("filtered");
      setFilteredMemes(
        filterBySearchString(
          filterByFavorites(filterByCategories([...memes])),
          filterState.searchString
        )
      );
    }
  };

  useEffect(() => {
    filter();
  }, [filterState, memes]);

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
  }

  return (
    <div className="mt-10">
      <h1 className="text-[35px] font-bold">Memes</h1>
      <div className="flex flex-wrap">
        <div className="mr-auto w-full max-w-[600px]">
          <Searchbar onChange={onSearchbarChange} />
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
        {filteredMemes.length === 0 && !memesState.loading && (
          <div className="mt-7">
            <span className="text-lg">No memes were found</span>
          </div>
        )}
        {memesState.loading && (
          <div className="mt-7">
            <span className="text-lg">Loading memes...</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default MemesPage;
