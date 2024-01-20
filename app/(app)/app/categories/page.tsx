'use client'
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import Searchbar from "../components/Searchbar";
import CategoryContainer from "./components/CategoryContainer";
import { useEffect } from "react";
import { fetchCats } from "@/app/store/actions";
import { useCatsValid } from "@/app/util/stateValidationHooks";

function CategoriesPage() {
  var categoryState = useAppSelector(state => state.categories);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCats())
  }, [])

  const renderCategories = () => {
    return categoryState.categories.map((cat: Category) => {
      return <CategoryContainer key={cat.id} category={cat} />;
    });
  }
  return (
    <div className="mt-10">
      <h1 className="text-[35px] font-bold">Categories</h1>
      <div className="flex flex-wrap">
        <div className="mr-auto w-full max-w-[600px]">
          <Searchbar />
        </div>
        <div className="my-auto">
          <button className="btn btn-outline h-10">Search</button>
        </div>
      </div>

      <div className="mt-4">
        {useCatsValid() && renderCategories()}
        
      </div>
    </div>
  );
}

export default CategoriesPage;
