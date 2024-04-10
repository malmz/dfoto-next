import { eq } from 'drizzle-orm';
import { db } from '../db';
import { image } from '../schema';
import { Readable, Writable } from 'stream';
import { createReadStream, createWriteStream } from 'fs';
import { stat, mkdir, copyFile, rename } from 'fs/promises';
import { join, extname } from 'path';
import { extension } from 'mime-types';
import { ImageStorage } from '.';
import { LegacyStorage } from './legacy';

const storagePath = process.env.STORAGE_PATH ?? './image-store';
const uploadsPath = process.env.UPLOADS_PATH ?? './uploads';

function createReadWebStream(...args: Parameters<typeof createReadStream>) {
  // Släng dig i väggen node streams
  // toWeb returns a node:stream/web ReadableStream
  // which is not the same as web standard ReadableStream
  // but it's close enough and works here so i dont care
  return Readable.toWeb(createReadStream(...args)) as ReadableStream;
}

function createWriteWebStream(...args: Parameters<typeof createWriteStream>) {
  return Writable.toWeb(createWriteStream(...args));
}

async function exists(path: string) {
  try {
    await stat(path);
    return true;
  } catch (error) {
    return false;
  }
}

export class LocalStorage implements ImageStorage {
  legacy = new LegacyStorage();

  constructor(private fallback = true) {}

  async getImage(id: number) {
    const data = await db.query.image.findFirst({ where: eq(image.id, id) });
    if (!data) return null;
    const filename = `${data.id}.${extension(data.mimetype ?? '') ?? ''}`;
    const path = join(storagePath, data.album_id.toString(), filename);
    if (this.fallback && !(await exists(path))) {
      console.log('File not found, fetching from legacy');
      try {
        const legacyImage = await this.legacy.getImage(data.id);
        await mkdir(join(storagePath, data.album_id.toString()), {
          recursive: true,
        });
        const writeStream = createWriteWebStream(path);
        await legacyImage?.pipeTo(writeStream);
        console.log('File written to disk', path);
      } catch (error) {
        console.error('Failed to fetch from legacy', error);
      }
    }
    return createReadWebStream(path);
  }

  async stageUpload(file: File): Promise<string> {
    const id = crypto.randomUUID();
    const filename = `${id}.${extension(file.type) ?? ''}`;
    const path = join(uploadsPath, filename);
    await mkdir(uploadsPath, { recursive: true });
    const writeStream = createWriteWebStream(path);
    await file.stream().pipeTo(writeStream);
    return path;
  }

  async commitUpload(
    tempfile: string,
    albumId: number,
    imageId: number,
    mimetype?: string | null,
  ) {
    const ext = mimetype
      ? extension(mimetype) || extname(tempfile)
      : extname(tempfile);
    const newFilename = `${imageId}.${ext}`;
    const dest = join(storagePath, albumId.toString(), newFilename);
    await mkdir(join(storagePath, albumId.toString()), { recursive: true });
    await rename(tempfile, dest);
  }
}
