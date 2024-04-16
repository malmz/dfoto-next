import { auth } from '@/lib/auth';
import { db } from './db';
import { album, image } from './schema';
import { and, asc, desc, eq, isNull, sql } from 'drizzle-orm';
import { cache } from 'react';

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
  //await ensureRole(['read:album']);

  return await db.query.album.findMany({
    orderBy: [desc(album.start_at)],
  });
}

export async function getAlbum(id: number, unpublished = false) {
  const publishFilter = unpublished ? undefined : eq(album.published, true);
  return await db.query.album.findFirst({
    where: and(eq(album.id, id), publishFilter),
    with: {
      images: {
        orderBy: [asc(image.taken_at)],
      },
    },
  });
}

export const getImage = async (id: number, unpublished = false) => {
  const publishFilter = unpublished ? undefined : eq(album.published, true);
  const res = await db
    .select({
      image,
    })
    .from(image)
    .innerJoin(album, eq(album.id, image.album_id))
    .where(and(eq(image.id, id), publishFilter))
    .limit(1);

  return res.length && res[0].image;
};
