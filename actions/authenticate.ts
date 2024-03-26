"use server";
import { LoginSchema } from "@/schemas/LoginSchema";
import { RegisterSchema } from "@/schemas/RegisterSchema";
import bcrypt from "bcryptjs";
import prisma from "@/prisma/client";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const signin = async (values: any) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields) {
    return { error: "Invalid fields" };
  }
  const { email, password } = values;
  const user = await prisma?.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return { error: "This email is not signed up yet." };
  } else if (user && (await bcrypt.compare(password, user.hashedPassword!))) {
    try {
      await signIn("credentials", {
        email,
        password,
        redirectTo: "/app"
      });
      return { success: "Login successful" };
    } catch (error) {
      if (error instanceof AuthError) {
        return { error: "Could not authenticate." };
      }
      throw error;
    }
  } else {
    return { error: "Wrong password." };
  }
};

export const signup = async (values: any) => {
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

  const newUser = await prisma?.user.create({
    data: {
      name,
      email,
      hashedPassword: hashedPwd,
      image: "/default-user.png",
    },
  });
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/app"
    });
    return { success: "Sign up successful" };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Could not authenticate." };
    }
    throw error;
  }
};
