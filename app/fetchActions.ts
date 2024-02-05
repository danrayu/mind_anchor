const url = "http://localhost:3000";

export async function fetchGetMemes() {
  return await fetch(url + `/api/memes/?wCats`)
}

export async function fetchCreateMeme(memeData: any) {
  return await fetch("/api/memes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(memeData),
  });
}

export async function fetchUpdateMeme(memeData: any) {
  return await fetch("/api/memes/" + memeData.id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(memeData),
  });
}

export async function fetchDeleteMeme(id: number) {
  return await fetch("/api/memes/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function fetchGetCategories() {
  return await fetch(url + `/api/categories`);
}

export async function fetchGetCategory(id: number) {
  return await fetch(url + `/api/categories/`+id);
}

export async function fetchCreateCategory(catData: any) {
  return await fetch("/api/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(catData),
  });
}

export async function fetchUpdateCategory(id: number, catData: any) {
  return await fetch("/api/categories/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(catData),
  });
}

export async function fetchDeleteCategory(id: number) {
  return await fetch("/api/categories/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function fetchGetMindscapes() {
  return await fetch(url + `/api/mindscapes`);
}

export async function fetchCreateMindscape(mindscapeData: any) {
  return await fetch("/api/mindscapes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mindscapeData),
  });
}

export async function fetchUpdateMindscape(mindscapeData: any) {
  return await fetch("/api/mindscapes/" + mindscapeData.id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mindscapeData),
  });
}

export async function fetchDeleteMindscape(id: number) {
  return await fetch("/api/mindscapes/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function fetchGetCollections() {
  return await fetch(url + `/api/collections`);
}

export async function fetchCreateCollection(collectionData: any) {
  return await fetch("/api/collections", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(collectionData),
  });
}

export async function fetchUpdateCollection(collectionData: any) {
  return await fetch("/api/collections/" + collectionData.id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(collectionData),
  });
}

export async function fetchDeleteCollection(id: number) {
  return await fetch("/api/collections/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}