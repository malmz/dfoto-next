import { AutoGrid } from '@/components/autogrid';
import { getAlbum } from '@/lib/data/albums';
import Image from 'next/image';
import Link from 'next/link';

export default async function Page({ params }: { params: { id: string } }) {
  const album = await getAlbum(Number(params.id));

  if (!album) {
    return <div>Album not found</div>;
  }

  return (
    <div className='mt-8'>
      <div className='mx-auto mb-8 w-full max-w-6xl px-8'>
        <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl'>
          {album.name}
        </h1>
        <p>{album.description}</p>
      </div>
      <AutoGrid className='mt-4 px-2'>
        {album.images.map((image) => (
          <Link
            href={`/album/${params.id}/${image.id}`}
            key={image.id}
            className='overflow-hidden rounded-lg'
          >
            <Image
              src={`/api/image/${image.id}`}
              width='300'
              height='200'
              alt=''
              className='aspect-[3/2] object-cover transition-transform hover:scale-105'
            ></Image>
          </Link>
        ))}
      </AutoGrid>
    </div>
  );
}
