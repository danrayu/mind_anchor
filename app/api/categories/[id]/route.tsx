import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const cat = await prisma.category.findUnique({
    where: {
      id: parseInt(params.id),
    }
  });

  if (!cat) {
    return NextResponse.json({error: "Category does not exist."}, { status: 400 });
  }

  try {
    const deleted = await prisma.category.delete({
      where: {
        id: cat.id
      }
    });
    return NextResponse.json(deleted);
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting the category." },
      { status: 500 }
    );
  }
}