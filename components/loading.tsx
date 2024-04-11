import { Loader2 } from 'lucide-react';

export function Loading() {
  return (
    <div className='flex grow flex-col items-center justify-center gap-2 text-muted-foreground/80'>
      <Loader2 className='h-20 w-20 animate-spin' />
    </div>
  );
}
