"use client";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import Searchbar from "../../components/Searchbar";
import CategoryContainer from "./components/CategoryContainer";
import { useCallback, useEffect, useState } from "react";
import { useCatsValid } from "@/app/util/stateValidationHooks";
import Modal from "../../components/Modal";
import QuickAddCat from "./components/QuickAddCat";
import CategoryEdit from "./components/CategoryEdit";

function CategoriesPage() {
  const [searchString, setSearchString] = useState("");
  const [catInEditing, setCatInEditing] = useState<Category | undefined>(undefined);
  const categoriesValid = useCatsValid();

  var categoryState = useAppSelector((state) => state.categories);

  const renderCategories = () => {
    return filteredCategories.map((cat: Category) => {
      return <CategoryContainer key={cat.id} category={cat} onEdit={showEditModal} />;
    });
  };

  const onSearchbarChange = (value: string) => {
    setSearchString(value);
  };

  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);

  const filterBySearchString = useCallback(
    (categories: Category[]): Category[] => {
      return categories.filter((category) =>
        category.name.toLowerCase().includes(searchString.toLowerCase())
      );
    },
    [searchString]
  );


  const showEditModal = (cat: Category) => {
    setCatInEditing(cat);
    (document.getElementById("edit-cat-modal")! as any).showModal();
  }

  useEffect(() => {
    if (categoriesValid) {
      setFilteredCategories(filterBySearchString(categoryState.categories));
    }
  }, [categoryState, searchString, categoriesValid, filterBySearchString]);

  return (
    <>
    <Modal title="Edit Category" id="edit-cat-modal">
      {catInEditing && <CategoryEdit category={catInEditing!}/>}
    </Modal>
    
    <div className="mt-10">
      <div className="flex flex-row justify-between items-center">
      <h1 className="text-[35px] font-bold">Categories</h1>
      <Searchbar onChange={onSearchbarChange} />
      </div>

      <div className="mt-2">
      
        <div className="bg-base-200 mb-6 p-4 pl-8 rounded-xl">
          <QuickAddCat />
        </div>
        {useCatsValid() && renderCategories()}
      </div>
    </div>
    </>
  );
}

export default CategoriesPage;
