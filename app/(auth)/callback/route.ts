import { handleCallback } from '@/lib/logto/actions';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  await handleCallback(searchParams);

  redirect('/');
}
