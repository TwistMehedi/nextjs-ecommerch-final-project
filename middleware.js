import { NextResponse } from "next/server";


export async function middleware(request) {

  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  };

  return NextResponse.next();
  
};

export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/login", "/register"],
};
