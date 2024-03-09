import { Album } from '@/components/album';
import { AutoGrid } from '@/components/autogrid';
import { Paginator } from '@/components/paginator';
import { getAlbums } from '@/lib/data/albums';

const limit = 28;

export default async function Home() {
  const { albums, total } = await getAlbums(0, limit);
  const totalPages = Math.ceil(total / limit);

  return (
    <>
      <AutoGrid className='mt-4 px-2'>
        {albums.map((album) => (
          <Album key={album.id} album={album}></Album>
        ))}
      </AutoGrid>
      <Paginator page={1} totalPages={totalPages} className='mt-3' />
    </>
  );
}
