import { getAuth } from '@/lib/logto/actions';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { isAuthenticated, scopes, userInfo } = await getAuth({
    fetchUserInfo: true,
  });
  return NextResponse.json({ isAuthenticated, scopes, userInfo });
}
