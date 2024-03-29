"use server"
import prisma from "@/prisma/client";

export const getIsEmailVerified = async (email: string) => {
  try {
    const user = await prisma?.user.findUnique({ where: { email } });
    if (user?.emailVerified) {
      return true;
    }
    else {
      return false;
    }
  } catch (error) {
    throw error;
  }
}