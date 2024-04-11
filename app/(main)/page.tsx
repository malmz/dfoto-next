import { AutoGrid } from '@/components/autogrid';
import { Paginator } from '@/components/paginator';
import { getPagesCount } from '@/lib/data/albums';
import { Albums } from './albums';

export const dynamic = 'force-dynamic';

const limit = 28;

export default async function Home() {
  const totalPages = await getPagesCount(limit);

  return (
    <>
      <div className='mt-4 grow px-2'>
        <AutoGrid>
          <Albums></Albums>
        </AutoGrid>
      </div>
      <Paginator page={1} totalPages={totalPages} className='mt-3' />
    </>
  );
}
