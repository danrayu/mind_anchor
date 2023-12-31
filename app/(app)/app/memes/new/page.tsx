'use client'
import MemeEdit from "../components/MemeEdit";

async function NewMemePage() {
  let categories: Category[] = await fetch(
    "http://localhost:3000/api/categories"
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
  return <MemeEdit categories={categories} />;
}

export default NewMemePage;
