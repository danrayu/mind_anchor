import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/authOptions";


export async function GET(
  request: NextRequest
) {
  const session = await getServerSession(authOptions);
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
      where: {
        authorId: user?.id,
      }
    })
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: `Error: Could not get Categories. ${error}` },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const { name } = await request.json();
  const session = await getServerSession(authOptions);

  if (!session?.user?.email)
    return NextResponse.json("Not authenticated", { status: 401 });
  
  if (!name ) {
    return NextResponse.json('Error: Category data undefined.', {status: 400});
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
      },
      include: { author: true },
    });
    return NextResponse.json(updatedMeme);
  } catch (error) {
    // Handle specific errors (e.g., non-existing meme)
    return NextResponse.json({ error: 'Error: Could not create Category.' }, {status: 500});
  }
}