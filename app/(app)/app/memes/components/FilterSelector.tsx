import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import FilterItem from "../../components/utility/FilterItem";
import { useRouter, useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { CategoryFilterState, MemeFilter } from "./MemesPage";
import { useAppSelector } from "@/app/store/hooks";
import { set } from "zod";

const encodeURICategories = (categoryStates: CategoryFilterState[]): string => {
  let cp = categoryStates.map((cat) => `${cat.id}:${cat.state}`);
  return cp.join(",");
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

interface FilterSelectorProps {
  filterState: MemeFilter;
  setFilter: Dispatch<SetStateAction<MemeFilter>>;
  useURI?: true;
}

function FilterSelector({
  filterState,
  setFilter,
  useURI,
}: FilterSelectorProps) {
  const pathname = usePathname();
  const params = useSearchParams();
  const router = useRouter();
  const categories = useAppSelector((state) => state.categories.categories);

  useEffect(() => {
    if (!useURI) return;
    router.push(
      pathname + "?" + setQueryCategories(params, filterState.categories)
    );
  }, [filterState.categories, pathname, params, router, useURI]);

  const setFavParam = useCallback(() => {
    let val = parseInt(params.get("favs") || "0");
    setFilter((oldState) => {
      return { ...oldState, favoritedState: val };
    });
  }, [params, setFilter]);

  useEffect(setFavParam, [setFavParam]);

  const updateFavParam = (newFilterState: number) => {
    const paramsNew = new URLSearchParams(params);
    paramsNew.set("favs", newFilterState.toString());
    router.push(pathname + "?" + paramsNew.toString());
  };

  const favoritedChanged = (keepClicked: boolean) => {
    const keepState = keepClicked ? 1 : -1;
    const newFavoritedState =
      filterState.favoritedState === keepState ? 0 : keepState;
    setFilter({ ...filterState, favoritedState: newFavoritedState });
    updateFavParam(newFavoritedState);
  };

  function onCategoryFilter(id: number, keepCategoryPressed: boolean) {
    let prevStateIndex = filterState.categories.findIndex(
      (state) => state.id === id
    );
    let prevState = filterState.categories[prevStateIndex];
    let catState = [...filterState.categories];
    let val = 0;
    switch (prevState.state) {
      case 0:
        val = keepCategoryPressed ? 1 : -1;
        break;
      case 1:
        val = keepCategoryPressed ? 0 : -1;
        break;
      case -1:
        val = keepCategoryPressed ? 1 : 0;
        break;
    }
    catState[prevStateIndex].state = val;
    setFilter({
      ...filterState,
      categories: [...catState],
    });
  }

  function FilterCategory(category: Category) {
    let filter = filterState.categories.find((item) => item.id === category.id);
    console.log("filter state selector", filterState.categories);
    if (filter === undefined) {
      throw `Error: State of category with id ${category.id} does not exist`;
    }
    return (
      <FilterItem
        onAdd={() => onCategoryFilter(category["id"], true)}
        onRemove={() => onCategoryFilter(category["id"], false)}
        key={`cat_${category["id"]}`}
        state={filter.state}
        name={category.name}
      />
    );
  }

  const [filterOpen, setFilterOpen] = useState(false);
  function toggleFilter() {
    setFilterOpen(!filterOpen);
  }

  return (
    <div className="mt-2 pt-2 flex flex-nowrap align-items-stretch">
      {filterOpen && <div className="max-w-[1px] flex-1 bg-slate-400" />}
      <div className={"flex-1" + (filterOpen && "")}>
        <button
          className={"btn btn-outline " + (filterOpen && "ml-2")}
          onClick={toggleFilter}
        >
          {filterOpen ? "Hide Filter" : "Show Filter"}
        </button>
        {filterOpen && (
          <>
            <div className="p-2 pb-0">
              <h5 className="mt-2">Favorites</h5>
              <div className="flex flex-wrap">
                <FilterItem
                  onAdd={() => favoritedChanged(true)}
                  onRemove={() => favoritedChanged(false)}
                  state={filterState.favoritedState}
                  name="Favorites"
                />
              </div>
              <h5 className="mt-2">Categories</h5>
              <div className="flex flex-wrap space-x-2">
                {categories.map((category: any) => FilterCategory(category))}
              </div>
            </div>
            {/* <div className="divider mt-0"></div> */}
          </>
        )}
      </div>
    </div>
  );
}
export default FilterSelector;
