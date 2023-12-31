'use client'
import { useAppSelector } from "@/app/store/hooks";
import Searchbar from "../components/Searchbar";
import CategoryContainer from "./components/CategoryContainer";

function CategoriesPage() {
  var categories = useAppSelector(state => state.categories.categories);

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
        {categories.map((cat: Category) => {
          return <CategoryContainer key={cat.id} category={cat} />;
        })}
      </div>
    </div>
  );
}

export default CategoriesPage;
