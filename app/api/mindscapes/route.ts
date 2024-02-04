import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/authOptions";

export async function GET(request: NextRequest) {
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

    const mindscapes = await prisma.mindscape.findMany({
      include: {
        collections: true
      },
      where: {
        authorId: user?.id,
      },
    });
    return NextResponse.json(mindscapes);
  } catch (error) {
    return NextResponse.json(
      { error: `Error: Could not get Mindscapes. ${error}` },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const { title, description } =
    await request.json();

  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json("Not authenticated", { status: 401 });

  if (title === undefined) {
    return NextResponse.json("Error: Mindscape title not defined.", { status: 400 });
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

    const newMindscape = await prisma.mindscape.create({
      data: {
        title,
        description: description ? description : "",
        author: { connect: { id: user.id } },
        collections: { connect: []},
        config: "",
      },
      include: { author: true, collections: true },
    });
    return NextResponse.json({ mindscape: newMindscape });
  } catch (error) {
    // Handle specific errors (e.g., non-existing meme)
    return NextResponse.json(
      { error: "Error: Could not create Mindscape." },
      { status: 500 }
    );
  }
}
