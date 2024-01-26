import React from 'react'
interface MindscapeFormProps {
  
}

function MindscapeForm() {
  const isNew = false;

  const handleSubmit = (event: any) {

  }
  return (
    <form onSubmit={handleSubmit} className="max-w-[600px] mx-auto">
    <h1 className="text-[35px] font-bold mb-4">{newMeme && "Add"} {!newMeme && "Edit"} meme</h1>

    <div className="mb-4">
      <label htmlFor="title" className="block font-medium text-gray-700">
        Title
      </label>
      <input
        type="text"
        id="title"
        name="title"
        value={meme.title}
        onChange={changedTitle}
        className="mt-1 p-2 block rounded outline w-full"
      />
    </div>

    <div className="mb-4">
      <label
        htmlFor="description"
        className="block font-medium text-gray-700"
      >
        Description
      </label>
      <textarea
        id="description"
        name="description"
        value={meme.description}
        onChange={changedDescription}
        spellCheck="false"
        className="mt-1 p-2 block rounded outline w-full h-40"
      ></textarea>
    </div>

    <div className="mb-4 flex space-x-4 items-center">
      <label
        htmlFor="favorite"
        className="block font-medium text-gray-700 mt-1"
      >
        Favorite
      </label>
      <input
        type="checkbox"
        id="favorite"
        name="favorite"
        checked={meme.favorite}
        onChange={changedFavorite}
        className="mt-1 checkbox border-slate-400"
      />
    </div>
    <div className={"mt-4 flex " + (!newMeme ? "justify-between" : "justify-end")}>
      {!newMeme && (
        <button
          className="mt-2 btn btn-link font-normal text-red-700"
          type="button"
          onClick={deleteMeme}
        >
          Delete
        </button>
      )}
      <button type="submit" className="mt-2 btn btn-primary">
        Save
      </button>
    </div>
  </form>
  )
}

export default MindscapeForm