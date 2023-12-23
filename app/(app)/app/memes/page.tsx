'use client'
import React, { useState } from 'react'
import SearchSidebar from '../components/sidebar/SearchSidebar'
import SortSelector from './components/SortSelector';

export type SortState = {
  favorited: boolean;
  unfavorited: boolean,
  categories: [],
}

const defaultSortState: SortState = {
  favorited: false,
  unfavorited: false,
  categories: []
}

function MemesPage() {
  const [sortState, setSort] = useState<SortState>(defaultSortState);
  const [sorting, setSorting] = useState(false);

  function toggleSort() {
    setSorting(!sorting);
  }
  
  return (
    <div>
      <div className="mt-10">
      <div>
        <h1 className="text-[35px] font-bold">Memes</h1>
      </div>
      <div className="flex flex-wrap">
        <div className='mr-auto w-full max-w-[600px]'>
          <SearchSidebar />
        </div>
        <div className='my-auto'>
          <button className="btn btn-outline h-10">Search</button>
        </div>
      </div>
      <div>
        <div>
          <button className={'btn btn-outline ' + (sorting && "btn-clicked")} onClick={toggleSort}>
            Show Sort
          </button>
          { sorting && <SortSelector categories={""} sortState={sortState} setSort={setSort}/> }
        </div>
      </div>

    </div>
    </div>
  )
}

export default MemesPage