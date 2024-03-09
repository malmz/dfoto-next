import { createReadStream } from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import { Readable } from 'stream';

function createReadWebStream(...args: Parameters<typeof createReadStream>) {
  return Readable.toWeb(createReadStream(...args)) as ReadableStream;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const path = `./uploads/${params.id}`;
  const stream = createReadWebStream(path);

  return new NextResponse(stream);
}
