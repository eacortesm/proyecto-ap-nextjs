import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token");
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/login') || pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  const response = NextResponse.next();
  response.cookies.set('token', token.value, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 20, // 20 minutes
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  return response;
}

export const config = {
  matcher: [
    '/', 
    '/((?!_next|favicon.ico).*)'
  ],
}