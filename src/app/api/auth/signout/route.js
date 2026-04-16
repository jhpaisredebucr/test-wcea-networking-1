import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const response = NextResponse.redirect(new URL('/', req.url));

    // Clear the token cookie
    response.cookies.set('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/'
    });

    return response;
  } catch (error) {
    console.error("[auth/signout/route.js] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
