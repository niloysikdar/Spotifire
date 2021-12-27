import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export const middleware = async (req) => {
  // token will exist if user is logged in
  const token = await getToken({
    req,
    secureCookie:
      process.env.NEXTAUTH_URL?.startsWith('https://') ??
      !!process.env.VERCEL_URL,
    secret: process.env.JWT_SECRET,
  });

  const { pathname } = req.nextUrl;

  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next();
  }

  if (!token && pathname !== '/auth') {
    return NextResponse.redirect('/auth');
  }
};
