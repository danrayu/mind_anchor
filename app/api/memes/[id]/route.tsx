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

  if (!meme) {
    return NextResponse.json("Meme not found.", { status: 404 });
  }
  return NextResponse.json(meme);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { title, description, authorId, favorite, categoryIds } =
    await request.json();

  try {
    const updatedMeme = await prisma.meme.update({
      where: { id: parseInt(params.id) },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(favorite !== undefined && { favorite }),
        ...(authorId && { author: { connect: { id: authorId } } }),
        ...(categoryIds && {
          categories: {
            set: [],
            connect: categoryIds.map((id: number) => ({ id })),
          },
        }),
      },
      include: { author: true, categories: true },
    });
    return NextResponse.json(updatedMeme);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating the Meme: " + error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const meme = await prisma.meme.findUnique({
    where: {
      id: parseInt(params.id),
    }
  });

  if (!meme) {
    return NextResponse.json({error: "Meme does not exist."}, { status: 400 });
  }

  try {
    const deleted = await prisma.meme.delete({
      where: {
        id: meme.id
      }
    });
    return NextResponse.json(deleted);
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting the Meme." },
      { status: 500 }
    );
  }
}
