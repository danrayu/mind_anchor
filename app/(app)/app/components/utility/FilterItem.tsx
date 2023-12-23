import React from 'react';

interface FilterItemProps {
  onAdd: () => any;
  onRemove: () => any;
  adding: boolean;
  removing: boolean;
  name: string;
}

function FilterItem({onAdd, onRemove, adding, removing, name}: FilterItemProps) {
  const styleBtn = 'px-2 font-semibold rounded focus:outline-none focus:ring-2 focus:ring-opacity-50';
  return (
    <div className='flex items-center space-x-2'>
      <button 
        className={styleBtn+ ' hover:text-white hover:bg-green-600 focus:ring-green-700'} 
        onClick={onAdd}>
        +
      </button>
      <span 
        className={`font-medium ${adding ? "text-green-700" : ''} ${removing ? "text-red-700" : ''}`}>
        {name}
      </span>
      <button 
        className={styleBtn + ' hover:text-white hover:bg-red-600 focus:ring-red-700'}
        onClick={onRemove}>
        -
      </button>
    </div>
  );
}

export default FilterItem;
