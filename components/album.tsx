import Image from 'next/image';
import Link from 'next/link';
import { formatRelative } from 'date-fns';
import { sv } from 'date-fns/locale';
import { Album } from '@/lib/data/albums';

export function Album({ album }: { album: Album }) {
  return (
    <Link key={album._id} href={`/album/${album._id}`} className='space-y-2'>
      <div className='overflow-hidden'>
        <Image
          src={`https://dfoto.se/v1/gallery/${album._id}/thumbnail-preview`}
          width='300'
          height='200'
          alt={album.name}
          className='aspect-[3/2] object-cover transition-transform hover:scale-105'
        ></Image>
      </div>
      <div className='flex flex-wrap justify-between px-2 text-sm'>
        <span className='font-medium leading-none'>{album.name}</span>
        <span className='text-xs text-muted-foreground'>
          {formatRelative(album.shootDate, new Date(), {
            locale: sv,
            weekStartsOn: 1,
          })}
        </span>
      </div>
    </Link>
  );
}
