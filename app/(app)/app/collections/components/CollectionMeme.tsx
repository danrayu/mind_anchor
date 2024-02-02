import React, { useState } from 'react'
interface CollectionMemeProps {
  meme: Meme,
  onRemove: () => void
}
function CollectionMeme({meme, onRemove} : CollectionMemeProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(state => !state);
  }

  return (
    <div className="outline mb-4 rounded-xl">
        <div
          className={
            "flex p-6 justify-between items-center hover:bg-slate-100" +
            (isOpen && " border-b border-slate-200")
          }
          onClick={toggleOpen}
        >
          <div className="">
            <span className="text-lg font-semibold">{meme.title}</span>
          </div>
          <button
            className="btn btn-outline "
            onClick={onRemove}
          >
            X
          </button>
        </div>
        <div className={`${isOpen ? "max-h-96 p-6 pl-7 pr-14" : "hidden"}`}>
          <span>{meme.description}</span>
        </div>
      </div>
  )
}

export default CollectionMeme