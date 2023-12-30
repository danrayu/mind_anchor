import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const cat = await prisma.category.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!cat) {
    return NextResponse.json(
      { error: "Category does not exist." },
      { status: 400 }
    );
  }

  try {
    const deleted = await prisma.category.delete({
      where: {
        id: cat.id,
      },
    });
    return NextResponse.json(deleted);
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting the category." },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { name, authorId } = await request.json();

  if (!name || !authorId) {
    return NextResponse.json("Error: Category data undefined.", { status: 400 });
  }

  try {
    const updatedCategory = await prisma.category.update({
      where: { id: parseInt(params.id) },
      data: {
        ...(name && { name }),
      },
      include: { author: true },
    });
    return NextResponse.json(updatedCategory);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating the Category." },
      { status: 500 }
    );
  }
}
