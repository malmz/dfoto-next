import { AutoGrid } from '@/components/autogrid';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className='mt-8'>
      <div className='mx-auto mb-8 w-full max-w-6xl space-y-2 px-8'>
        <Skeleton className='h-8 w-[200px] lg:h-12'></Skeleton>
        <Skeleton className='h-3 w-[100px]'></Skeleton>
      </div>
      <AutoGrid className='mt-4 px-2'>
        {Array.from({ length: 28 }).map((_, i) => (
          <Skeleton
            key={i}
            className='h-[200px] w-[300px] rounded-lg'
          ></Skeleton>
        ))}
      </AutoGrid>
    </div>
  );
}
