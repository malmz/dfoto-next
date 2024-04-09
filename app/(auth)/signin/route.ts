import { signIn } from '@/lib/logto/actions';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  await signIn();
  return NextResponse.json({});
}
