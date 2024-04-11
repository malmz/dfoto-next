import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  <section className='mx-auto mt-8 max-w-prose space-x-2'>
    <Skeleton className='h-8 w-[300px]'></Skeleton>
    <Skeleton className='h-3 w-[300px]'></Skeleton>
  </section>;
}
