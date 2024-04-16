import { auth } from '@/lib/auth';
import { getImage } from '@/server/data';
import { getImageStream } from '@/server/storage';
import { notFound } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

/* export async function GET(
  request: NextRequest,
  options: { params: { id: string } },
) {
  return auth(async (req) => {
    const id = Number(options.params.id);
    if (Number.isNaN(id)) return NextResponse.error();
    const session = req.auth;
    const isAuthenticated = !!session?.user;
    const image = await getImage(id, isAuthenticated);
    if (image) return NextResponse.error();
    const stream = await getImageStream(image);
    return new NextResponse(stream);
  })(request, options);
} */

export async function GET(
  request: NextRequest,
  options: { params: { id: string } },
) {
  const id = Number(options.params.id);
  if (Number.isNaN(id)) return NextResponse.error();
  const image = await getImage(id, true);
  if (!image) return notFound();
  const stream = await getImageStream(image);
  return new NextResponse(stream, {
    headers: {
      'Content-Type': image.mimetype ?? '',
    },
  });
}
