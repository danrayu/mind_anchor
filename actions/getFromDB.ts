"use server"
import prisma from "@/prisma/client";

export const getUserById = async (id: string) => {
  return await prisma?.user.findUnique({ where: { id } });
};

export const userExists = async (email: string) => {
  const userOnull = await prisma?.user.findUnique({ where: { email } });
  return userOnull ? true : false
}
