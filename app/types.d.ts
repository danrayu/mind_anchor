declare global {
  type Category = {
    id: number;
    name: string;
    authorId: number;
  };
  type Meme = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    description: string;
    authorId: number;
    favorite: boolean;
    categories: Category[];
  }
  type CollectionMeme = {
    id: number;
    meme: Meme;
    index: number;
    collectionId: number
  }
  type Collection = {
    id: number;
    title: string;
    authorId: string;
    memes: CollectionMeme[];
  }
  type Mindscape = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    description: string;
    authorId: string;
    collections: Collection[];
  }
}

export {};