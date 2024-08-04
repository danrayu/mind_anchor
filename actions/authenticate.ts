"use server";
import { LoginSchema } from "@/schemas/LoginSchema";
import { RegisterSchema } from "@/schemas/RegisterSchema";
import bcrypt from "bcryptjs";
import prisma from "@/prisma/client";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "./verificationToken";
import { sendVerificationEmail } from "./authEmails";

type AuthActionReturnType = {
  success?: string;
  error?: string;
  awaitingVerification?: boolean;
  email?: string;
};

export const signin = async (values: any): Promise<AuthActionReturnType> => {
  const validatedFields = LoginSchema.safeParse(values);
  const doDebug = process.env.NEXT_PUBLIC_DEBUG_MODE;

  if (!validatedFields) {
    return { error: "Invalid fields" };
  }
  const { email, password } = values;
  const user = await prisma?.user.findUnique({
    where: {
      email: email,
    },
  });
  console.log("pwd", await bcrypt.compare(password, user!.hashedPassword!))

  if (!user) {
    if (doDebug) console.log("no user");
    return { error: "Invalid credentials." };
    } else if (user && (await bcrypt.compare(password, user.hashedPassword!))) {
      if (doDebug) console.log("+++++++++++++++++++++++++++");
    try {
      await signIn("credentials", {
        email,
        password,
        redirectTo: "/app",
      });
      return { success: "Login successful" };
    } catch (error) {
      if (doDebug) console.log("=============================", error);
      if (error instanceof AuthError) {
        return { error: "Could not authenticate." };
      }
      throw error;
    }
  } else if (!user.emailVerified) {
    const newToken = await generateVerificationToken(user.email!);
    await sendVerificationEmail(newToken.token, user.email!)
    return { error: "Email verification required", awaitingVerification: true };
  } else {
    return { error: "Invalid credentials." };
  }
};

export const signup = async (values: any): Promise<AuthActionReturnType> => {
  "use server";
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields) {
    return { error: "Invalid fields" };
  }
  const { name, email, password } = values;
  const hashedPwd = await bcrypt.hash(password, 10);
  const userExists = await prisma?.user.findUnique({
    where: {
      email: email,
    },
  });
  if (userExists) {
    return { error: "Email already in use" };
  }
  await prisma?.user.create({
    data: {
      name,
      email,
      hashedPassword: hashedPwd,
    },
  });

  const newToken = await generateVerificationToken(email);
  await sendVerificationEmail(newToken.token, email)
  return {
    success: "Confirmation email sent",
    awaitingVerification: true,
    email,
  };
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/app",
    });
    return { success: "Sign up successful" };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Could not authenticate." };
    }
    throw error;
  }
};
