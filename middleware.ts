import { auth } from "./auth"

export default auth((req) => {
  const user = req.auth?.user;
  if (!user) {
    
  }
})

// automatically used for all middleware functions
export const config = {
  // * zero & more, + 1 & more, ? zero or one
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
}