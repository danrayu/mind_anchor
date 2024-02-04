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

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: session!.user!.email!,
      },
    });
    if (!user) {
      return NextResponse.json("User not found", { status: 404 });
    }

    const mindscape = await prisma.mindscape.findUnique({
      where: {
        authorId: user.id,
        id: parseInt(params.id)
      }
    });
    if (!mindscape) {
      return NextResponse.json(
        { error: "Mindscape does not exist." },
        { status: 400 }
      );
    }

    await prisma.mindscapeMeme.deleteMany({
      where: {
        mindscapeId: mindscape.id,
      },
    });
    
    const deleted = await prisma.mindscape.delete({
      where: {
        id: mindscape.id,
        authorId: user.id,
      },
    });
    return NextResponse.json(deleted);
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting the mindscape." },
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

  const { title, description, memes } = await request.json();

  if (!title || memes === undefined) {
    return NextResponse.json("Error: Mindscape data undefined.", {
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
    
    const updatedMindscape = await prisma.mindscape.update({
      where: { id: parseInt(params.id), authorId: user.id },
      data: {
        ...(title && { title }),
        ...(description && {description}),
      },
      include: { author: true },
    });
    await prisma.mindscapeMeme.deleteMany({
      where: {
        mindscapeId: updatedMindscape.id,
      },
    });
    await prisma.mindscapeMeme.createMany({
      data: memes,
    });

    return NextResponse.json({
      collection: updatedMindscape,
      memes,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating the Mindscape." },
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
    const mindscape = await prisma.mindscape.findUnique({
      where: {
        id: parseInt(params.id),
        authorId: user.id,
      },
    });

    if (!mindscape) {
      return NextResponse.json("Mindscape not found.", { status: 404 });
    }
    return NextResponse.json(mindscape);
  } catch {
    return NextResponse.json("Could not get Mindscape. Server error.", {
      status: 500,
    });
  }
}
