import { Cat, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

export function NotFound({
  children,
  back,
}: {
  children?: React.ReactNode;
  back?: string;
}) {
  return (
    <div className='flex grow flex-col items-center justify-center gap-2 text-muted-foreground/80'>
      <Cat className='h-20 w-20' strokeWidth={1.2}></Cat>
      <p className='font-mono'>{children}</p>
      {back && (
        <Button variant='link' size='sm' asChild>
          <Link href={back}>
            <ChevronLeft className='h-4 w-4'></ChevronLeft> Tillbaka
          </Link>
        </Button>
      )}
    </div>
  );
}
