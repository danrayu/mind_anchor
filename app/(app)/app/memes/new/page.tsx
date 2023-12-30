import MemeEdit from "../components/MemeEdit";

async function NewMemePage() {
  const response = await fetch("http://localhost:3000/api/categories");
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
