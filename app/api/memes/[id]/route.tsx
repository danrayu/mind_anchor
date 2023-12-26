import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const meme = await prisma.meme.findUnique({
    where: { id: parseInt(params.id) },
    include: {
      categories: true, // this will include the categories in the result
    },
  });
  return NextResponse.json(meme);
}



export async function PUT(request: NextRequest,
  { params }: { params: { id: string } }) {
  const { title, description, authorId, favorite, categoryIds } = await request.json();
  
  if (!title || !description || !authorId || !categoryIds || favorite === undefined) {
    return NextResponse.json('Error: Meme data undefined.', {status: 400});
  }

  try {
    const updatedMeme = await prisma.meme.update({
      where: { id: parseInt(params.id) },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(favorite !== undefined && { favorite }),
        ...(authorId && { author: { connect: { id: authorId } } }),
        ...(categoryIds && { categories: { set: [], connect: categoryIds.map((id:number) => ({ id })) } }),
      },
      include: { author: true, categories: true },
    });
    return NextResponse.json(updatedMeme);
  } catch (error) {
    // Handle specific errors (e.g., non-existing meme)
    return NextResponse.json({ error: 'Error updating the Meme.' }, {status: 500});
  }
}