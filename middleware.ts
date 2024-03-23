import { NextRequest, NextResponse } from "next/server";
// import {auth} from "./auth"
// export { auth as default } from "auth"

export { default } from "next-auth/middleware";

export function middleware(request: NextRequest) {
  // const loggedIn = request.
}

// automatically used for all middleware functions
export const config = {
  // * zero & more, + 1 & more, ? zero or one
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
}