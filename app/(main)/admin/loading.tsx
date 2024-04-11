import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className='flex grow items-center justify-center'>
      <Loader2 className='h-32 w-32 animate-spin text-muted-foreground/80'></Loader2>
    </div>
  );
}
