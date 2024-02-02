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

    const collections = await prisma.collection.findMany({
      include: {
        memes: {
          include: {
            meme: true,
          },
        }
      },
      where: {
        authorId: user?.id,
      },
    });
    return NextResponse.json(collections);
  } catch (error) {
    return NextResponse.json(
      { error: `Error: Could not get collections. ${error}` },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const { title, memes } = await request.json();

  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json("Not authenticated", { status: 401 });

  if (title === undefined || memes === undefined) {
    return NextResponse.json("Error: Collection data not defined.", {
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

    const newCollection = await prisma.collection.create({
      data: {
        title,
        author: { connect: { id: user.id } },
        memes: { connect: [] },
      },
      include: { author: true, memes: true },
    });
    if (memes.length > 0) {
      const data = memes.map((meme: CollectionMeme) => {
        return { ...meme, collectionId: newCollection.author.id };
      });
      const newMemes = await prisma.collectionMeme.createMany({ data });

      return NextResponse.json({ collection: newCollection, memes: newMemes });
    }
    return NextResponse.json({ collection: newCollection });
  } catch (error) {
    // Handle specific errors (e.g., non-existing meme)
    return NextResponse.json(
      { error: "Error: Could not create Collection." },
      { status: 500 }
    );
  }
}
