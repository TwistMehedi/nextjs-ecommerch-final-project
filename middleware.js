import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  };

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  };

  const role = decoded?.role || "user";

   if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    const redirectPath = role === "admin" ? "/admin/dashboard" : "/user/dashboard";
    return NextResponse.redirect(new URL(redirectPath, request.url));
  };

   if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/user/dashboard", request.url));
  };

   if (pathname.startsWith("/user") && role !== "user") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  };

  return NextResponse.next();
};

export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/login", "/register"],
};
