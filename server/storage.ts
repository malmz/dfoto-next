import 'server-only';
import { createReadStream, createWriteStream } from 'fs';
import { mkdir, rename } from 'fs/promises';
import { extension } from 'mime-types';
import { join } from 'path';
import { Readable, Writable } from 'stream';

const storagePath = process.env.STORAGE_PATH ?? './storage/images';
const uploadsPath = process.env.UPLOADS_PATH ?? './storage/uploads';

export async function getImageStream(image: {
  id: number;
  album_id: number;
  mimetype?: string | null;
}): Promise<ReadableStream> {
  const ext = image.mimetype ? extension(image.mimetype) || '' : '';
  const filename = `${image.id}.${ext}`;
  const path = join(storagePath, image.album_id.toString(), filename);

  // Släng dig i väggen node streams
  // toWeb returns a node:stream/web ReadableStream
  // which is not the same as web standard ReadableStream
  // but it's close enough and works here so i dont care
  return Readable.toWeb(createReadStream(path)) as ReadableStream;
}

export async function stageUpload(file: File) {
  const id = crypto.randomUUID();
  const path = join(uploadsPath, id);
  await mkdir(uploadsPath, { recursive: true });
  const writeStream = Writable.toWeb(createWriteStream(path));
  await file.stream().pipeTo(writeStream);
  return path;
}

export async function commitUpload(
  stagePath: string,
  image: { id: number; album_id: number; mimetype?: string | null },
) {
  const ext = image.mimetype ? extension(image.mimetype) || '' : '';
  const filename = `${image.id}.${ext}`;
  const dest = join(storagePath, image.album_id.toString(), filename);
  await mkdir(join(storagePath, image.album_id.toString()), {
    recursive: true,
  });
  await rename(stagePath, dest);
}
