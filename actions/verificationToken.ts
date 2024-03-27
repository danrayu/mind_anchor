"use server"
import { v4 as uuidv4 } from "uuid";
import { sendVerificationEmail } from "./verificationEmail";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await prismadb!.verificationToken.findFirst({
      where: { email },
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await prismadb!.verificationToken.findUnique({
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

  await prismadb?.verificationToken.deleteMany({
    where: {
      email,
    },
  });

  await sendVerificationEmail(token, email);

  const newToken = await prismadb?.verificationToken.create({
    data: {
      token,
      expires,
      email,
    },
  });

  return newToken;
};
