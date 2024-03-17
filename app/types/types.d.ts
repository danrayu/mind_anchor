import { DateTime } from "next-auth/providers/kakao";

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
}

export {};
