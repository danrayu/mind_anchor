import { fetchUpdateCategory } from '@/app/fetchActions';
import { appFetch } from '@/app/store/actions';
import { useAppDispatch } from '@/app/store/hooks';
import { Types } from '@/app/types/Types';
import React, { useState } from 'react'

interface Props {
  category: Category
}

function CategoryEdit({category}: Props) {
  console.log(category)
  const [inputError, setInputError] = useState("");
  const dispatch = useAppDispatch();

  const [categoryName, setCategoryName] = useState(category.name);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    save();
  };

  const save = async () => {
    if (!categoryName) {
      alert("Please enter a category name");
      return;
    }

    const response = await fetchUpdateCategory(category.id, { name: categoryName });
    const updatedCat = await response.json();

    if (response.ok) {
      dispatch({ type: "UPDATE_CAT", payload: updatedCat});
    }
    dispatch(appFetch(Types.Categories));
  };

  const onChange = (event: any) => {
    console.log(!inputError.length && "hidden");
    if (event.target.value.length === event.target.maxLength) {
      setInputError("Max length 40 characters.");
    } else {
      setInputError("");
    }
    setCategoryName(event.target.value);
    if (event.key === "Enter") {
      save();
    }
  };
  return (
    <>
      <div className="container mx-auto p-4 mt-6">
        <form onSubmit={handleSubmit} className="max-w-[600px] mx-auto">
          <div className="mb-4">
            <label htmlFor="title" className="block font-medium">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={categoryName}
              onChange={onChange}
              className="input input-bordered mt-1 p-2 w-full"
            />
          </div>
          <button type="submit" className="mt-2 btn btn-primary">
              Save
          </button>
        </form>
      </div>
    </>
  );
}

export default CategoryEdit