import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";


export async function GET(
  request: NextRequest,
  {params}: {params: {id: number}}
) {
  const memes = await prisma.meme.findMany()
  return NextResponse.json(memes);
}
