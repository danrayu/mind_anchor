import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/custom-page', request.url));
}

// automatically used for all middleware functions
export const config = {
  // * zero & more, + 1 & more, ? zero or one
  matcher: ["/page-you-don-t-want-accessed/:id?"]
}