import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";


export async function GET(
  request: NextRequest,
  {params}: {params: {id: number}}
) {
  const wCats = request.nextUrl.searchParams.has('wCats');
  const memes = await prisma.meme.findMany({
    include: {
      categories: wCats,
    }
  });
  return NextResponse.json(memes);
}

export async function POST(request: NextRequest) {
  const { title, description, authorId, favorite, categoryIds } = await request.json();
 
  if (!title || !description || !authorId || !categoryIds || favorite === undefined) {
    return NextResponse.json('Error: Meme data undefined.', {status: 400});
  }

  try {
    const updatedMeme = await prisma.meme.create({
      data: {
        title,
        description,
        favorite,
        author: { connect: { id: authorId } },
        categories: {connect: categoryIds.map((id:number) => ({ id })) },
      },
      include: { author: true, categories: true },
    });
    return NextResponse.json(updatedMeme);
  } catch (error) {
    // Handle specific errors (e.g., non-existing meme)
    return NextResponse.json({ error: 'Error: Could not create Meme.' }, {status: 500});
  }
}
