'use server';

import { db } from '@/server/db';
import { CreateAlbum, album, image } from '@/server/schema';
import { InferInsertModel, and, asc, eq, isNull, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { auth } from './auth';
import { z } from 'zod';
import { parseForm } from './utils';
import { commitUpload, stageUpload } from '@/server/storage';
import sharp from 'sharp';
import exif from 'exif-reader';

export async function createAlbum(data: CreateAlbum) {
  const session = await auth();
  //await ensureRole(['write:album']);
  await db.insert(album).values(data);
  revalidatePath('/');
}

export async function setThumbnail(id: number, thumbnailId: number) {
  //await ensureRole(['write:album']);
  await db
    .update(album)
    .set({ thumbnail_id: thumbnailId })
    .where(eq(album.id, id));
}

export async function setPubishedStatus(id: number, published: boolean) {
  //await ensureRole(['publish:album']);

  if (published) {
    const [{ total }] = await db
      .select({ total: sql<number>`cast(count(${image.id}) as int)` })
      .from(image)
      .where(eq(image.album_id, id));

    if (total === 0) {
      throw new Error('Cannot publish an album without images');
    }

    // Ensure that the album has a thumbnail
    const [{ id: firstImageId }] = await db
      .select({ id: image.id })
      .from(image)
      .where(eq(image.album_id, id))
      .orderBy(asc(image.taken_at))
      .limit(1);

    await db
      .update(album)
      .set({ thumbnail_id: firstImageId })
      .where(and(eq(album.id, id), isNull(album.thumbnail_id)));
  }

  await db.update(album).set({ published }).where(eq(album.id, id));
  revalidatePath('/');
}

const imageTypes = ['image/jpeg', 'image/png'];

const uploadSchema = z.object({
  album: z.coerce.number(),
  file: z.array(z.instanceof(File).refine((f) => imageTypes.includes(f.type))),
});

export async function upload(formData: FormData) {
  const session = await auth();

  if (session == null || session.user == null)
    throw new Error('Not authenticated');

  const user = session.user;

  const data = parseForm(formData, uploadSchema);

  const stagePaths = await Promise.all(data.file.map(stageUpload));

  const insertdata = await Promise.all(
    stagePaths.map(async (stagePath, i) => {
      const file = data.file[i];
      const metadata = await sharp(stagePath).metadata();
      const exif_data = metadata.exif ? exif(metadata.exif) : null;
      const taken_at =
        exif_data?.Image?.DateTime ?? new Date(file.lastModified) ?? new Date();

      return {
        album_id: data.album,
        mimetype: file.type,
        taken_by: user.id,
        taken_by_name: user.name ?? user.email ?? null,
        taken_at,
        exif_data,
      } satisfies InferInsertModel<typeof image>;
    }),
  );

  db.transaction(async (db) => {
    const inserted = await db.insert(image).values(insertdata).returning({
      id: image.id,
      mimetype: image.mimetype,
      album_id: image.album_id,
    });

    await Promise.all(
      inserted.map(async (image, i) => {
        commitUpload(stagePaths[i], image);
      }),
    );
  });

  revalidatePath(`/admin/${data.album}`);
}
