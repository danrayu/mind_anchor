import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { auth } from "@/auth";

const inflateSchedule = (schedule: any, mindscapes: any) => {
  if (!schedule) {
    return [];
  }
  schedule = schedule.filter((row: any) => {
    const ms = mindscapes.find((ms: Mindscape) => ms.id === row.id);
    if (!ms) updateSchedule(schedule);
    return !!ms;
  });
  schedule.map((row: any) => {
    const id = row.id;
    row.mindscape = mindscapes.find((ms: Mindscape) => ms.id === id);
    return row;
  });
  return schedule;
};

const updateSchedule = async (schedule: any) => {
  const session = await auth();
  if (!session?.user?.email)
    return NextResponse.json("Not authenticated", { status: 401 });

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });
  await prisma.mindscapeScheduleConfig.update({
    where: { authorId: user!.id },
    data: {
      config: JSON.stringify({ config: schedule }),
    },
  });
};

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
            meme: true,
          },
        },
      },
      where: { authorId: user.id },
    });
    const schedule = await prisma.mindscapeScheduleConfig.findUnique({
      where: {
        authorId: user?.id,
      },
    });
    if (!schedule) {
      const newConfig = await prisma.mindscapeScheduleConfig.create({
        data: {
          config: JSON.stringify([]),
          author: { connect: { id: user.id } },
        },
        include: { author: true },
      });
      return NextResponse.json(
        inflateSchedule(JSON.parse(newConfig.config), mindscapes)
      );
    }
    return NextResponse.json(
      inflateSchedule(JSON.parse(schedule.config), mindscapes)
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Error: Could not get the schedule for mindscapes. ${error}` },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.email)
    return NextResponse.json("Not authenticated", { status: 401 });

  const {config} = await request.json();

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
        config: JSON.stringify(config),
      },
    });
    
    return NextResponse.json(
      {config}
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating the schedule config." },
      { status: 500 }
    );
  }
}
