import NextAuth from "next-auth";
import authConfig from "./auth.config";

const {auth} = NextAuth(authConfig);

export default auth((req) => {
  const user = req.auth?.user;
  console.log(req.nextUrl.href)
  if (!user) {
    
  }
})

// automatically used for all middleware functions
export const config = {
  // * zero & more, + 1 & more, ? zero or one
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
}