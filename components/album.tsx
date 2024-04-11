import Image from 'next/image';
import Link from 'next/link';
import { formatRelative } from 'date-fns';
import { sv } from 'date-fns/locale';

type Props = {
  album: {
    id: number;
    name: string;
    created_at: Date;
    legacy_id: string | null;
    thumbnail_id: number | null;
  };
};

export function Album({ album }: Props) {
  return (
    <Link key={album.id} href={`/album/${album.id}`} className='space-y-2'>
      <div className='overflow-hidden rounded-lg'>
        <Image
          src={`/api/image/${album.thumbnail_id}`}
          width='300'
          height='200'
          placeholder='empty'
          alt={album.name}
          className='aspect-[3/2] h-[200px] w-[300px] object-cover transition-transform hover:scale-105'
        ></Image>
      </div>
      <div className='flex flex-wrap justify-between px-2 text-sm'>
        <span className='font-medium leading-none'>{album.name}</span>
        <span className='text-xs text-muted-foreground'>
          {formatRelative(album.created_at, new Date(), {
            locale: sv,
            weekStartsOn: 1,
          })}
        </span>
      </div>
    </Link>
  );
}
