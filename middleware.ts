import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

const protectedPaths = /\/admin(.*)/;

export default auth((req) => {
  const auth = req.auth;
  if (req.nextUrl.pathname.startsWith('/admin') && auth?.user == null) {
    return NextResponse.redirect(
      new URL(`/api/auth/signin?redirect=${req.nextUrl.pathname}`, req.url),
    );
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
