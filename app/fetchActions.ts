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