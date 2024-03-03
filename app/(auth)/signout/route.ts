import { signOut } from '@/lib/logto';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  await signOut();
}