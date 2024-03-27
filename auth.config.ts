import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "@auth/core/providers/credentials";
import { LoginSchema } from "./schemas/LoginSchema";
import bycrypt from "bcryptjs";
import Google from "next-auth/providers/google";
import prisma from "@/prisma/client";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          email: "Email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const {email, password} = validatedFields.data;
          const user = await prisma?.user.findUnique({where: {
            email: email
          }});

          if (!user || !user.hashedPassword) {
            return null;
          }

          if (await bycrypt.compare(password, user.hashedPassword)) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
  
} satisfies NextAuthConfig