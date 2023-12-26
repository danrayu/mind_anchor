import MemeView from "./components/MemeView";

async function MemesPage() {
  let memes: Meme[] = [];
  let categories: Category[] = [];
  await fetch("http://localhost:3000/api/memes")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      memes = data;
    });
  await fetch("http://localhost:3000/api/categories")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      categories = data;
    });

  return <MemeView categories={categories} memes={memes}/>;
}

export default MemesPage;
