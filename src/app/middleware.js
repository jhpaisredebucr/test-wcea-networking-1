import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  const isProtectedRoute =
    req.nextUrl.pathname.startsWith("/dashboard") ||
    req.nextUrl.pathname.startsWith("/profile");

  // If no token and trying to access protected route
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If no token but not protected route → allow
  if (!token) {
    return NextResponse.next();
  }

  // Verify token safely
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile"],
};