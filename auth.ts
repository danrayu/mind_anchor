import NextAuth from "next-auth";
import authConfig from "./auth.config";
import prismadb from "./prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const {
  handlers: { GET, POST },

  auth,
} = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prismadb),
  session: {
    strategy: "jwt",
  },
});
