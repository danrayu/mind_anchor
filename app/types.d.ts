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
}

export {};