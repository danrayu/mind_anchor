import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/authOptions";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json("Not authenticated", { status: 401 });

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: session!.user!.email!,
      },
    });
    if (!user) {
      return NextResponse.json("User not found", { status: 404 });
    }
    const meme = await prisma.meme.findUnique({
      where: { id: parseInt(params.id), authorId: user.id },
      include: {
        categories: true, 
        color: true,
      },
    });
  
    if (!meme) {
      return NextResponse.json("Meme not found.", { status: 404 });
    }
    return NextResponse.json(meme);
  } catch {
    return NextResponse.json(
      { error: "Could not get Meme: Server error: " },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { title, description, authorId, favorite, categoryIds, colorId } =
    await request.json();
    const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json("Not authenticated", { status: 401 });


  try {
    const user = await prisma.user.findUnique({
      where: {
        email: session!.user!.email!,
      },
    });
    if (!user) {
      return NextResponse.json("User not found", { status: 404 });
    }
    const updatedMeme = await prisma.meme.update({
      where: { id: parseInt(params.id), authorId: user.id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(favorite !== undefined && { favorite }),
        ...(authorId && { author: { connect: { id: authorId } } }),
        ...(colorId && { color: { connect: { id: colorId } } }),
        ...(categoryIds && {
          categories: {
            set: [],
            connect: categoryIds.map((id: number) => ({ id })),
          },
        }),
      },
      include: { author: true, categories: true, color: true },
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
    },
  });

  if (!meme) {
    return NextResponse.json(
      { error: "Meme does not exist." },
      { status: 400 }
    );
  }

  try {
    const deleted = await prisma.meme.delete({
      where: {
        id: meme.id,
      },
    });
    return NextResponse.json(deleted);
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting the Meme." },
      { status: 500 }
    );
  }
}
