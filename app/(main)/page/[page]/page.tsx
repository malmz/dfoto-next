import { Album } from '@/components/album';
import { AutoGrid } from '@/components/autogrid';
import { Paginator } from '@/components/paginator';
import { getAlbums } from '@/lib/data/albums';

const limit = 28;

export default async function Page({ params }: { params: { page: string } }) {
  const page = Number(params.page);
  const { albums, total } = await getAlbums(page - 1, limit, 'published');
  const totalPages = Math.ceil(total / limit);

  return (
    <>
      <AutoGrid className='mt-4 px-2'>
        {albums.map((album) => (
          <Album key={album._id} album={album}></Album>
        ))}
      </AutoGrid>
      <Paginator page={page} totalPages={totalPages} className='mt-3' />
    </>
  );
}
