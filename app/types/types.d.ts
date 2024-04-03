declare global {
  type Category = {
    id: number;
    name: string;
    authorId: number;
    colorId: number;
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
    colorId: number;
  };
  type MindscapeMeme = {
    id: number;
    meme: Meme;
    index: number;
    mindscapeId: number;
  };
  type Mindscape = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    description: string;
    authorId: string;
    memes: MindscapeMeme[];
  };
  type Schedule = Array<{ time: DateTime; mindscape: Mindscape }>;
  type Color = {
    id: number;
    classes: string;
  };
  type NextImage = {
    src: string;
    width: number;
    height: number;
    alt: string;
  }
}


export {};
