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
    const schedule = await prisma.mindscapeScheduleConfig.findUnique({
      where: {
        authorId: user?.id,
      }
    })
    return NextResponse.json(schedule);
  } catch (error) {
    return NextResponse.json(
      { error: `Error: Could not get the schedule for mindscapes. ${error}` },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const { config } = await request.json();
  const session = await getServerSession(authOptions);

  if (!session?.user?.email)
    return NextResponse.json("Not authenticated", { status: 401 });
  
  if (!config) {
    return NextResponse.json('Error: Config data undefined.', {status: 400});
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
    const oldConfig = await prisma.mindscapeScheduleConfig.findUnique({
      where: { authorId: user.id }
    });
    if (!oldConfig) {
      const newConfig = await prisma.mindscapeScheduleConfig.create({
        data: {
          config,
          author: { connect: { id: user.id } },
        },
        include: { author: true },
      });
      return NextResponse.json(newConfig);
    }
    else {
      throw  Error(`MindScape schedule already exists for ${user.email}`);
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error: Could not create schedule.' }, {status: 500});
  }
}

export async function PUT(
  request: NextRequest,
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json("Not authenticated", { status: 401 });

  const { config } = await request.json();

  if (!config) {
    return NextResponse.json("Error: Error: Config data undefined.", {
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
    const updatedConfig = await prisma.mindscapeScheduleConfig.update({
      where: { authorId: user.id },
      data: {
        ...(config && { config }),
      },
    });
    return NextResponse.json(updatedConfig);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating the schedule config." },
      { status: 500 }
    );
  }
}