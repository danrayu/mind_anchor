import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { auth } from "@/auth";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.email)
    return NextResponse.json("Not authenticated", { status: 401 });

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    if (!user) {
      return NextResponse.json("User not found", { status: 404 });
    }
    const categories = await prisma.category.findMany({
      include: {
        color: true,
      },
      where: {
        authorId: user?.id,
      },
    });
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: `Error: Could not get Categories. ${error}` },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const { name, colorId } = await request.json();
  const session = await auth();

  if (!session?.user?.email)
    return NextResponse.json("Not authenticated", { status: 401 });

  if (!name || !colorId) {
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
    const updatedMeme = await prisma.category.create({
      data: {
        name: name,
        author: { connect: { id: user.id } },
        color: { connect: { id: colorId } },
      },
      include: { author: true, color: true },
    });
    return NextResponse.json(updatedMeme);
  } catch (error) {
    return NextResponse.json(
      { error: "Error: Could not create Category." },
      { status: 500 }
    );
  }
}
