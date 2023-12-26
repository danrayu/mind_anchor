'use client';
import React, { useState, useEffect } from 'react';
import SwitchCategory from './SwitchCategory';
// Import additional libraries as needed, e.g., for fetching and updating data
interface EditMemeProps {
  meme: Meme;
  categories: Category[]
}

export type CategoryState = {
  category: Category;
  active: boolean;
}

const EditMeme = ({ meme, categories }: EditMemeProps) => {
  const [categoriesState, setCategoriesState] = useState<CategoryState[]>([]);
  const [title, setFavoriteChecked] = useState(meme.favorite);
  const [favoriteChecked, setFavoriteChecked] = useState(meme.favorite);
  const [favoriteChecked, setFavoriteChecked] = useState(meme.favorite);

  const generateCategoriesState = () => {
    let result: CategoryState[] = [];
    let memeCats = meme.categories;
    categories.forEach(cat => {
      let memeCatIndex = memeCats.find(mCat => mCat.id === cat.id);
      if (memeCatIndex === undefined) {
        result.push({category: cat, active: false});
      }
      else {
        result.push({category: cat, active: true});
      }
    });
    setCategoriesState(result);
  }

  useEffect(generateCategoriesState, [categories])

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    meme.categories = [];
    categoriesState.forEach(state => {
      meme.categories.push(state.category);
    });
    meme.favorite = favoriteChecked;
    await updateMeme(meme);
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    meme.title = value;
  };

  const switchCategoryIncluded = (id:number) => {
    console.log(categoriesState);
    let cp = [...categoriesState];
    let i = cp.findIndex(item => item.category.id === id);
    cp[i].active = !cp[i].active;
    // console.log(item);

    setCategoriesState([...cp]);
  }

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input type="text" id="title" name="title" value={meme.title} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea id="description" name="description" value={meme.description} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="favorite" className="block text-sm font-medium text-gray-700">Favorite</label>
          <input type="checkbox" id="favorite" name="favorite" checked={favoriteChecked} onChange={(e) => setFavoriteChecked(e.target.checked)} className="mt-1" />
        </div>
        <div className='flex flex-wrap space-x-1'>
          {categoriesState.map((catState: CategoryState) => {
            return (
              <SwitchCategory key={catState.category.id} switch={switchCategoryIncluded} state={catState} />
            )
          })}
        </div>

        <button type="submit" className="mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Update Meme</button>
      </form>
    </div>
  );
};

export default EditMeme;

async function updateMeme(meme: Meme) {
  let memeData = {
    title: meme.title,
    description: meme.description,
    favorite: meme.favorite,
    authorId: meme.authorId,
    categoryIds: meme.categories.map((cat: Category) => cat.id)
  }
  console.log(memeData);
  try {
    const response = await fetch('http://localhost:3000/api/memes/' + meme.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(memeData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Meme created:', data);
    // Handle the response data here
  } catch (error) {
    console.error('Error creating meme:', error);
    // Handle errors here
  }
}
