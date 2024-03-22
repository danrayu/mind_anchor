import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
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
    CredentialsProvider({
      type: 'credentials',
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Sign in with email",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "email", placeholder: "john.doe@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = await prisma.user.findUnique({ where: { email: credentials!.email } })
  
        if (user) {
          return user
        } else {
          return null
        }
      }
    })
  ],
  sessio: {
    strategy: "jwt"
  },
  events: {
    async signIn(message: any) {
      signInCallback(message);
    }
  },
  pages: {
    signIn: "/app/auth/signin",
  }
};

const signInCallback = async (message: any) => {
  console.log(message);
  const providerId: string = message.account.providerAccountId;
  const accountExists = await prisma.account.findUnique({ where: { id: providerId } });
  // data: {
  //   title,
  //   description: description ? description : "",
  //   favorite,
  //   author: { connect: { id: user.id } },
  //   categories: { connect: categoryIds.map((id: number) => ({ id })) },
  //   color: { connect: { id: colorId } },
  // },
  // include: { author: true, categories: true, color: true },


  // model Account {
  //   id                String  @id @default(cuid())
  //   userId            String
  //   type              String
  //   provider          String
  //   providerAccountId String
  //   refresh_token     String? @db.Text
  //   access_token      String? @db.Text
  //   expires_at        Int?
  //   token_type        String?
  //   scope             String?
  //   id_token          String? @db.Text
  //   session_state     String?
  if (!accountExists) {
    prisma.account.create({
      data: {
        userId: message.user.id,
        type: message.account.type,
        provider: message.account.provider,
        
      }
    })
  }
}