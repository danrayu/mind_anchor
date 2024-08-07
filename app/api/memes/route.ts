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
    const wCats = request.nextUrl.searchParams.has("wCats");
    const memes = await prisma.meme.findMany({
      include: {
        categories: wCats,
      },
      where: {
        authorId: user?.id,
      },
    });
    return NextResponse.json(memes);
  } catch (error) {
    return NextResponse.json(
      { error: `Error: Could not get Memes. ${error}` },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const { title, description, favorite, categoryIds, colorId } =
    await request.json();

  const session = await auth();
  if (!session?.user?.email)
    return NextResponse.json("Not authenticated", { status: 401 });

  if (!title || !categoryIds || favorite === undefined || !colorId) {
    return NextResponse.json("Error: Meme data undefined.", { status: 400 });
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
    const newMeme = await prisma.meme.create({
      data: {
        title,
        description: description ? description : "",
        favorite,
        author: { connect: { id: user.id } },
        categories: { connect: categoryIds.map((id: number) => ({ id })) },
        colorId
      },
      include: { author: true, categories: true },
    });
    return NextResponse.json(newMeme);
  } catch (error) {
    return NextResponse.json(
      { error: "Error: Could not create Meme." },
      { status: 500 }
    );
  }
}
