import MemeView from "./components/MemeView";

async function MemesPage() {
  const [memesResponse, categoriesResponse] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/memes/?wCats`),
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories`)
  ]);

  const memes = await memesResponse.json();
  const categories = await categoriesResponse.json();

  return <MemeView categories={categories} memes={memes}/>;
}

export default MemesPage;
