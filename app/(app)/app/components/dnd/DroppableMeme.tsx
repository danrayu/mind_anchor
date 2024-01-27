import React from 'react';
import {useDroppable} from '@dnd-kit/core';
interface DroppableMemeProps {
  children: React.ReactNode
}

export function DroppableMeme({children}: DroppableMemeProps) {
  const {isOver, setNodeRef} = useDroppable({
    id: 'droppable-meme',
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };
  
  
  return (
    <div ref={setNodeRef} style={style} className='p-10 bg-red-200'>
      {children}
    </div>
  );
}