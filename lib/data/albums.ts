'use server';

const apiUrl = 'https://dfoto.se';

export type ListResponse<T, F extends string = 'data'> = {
  total: number;
} & Record<F, T[]>;

export interface Album {
  _id: string;
  name: string;
  description?: string;
  published: boolean;
  shootDate: string;
  created_at: string;
}

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

export async function getAlbums(
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
}

export async function getAllAlbums() {
  const res = await fetch(`${apiUrl}/v1/gallery`);
  if (!res.ok) {
    throw new Error('Failed to fetch albums');
  }
  return (await res.json()) as Album[];
}

export async function getAlbumInfo(id: string) {
  const res = await fetch(`${apiUrl}/v1/gallery/${id}`);
  return (await res.json()) as Album;
}

export async function getAlbumImages(id: string) {
  const res = await fetch(`${apiUrl}/v1/image/${id}`);
  return (await res.json()) as Image[];
}
