import { db } from '@/lib/db';
import { image } from '@/lib/schema';
import { LocalStorage } from '@/lib/storage/local';
import { eq } from 'drizzle-orm';
import { createReadStream } from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import { Readable } from 'stream';

/* function createReadWebStream(...args: Parameters<typeof createReadStream>) {
  // Släng dig i väggen node streams
  // toWeb returns a node:stream/web ReadableStream
  // which is not the same as web standard ReadableStream
  // but it's close enough and works here so i dont care
  return Readable.toWeb(createReadStream(...args)) as ReadableStream;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const path = `./uploads/${params.id}`;
  const stream = createReadWebStream(path);
  return new NextResponse(stream);
} */

/* export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = Number(params.id);
  if (Number.isNaN(id)) return NextResponse.error();
  const [{ legacy_id }] = await db
    .select({ legacy_id: image.legacy_id })
    .from(image)
    .where(eq(image.id, id));

  const res = await fetch(`https://dfoto.se/v1/image/${legacy_id}/fullSize`, {
    cache: 'no-store',
  });
  return new NextResponse(res.body);
} */

const storage = new LocalStorage(true);

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = Number(params.id);
  if (Number.isNaN(id)) return NextResponse.error();
  const stream = await storage.getImage(id);
  return new NextResponse(stream);
}
