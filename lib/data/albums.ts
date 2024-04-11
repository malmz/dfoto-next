'use server';

import { revalidatePath } from 'next/cache';
import { db } from '../db';
import { CreateAlbum, album, image } from '../schema';
import { and, asc, desc, eq, isNull, sql } from 'drizzle-orm';
import { cache } from 'react';
import { checkRole, ensureRole } from '../logto/actions';

export const getAlbums = cache(async (page: number, limit: number) => {
  const albums = await db.query.album.findMany({
    orderBy: [desc(album.start_at)],
    limit: limit,
    offset: page * limit,
    where: eq(album.published, true),
  });
  return albums;
});

export const getPagesCount = cache(async (limit: number) => {
  const [{ total }] = await db
    .select({ total: sql<number>`cast(count(${album.id}) as int)` })
    .from(album);
  return Math.ceil(total / limit);
});

export async function getAllAlbums() {
  await ensureRole(['read:album']);
  return await db.query.album.findMany({
    orderBy: [desc(album.start_at)],
  });
}

export async function getAlbum(id: number) {
  const { passed } = await checkRole(['read:album']);
  const isPublished = !passed ? eq(album.published, true) : undefined;
  return await db.query.album.findFirst({
    where: and(eq(album.id, id), isPublished),
    with: {
      images: {
        orderBy: [asc(image.taken_at)],
      },
    },
  });
}

export async function createAlbum(data: CreateAlbum) {
  await ensureRole(['write:album']);
  await db.insert(album).values(data);
  revalidatePath('/');
}

export async function setThumbnail(id: number, thumbnailId: number) {
  await ensureRole(['write:album']);
  await db
    .update(album)
    .set({ thumbnail_id: thumbnailId })
    .where(eq(album.id, id));
}

export async function setPubishedStatus(id: number, published: boolean) {
  await ensureRole(['publish:album']);

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

export const getImage = cache(async (id: number) => {
  const { passed } = await checkRole(['read:album']);
  const isPublished = !passed ? eq(album.published, true) : undefined;
  const [{ image: data }] = await db
    .select({
      image,
    })
    .from(image)
    .innerJoin(album, eq(album.id, image.album_id))
    .where(and(eq(image.id, id), isPublished))
    .limit(1);

  return data;
});
