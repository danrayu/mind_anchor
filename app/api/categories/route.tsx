import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";


export async function GET(
  request: NextRequest,
  {params}: {params: {id: number}}
) {
  const categories = await prisma.category.findMany()
  return NextResponse.json(categories);
}
