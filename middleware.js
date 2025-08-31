import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(request) {

  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  try {

    if(!token){
      if(pathname.startsWith("/admin") || pathname.startsWith("/user")){
        return NextResponse.redirect(new URL("/auth/login", request.url));
      };
    };


    if(token){
      if(pathname.startsWith("/auth")){
        return NextResponse.redirect(new URL("/", request.url));
      }
    };

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
 
    if (pathname.startsWith("/admin") && decoded.role !== "admin") {
      return NextResponse.redirect(new URL("/user", request.url));
    }

     if (pathname.startsWith("/user") && decoded.role !== "user") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  } catch (err) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/auth/:path*"],
};
