'use server';

import { revalidatePath } from 'next/cache';
import { db } from '../db';
import { CreateAlbum, album, image } from '../schema';
import { asc, desc, eq, sql } from 'drizzle-orm';
import { cache } from 'react';

const apiUrl = 'https://dfoto.se';

/* export type ListResponse<T, F extends string = 'data'> = {
  total: number;
} & Record<F, T[]>; */

/* export interface Album {
  id: string;
  name: string;
  description?: string;
  published: boolean;
  shootDate: string;
  created_at: string;
} */

export interface Image {
  _id: string;
  isGalleryThumbnail: true;
  tags: [];
  filename: string;
  author?: string;
  authorCid: string;
  galleryId: string;
  thumbnail: string;
  preview: string;
  fullSize: string;
  shotAt: string;
  exifData: unknown;
}

export const getAlbums = cache(async (page: number, limit: number) => {
  const albums = await db.query.album.findMany({
    orderBy: [desc(album.start_at)],
    limit: limit,
    offset: page * limit,
    where: eq(album.published, true),
  });

  const [{ total }] = await db
    .select({ total: sql<number>`cast(count(${album.id}) as int)` })
    .from(album);
  return { albums, total };
});

export const getPagesCount = cache(async (limit: number) => {
  const [{ total }] = await db
    .select({ total: sql<number>`cast(count(${album.id}) as int)` })
    .from(album);
  return Math.ceil(total / limit);
});

export async function getAllAlbums() {
  return await db.query.album.findMany({
    orderBy: [desc(album.start_at)],
  });
}

export async function getAlbum(id: number) {
  return await db.query.album.findFirst({
    where: eq(album.id, id),
    with: {
      images: {
        orderBy: [asc(image.taken_at)],
      },
    },
  });
}

export async function getAlbumInfo(id: number) {
  return await db.query.album.findFirst({
    where: eq(album.id, id),
  });
}

export async function createAlbum(data: CreateAlbum) {
  await db.insert(album).values(data);
  revalidatePath('/');
}

/* export async function getAlbums(
  page: number,
  limit: number,
  status: 'published' | 'unpublished' | 'all',
): Promise<ListResponse<Album, 'albums'>> {
  const res = await fetch(`${apiUrl}/v1/gallery`);
  const albums = (await res.json()) as Album[];
  const albumsLimited = albums.slice(page * limit, (page + 1) * limit);

  const resCount = await fetch(`${apiUrl}/v1/gallery/count`);
  const { count } = (await resCount.json()) as { count: number };

  return {
    total: count,
    albums: albumsLimited,
  };
} */

/* export async function getAllAlbums() {
  const res = await fetch(`${apiUrl}/v1/gallery`);
  if (!res.ok) {
    throw new Error('Failed to fetch albums');
  }
  return (await res.json()) as Album[];
} */

/* export async function getAlbumInfo(id: string) {
  const res = await fetch(`${apiUrl}/v1/gallery/${id}`);
  return await res.json();
} */

export async function getAlbumImages(id: string) {
  const res = await fetch(`${apiUrl}/v1/image/${id}`);
  return (await res.json()) as Image[];
}

export async function setPubishedStatus(id: number, published: boolean) {
  console.log('setPubishedStatus', id, published);

  // TODO: Not ready yet
  /* const res = await fetch(`${apiUrl}/v1/gallery/${id}/${published ? 'publish' : 'unpublish'}`, {
    method: 'POST',
  });
  return (await res.json()) as Album; */

  revalidatePath('/(main)');
  revalidatePath('/(main)/page/[page]', 'page');
}
