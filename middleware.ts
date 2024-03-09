import { getAuth } from '@/lib/logto/middleware';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { isAuthenticated, scopes } = await getAuth(request, {
    getAccessToken: true,
    resource: 'https://dfoto.se',
  });
  if (isAuthenticated && scopes?.includes('read:album')) {
    return NextResponse.next();
  }

  const returnTo = request.nextUrl.pathname;
  return NextResponse.redirect(
    new URL(`/signin?returnTo=${returnTo}`, request.url),
  );
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
