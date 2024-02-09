"use client";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import Searchbar from "../components/Searchbar";
import CategoryContainer from "./components/CategoryContainer";
import { useCallback, useEffect, useState } from "react";
import { useCatsValid } from "@/app/util/stateValidationHooks";
import CategoryEdit from "./components/CategoryEdit";

function CategoriesPage() {
  const [searchString, setSearchString] = useState("");
  const categoriesValid = useCatsValid();

  var categoryState = useAppSelector((state) => state.categories);
  const dispatch = useAppDispatch();

  const renderCategories = () => {
    return filteredCategories.map((cat: Category) => {
      return <CategoryContainer key={cat.id} category={cat} />;
    });
  };

  const onSearchbarChange = (value: string) => {
    setSearchString(value);
  };

  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);

  const filterBySearchString = useCallback((categories: Category[]): Category[] => {
    return categories.filter((category) =>
      category.name.toLowerCase().includes(searchString.toLowerCase())
    );
  }, [searchString]);

  useEffect(() => {
    if (categoriesValid) {
      setFilteredCategories(filterBySearchString(categoryState.categories));
    }
  }, [categoryState, searchString, categoriesValid, filterBySearchString]);

  return (
    <div className="mt-10">
      <h1 className="text-[35px] font-bold">Categories</h1>
      <div className="flex flex-wrap">
        <div className="mr-auto w-full max-w-[600px]">
          <Searchbar onChange={onSearchbarChange} />
        </div>
        <div className="my-auto">
          <button className="btn btn-outline h-10">Search</button>
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-4 outline p-4 pl-8 outline-slate-350 rounded-xl">
          <CategoryEdit />
        </div>
        {useCatsValid() && renderCategories()}
      </div>
    </div>
  );
}

export default CategoriesPage;
