import { signIn } from '@/lib/logto/actions';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  await signIn();
}
