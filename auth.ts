import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import authConfig from "./auth.config";

export const {
  handlers: { GET, POST },

  auth,
} = NextAuth({...authConfig, adapter: PrismaAdapter()});
