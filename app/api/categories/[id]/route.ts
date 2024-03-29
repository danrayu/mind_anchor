import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/authOptions";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json("Not authenticated", { status: 401 });

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
    const user = await prisma.user.findUnique({
      where: {
        email: session!.user!.email!,
      },
    });
    if (!user) {
      return NextResponse.json("User not found", { status: 404 });
    }
    const deleted = await prisma.category.delete({
      where: {
        id: cat.id,
        authorId: user.id,
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
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json("Not authenticated", { status: 401 });

  const { name, colorId } = await request.json();

  if (!name || !colorId) {
    console.log( name, colorId);
    return NextResponse.json("Error: Category data undefined.", {
      status: 400,
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: session!.user!.email!,
      },
    });
    if (!user) {
      return NextResponse.json("User not found", { status: 404 });
    }
    const updatedCategory = await prisma.category.update({
      where: { id: parseInt(params.id), authorId: user.id },
      data: {
        ...(name && { name }),
        ...(colorId && { color: { connect: { id: colorId } } }),
      },
      include: { color: true },
    });
    return NextResponse.json(updatedCategory);
  } catch (error) {
    return NextResponse.json(
      { error: `Error updating the Category: ${error}` },
      { status: 500 }
    );
  }
}

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
    const cat = await prisma.category.findUnique({
      where: {
        id: parseInt(params.id),
        authorId: user.id,
      },
    });

    if (!cat) {
      return NextResponse.json("Category not found.", { status: 404 });
    }
    return NextResponse.json(cat);
  } catch {
    return NextResponse.json("Could not get Category. Server error.", {
      status: 500,
    });
  }
}
