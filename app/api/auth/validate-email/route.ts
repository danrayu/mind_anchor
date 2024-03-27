import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get("email");
  const token = request.nextUrl.searchParams.get("token");
  if (!email || !token) {
    return NextResponse.redirect(new URL(`/app/auth/email-validation-failed?error=400&email=`, process.env.NEXT_PUBLIC_API_BASE_URL))
  }

  try {
    const existingToken = await prismadb?.verificationToken.findFirst({where: {email}});

    if (!existingToken) {
      return NextResponse.redirect(new URL(`/app/auth/email-validation-failed?error=409&email=${email}`, process.env.NEXT_PUBLIC_API_BASE_URL))
    }
  
    if (existingToken.expires < new Date()) {
      return NextResponse.redirect(new URL(`/app/auth/email-validation-failed?error=408&email=${email}`, process.env.NEXT_PUBLIC_API_BASE_URL))
    }
  
    if (existingToken.token !== token) {
      return NextResponse.redirect(new URL(`/app/auth/email-validation-failed?error=400&email=${email}`, process.env.NEXT_PUBLIC_API_BASE_URL))
    }
  
    await prismadb?.user.update({where: {email}, data: {
      emailVerified: new Date()
    }})
  
    return NextResponse.redirect(new URL('/app/auth/email-validation-success', request.url))
  }
  catch (error) {
    return NextResponse.redirect(new URL(`/app/auth/email-validation-failed?error=500&email=${email}`, process.env.NEXT_PUBLIC_API_BASE_URL))
  }
}