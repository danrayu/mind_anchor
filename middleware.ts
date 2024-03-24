// import NextAuth from "next-auth";
// import authConfig from "./auth.config";

import { auth } from "./auth"

// const {auth} = NextAuth(authConfig);



export default auth((req) => {
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
}