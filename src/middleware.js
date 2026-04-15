import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const isAdminRoute = pathname.startsWith("/u/admin");
  const isMemberRoute = pathname.startsWith("/u/dashboard");


  const isProtectedRoute =
    isAdminRoute || isMemberRoute;

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    console.log(payload);

    const role = payload.role;

    if (isAdminRoute && role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    
    if (isMemberRoute && role !== "member") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.log("JWT invalid:", err.message);
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/u/:path*"],
};