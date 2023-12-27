import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import FilterItem from "../../components/utility/FilterItem";
import { AddQueryCategories, MemeFilter } from "./MemeView";
import { useRouter, useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";

interface FilterSelectorProps {
  filterState: MemeFilter;
  categories: any;
  setFilter: Dispatch<SetStateAction<MemeFilter>>;
}

function FilterSelector({
  categories,
  filterState,
  setFilter,
}: FilterSelectorProps) {
  const pathname = usePathname();
  const params = useSearchParams();
  const router = useRouter();

  const setFavParam = () => {
    console.log('setFavParam', filterState.favoritedState, )
    let val = parseInt(params.get('favs') || '0');
    setFilter({ ...filterState, favoritedState: val });
  }

  useEffect(setFavParam, [params]);

  const updateFavParam = (newFilterState: number) => {
    const paramsNew = new URLSearchParams(params)
    paramsNew.set('favs', newFilterState.toString());
  };

  const favoritedClicked = () => {
    const newFavoritedState = filterState.favoritedState === 1 ? 0 : 1;
    setFilter({ ...filterState, favoritedState: newFavoritedState });
    updateFavParam(newFavoritedState);

  };
  const unFavoritedClicked = () => {
    const newFavoritedState = filterState.favoritedState === -1 ? 0 : -1;
    setFilter({ ...filterState, favoritedState: newFavoritedState });
    updateFavParam(newFavoritedState);
  };


  function onCategoryFilter(id: number, keepCategoryPressed: boolean) {
    let prevStateIndex = filterState.categories.findIndex(
      (state) => state.id === id
    );
    let prevState = filterState.categories[prevStateIndex];
    let result = 0;
    switch (prevState.state) {
      case 0:
        result = keepCategoryPressed ? 1 : -1;
        break;
      case 1:
        result = keepCategoryPressed ? 0 : -1;
        break;
      case -1:
        result = keepCategoryPressed ? 1 : 0;
        break;
    }
    setFilter({ ...filterState, favoritedState: result });
  }

  function FilterCategory(category: Category) {
    let filter = filterState.categories.find((item) => item.id === category.id);
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
                  onAdd={favoritedClicked}
                  onRemove={unFavoritedClicked}
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
