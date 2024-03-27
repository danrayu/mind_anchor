import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { email } = await request.json();

  try {
    const user = await prismadb?.user.findUnique({ where: { email } });
    if (user?.emailVerified) {
      return NextResponse.json({status: "verified"}, {status: 200});
    }
    else {
      return NextResponse.json({status: "pending"}, {status: 200});
    }
  } catch {
    return NextResponse.json(
      "Failed to check email verification status: Server error",
      { status: 500 }
    );
  }
}
