import { Album } from '@/components/album';
import { AutoGrid } from '@/components/autogrid';
import { Paginator } from '@/components/paginator';
import { getAlbums, getPagesCount } from '@/lib/data/albums';

const limit = 28;

/* export async function generateStaticParams() {
  const total = await getPagesCount(limit);
  return Array.from({ length: total }, (_, i) => ({ page: String(i + 1) }));
}
 */
export default async function Page({ params }: { params: { page: string } }) {
  const page = Number(params.page);
  const { albums, total } = await getAlbums(page - 1, limit);
  const totalPages = Math.ceil(total / limit);

  return (
    <>
      <AutoGrid className='mt-4 px-2'>
        {albums.map((album) => (
          <Album key={album.id} album={album}></Album>
        ))}
      </AutoGrid>
      <Paginator page={page} totalPages={totalPages} className='mt-3' />
    </>
  );
}
