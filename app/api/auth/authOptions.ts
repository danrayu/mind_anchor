import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  sessio: {
    strategy: "jwt"
  },
  events: {
    async signIn(message: any) {
      signInCallback(message);
    }
  }
};

const signInCallback = async (message: any) => {
  console.log("isNewUser\n",message);
}