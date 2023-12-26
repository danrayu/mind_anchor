import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";


export async function GET(
  request: NextRequest,
  {params}: {params: {id: number}}
) {
  const memes = await prisma.meme.findMany()
  return NextResponse.json(memes);
}

export async function POST(request: NextRequest) {
  const { title, description, authorId, favorite, categoryIds } = await request.json();
  if (title.length === 0) {
    return NextResponse.json('Error: Meme name not valid.', {status: 403});
  }
  if (!title || !description || !authorId || !categoryIds || !favorite) {
    return NextResponse.json('Error: Meme data undefined.', {status: 403});
  }

  const createdMeme = await prisma.meme.create({
    data: {
      title: title,
      description: description,
      favorite: favorite,
      author: {
        connect: { id: authorId }, // Connect to an existing author
      },
      categories: {
        connect: categoryIds.map((id: number) => ({ id })), // Connect to existing categories
      },
    },
    include: {
      author: true,
      categories: true,
    },
  });
  return NextResponse.json(createdMeme);
}
