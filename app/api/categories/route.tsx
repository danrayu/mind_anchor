import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";


export async function GET(
  request: NextRequest,
  {params}: {params: {id: number}}
) {
  const categories = await prisma.category.findMany()
  return NextResponse.json(categories);
}

export async function POST(request: NextRequest) {
  const { name, authorId } = await request.json();
 
  if (!name ) {
    return NextResponse.json('Error: Category data undefined.', {status: 400});
  }

  try {
    const updatedMeme = await prisma.category.create({
      data: {
        name: name,
        author: { connect: { id: authorId } },
      },
      include: { author: true },
    });
    return NextResponse.json(updatedMeme);
  } catch (error) {
    // Handle specific errors (e.g., non-existing meme)
    return NextResponse.json({ error: 'Error: Could not create Category.' }, {status: 500});
  }
}