import React, { Dispatch, SetStateAction } from 'react'
import FilterItem from '../../components/utility/FilterItem';
import { FilterState } from '../page';

interface FilterSelectorProps {
  filterState: FilterState;
  categories: any;
  setFilter: Dispatch<SetStateAction<FilterState>>;
}

function FilterSelector({categories, filterState, setFilter}: FilterSelectorProps) {
  let filter = {...filterState};
  
  function favoritedClicked() {
    filter.unfavorited = false;
    filter.favorited = !filterState.favorited;
    setFilter(filter);

  }
  function unFavoritedClicked() {
    filter.favorited = false;
    filter.unfavorited = !filterState.unfavorited;
    setFilter(filter);
  }

  return (
    <div className='mt-2'>
      <div className='flex flex-wrap'>
        <FilterItem onAdd={favoritedClicked} onRemove={unFavoritedClicked} adding={filterState.favorited} removing={filterState.unfavorited} name='Favorites'/>
      </div>
    </div>
  )
}

export default FilterSelector