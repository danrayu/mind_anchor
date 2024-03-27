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

    const mindscapes = await prisma.mindscape.findMany({
      include: {
        memes: {
          include: {
            meme: true
          },
        }
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
  const { title, description, memes } =
    await request.json();

  const session = await auth();
  if (!session?.user?.email)
    return NextResponse.json("Not authenticated", { status: 401 });

  if (title === undefined || memes === undefined) {
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
        memes: { connect: []},
      },
      include: { author: true, memes: true },
    });
    if (memes.length > 0) {
      const data = memes.map((meme: MindscapeMeme) => {
        return { ...meme, mindscapeId: newMindscape.id };
      });
      const newMemes = await prisma.mindscapeMeme.createMany({ data });

      return NextResponse.json({ mindscape: newMindscape, memes: newMemes });
    }
    return NextResponse.json(newMindscape);
  } catch (error) {
    return NextResponse.json(
      { error: "Error: Could not create Mindscape." },
      { status: 500 }
    );
  }
}
