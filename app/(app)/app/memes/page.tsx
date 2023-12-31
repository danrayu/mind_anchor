'use client'

import { useAppSelector } from "@/app/store/hooks";
import MemeView from "./components/MemeView";

function MemesPage() {
  // const [memesResponse, categoriesResponse] = await Promise.all([
  //   fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/memes/?wCats`),
  //   fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories`)
  // ]);
  // const memes = await memesResponse.json();
  // const categories = await categoriesResponse.json();

  var memes = useAppSelector(state => state.memes.memes);
  var cats = useAppSelector(state => state.categories.categories);
  

  return <MemeView categories={cats} memes={memes}/>;
}

export default MemesPage;
