import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";

const {auth} = NextAuth(authConfig);

export default auth((req) => {
  const authenticated = !!req.auth;
  const {nextUrl} = req;
  if (!authenticated && nextUrl.pathname.startsWith('/app')) {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }
  if (nextUrl.pathname === '/app/mindscapes') {
    return NextResponse.redirect(new URL('/app', req.url));
  }
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
}