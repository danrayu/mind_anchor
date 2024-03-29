"use server"
import prisma from "@/prisma/client";

export const getUserById = async (id: string) => {
  return await prisma?.user.findUnique({ where: { id } });
};
