import { NextResponse } from "next/server";

export function middleware(req){
    const token = req.cookies.get(`token`);
    const isDashboard = req.nextUrl.pathname.startsWith("/dashboard");

    console.log("Middleware executed. Token:", token, "Is Dashboard:", isDashboard);
    
    if (!token && isDashboard) {
            return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile"],
}