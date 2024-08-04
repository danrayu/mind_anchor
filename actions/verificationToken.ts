"use server"
import { v4 as uuidv4 } from "uuid";
import { sendVerificationEmail } from "./authEmails";
import prisma from "@/prisma/client";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await prisma!.verificationToken.findFirst({
      where: { email },
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await prisma!.verificationToken.findUnique({
      where: { token },
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 1800 * 1000);

  await prisma?.verificationToken.deleteMany({
    where: {
      email,
    },
  });

  const newToken = await prisma?.verificationToken.create({
    data: {
      token,
      expires,
      email,
    },
  });

  return newToken;
};
