'use server';

import { createWriteStream } from 'fs';
import { Writable } from 'stream';
import { db } from '../db';
import { album, image } from '../schema';
import { ensureRole, getAuth } from '../logto/actions';
import { z } from 'zod';
import { parseForm } from '../utils';
import { InferInsertModel } from 'drizzle-orm';
import { lookup } from 'mime-types';
import sharp from 'sharp';
import exif from 'exif-reader';
import { LocalStorage } from '../storage/local';
import { revalidatePath } from 'next/cache';

function createWriteWebStream(...args: Parameters<typeof createWriteStream>) {
  return Writable.toWeb(createWriteStream(...args));
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const uploadSchema = z.object({
  album: z.coerce.number(),
  file: z.array(z.instanceof(File)),
});

const storage = new LocalStorage();

export async function upload(formData: FormData) {
  const { isAuthenticated, claims } = await ensureRole(['write:image']);

  if (!isAuthenticated) {
    throw new Error('Not authenticated');
  }

  const data = parseForm(formData, uploadSchema);

  const tempFiles = await Promise.all(
    data.file.map(async (file) => await storage.stageUpload(file)),
  );

  const insertdata = await Promise.all(
    tempFiles.map(async (tempfile, i) => {
      const file = data.file[i];
      const metadata = await sharp(tempfile).metadata();
      const exif_data = metadata.exif ? exif(metadata.exif) : null;
      const taken_at_string = exif_data?.Image?.DateTimeOriginal;
      const taken_at = taken_at_string
        ? new Date(taken_at_string)
        : new Date(file.lastModified);

      return {
        album_id: data.album,
        mimetype: lookup(tempfile) || null,
        taken_by: claims?.sub,
        taken_by_name: claims?.name ?? claims?.username ?? undefined,
        taken_at,
        exif_data,
      } satisfies InferInsertModel<typeof image>;
    }),
  );

  const inserted = await db.insert(image).values(insertdata).returning({
    id: image.id,
    mimetype: image.mimetype,
    album_id: image.album_id,
  });

  await Promise.all(
    inserted.map(async ({ id, album_id, mimetype }, i) => {
      storage.commitUpload(tempFiles[i], album_id, id, mimetype);
    }),
  );

  revalidatePath('/');
}
