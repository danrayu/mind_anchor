declare global {
  type Category = {
    id: number;
    name: string;
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