import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(
  request: NextRequest
) {
  try {
    const colors = await prisma.color.findMany();
    return NextResponse.json(colors);
  } catch (error) {
    return NextResponse.json(
      { error: `Error: Could not get colors. ${error}` },
      { status: 500 }
    );
  }
}