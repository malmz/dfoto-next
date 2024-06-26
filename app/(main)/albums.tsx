import { Album } from '@/components/album';
import { getAlbums } from '@/server/data';

const limit = 28;

export async function Albums({ page = 0 }) {
  const albums = await getAlbums(page, limit);

  return (
    <>
      {albums.map((album) => (
        <Album key={album.id} album={album}></Album>
      ))}
    </>
  );
}
