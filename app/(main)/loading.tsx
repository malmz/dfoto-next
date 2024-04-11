import { AutoGrid } from '@/components/autogrid';
import { Paginator } from '@/components/paginator';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <>
      <AutoGrid className='mt-4 grow px-2'>
        {Array.from({ length: 28 }).map((_, i) => (
          <div key={i} className='space-y-2'>
            <Skeleton className='h-[200px] w-[300px] rounded-lg'></Skeleton>
            <Skeleton className='h-4 w-[150px]'></Skeleton>
          </div>
        ))}
      </AutoGrid>
      <Paginator page={1} totalPages={1} className='mt-3' />
    </>
  );
}
