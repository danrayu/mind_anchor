import React from "react";
import MemeEdit from "../../components/MemeEdit";

interface EditMemePageProps {
  params: { id: number };
}

async function EditMemePage({ params: { id } }: EditMemePageProps) {
  const [memeResponse, categoriesResponse] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/memes/${id}`),
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories`),
  ]);

  const meme = await memeResponse.json();
  console.log(memeResponse.statusText);
  if (!memeResponse.ok) {
    return (
      <div className="text-center">
        <h3>{meme}</h3>
      </div>
    );
  }
  const categories = await categoriesResponse.json();

  return (
    <div>
      <MemeEdit meme={meme} categories={categories} />
    </div>
  );
}

export default EditMemePage;
