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

  const collection = await prisma.collection.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!collection) {
    return NextResponse.json(
      { error: "Collection does not exist." },
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
    const deleted = await prisma.collection.delete({
      where: {
        id: collection.id,
        authorId: user.id,
      },
    });
    return NextResponse.json(deleted);
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting the collection." },
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

  const { title } = await request.json();

  if (!title) {
    return NextResponse.json("Error: collection data undefined.", {
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
    const updatedCollection = await prisma.collection.update({
      where: { id: parseInt(params.id), authorId: user.id },
      data: {
        ...(title && { title }),
      },
      include: { author: true },
    });
    return NextResponse.json(updatedCollection);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating the collection." },
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
    const collection = await prisma.collection.findUnique({
      where: {
        id: parseInt(params.id),
        authorId: user.id,
      },
    });

    if (!collection) {
      return NextResponse.json("Collection not found.", { status: 404 });
    }
    return NextResponse.json(collection);
  } catch {
    return NextResponse.json("Could not get Collection. Server error.", {
      status: 500,
    });
  }
}
