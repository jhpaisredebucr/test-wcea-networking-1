import { NextResponse } from 'next/server';

export async function POST(req) {
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
}
