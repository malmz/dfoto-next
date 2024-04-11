import { AutoGrid } from '@/components/autogrid';
import { Paginator } from '@/components/paginator';
import { getPagesCount } from '@/lib/data/albums';
import { Albums } from '../../albums';

const limit = 28;

export default async function Page({ params }: { params: { page: string } }) {
  const page = Number(params.page);
  const totalPages = await getPagesCount(limit);

  return (
    <>
      <AutoGrid className='mt-4 px-2'>
        <Albums page={page}></Albums>
      </AutoGrid>
      <Paginator page={page} totalPages={totalPages} className='mt-3' />
    </>
  );
}
