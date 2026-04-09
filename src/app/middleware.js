import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req){
    const token = req.cookies.get(`token`)?.value;
    console.log("Token in middleware:", token);

    const isDashboard = req.nextUrl.pathname.startsWith("/dashboard");

    
    if (!token && isDashboard) { return NextResponse.redirect(new URL("/", req.url));} 


    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return NextResponse.next();
    } catch (err) {
      return NextResponse.redirect(new URL("/", req.url));
    }
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile"],
}