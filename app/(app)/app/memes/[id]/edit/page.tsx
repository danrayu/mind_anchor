import React from "react";
import EditMeme from "./components/EditMeme";
interface EditMemePageProps {
  params: { id: number };
}
async function EditMemePage({ params: { id } }: EditMemePageProps) {
  let meme: Meme = await fetch("http://localhost:3000/api/memes/" + id)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
  let categories: Category[] = await fetch(
    "http://localhost:3000/api/categories"
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
  return (
    <div>
      <EditMeme meme={meme} categories={categories} />
    </div>
  );
}

export default EditMemePage;
