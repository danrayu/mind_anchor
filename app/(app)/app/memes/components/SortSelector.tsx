import React, { Dispatch, SetStateAction } from 'react'
import { SortState } from '../page';

interface SortSelectorProps {
  sortState: SortState;
  categories: any;
  setSort: Dispatch<SetStateAction<SortState>>;
}

function SortSelector({categories, sortState, setSort}: SortSelectorProps) {
  let sort = {...sortState};
  function favoritedClicked() {
    sort.unfavorited = false;
    sort.favorited = !sortState.favorited;
    setSort(sort);

  }
  function unFavoritedClicked() {
    sort.favorited = false;
    sort.unfavorited = !sortState.unfavorited;
    setSort(sort);
  }

  return (
    <div className='mt-2'>
      <div className='flex flex-wrap'>
        <button className={'btn btn-outline mr-2 ' + (sortState.favorited && "btn-clicked")} onClick={favoritedClicked}>
          Favorited
        </button>
        <div className='flex items-center'>
          <span>or</span>
        </div>
        <button className={'btn btn-outline ml-2 ' + (sortState.unfavorited && "btn-clicked")} onClick={unFavoritedClicked}>
          Unfavorited
        </button>
      </div>
    </div>
  )
}

export default SortSelector