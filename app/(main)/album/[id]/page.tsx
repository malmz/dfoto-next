import { AutoGrid } from '@/components/autogrid';
import { getAlbumImages, getAlbumInfo } from '@/lib/data/albums';
import Image from 'next/image';

export default async function Page({ params }: { params: { id: string } }) {
  const info = await getAlbumInfo(params.id);
  const images = await getAlbumImages(params.id);

  return (
    <AutoGrid className='mt-4 px-2'>
      {images.map((image) => (
        <div key={image._id} className='overflow-hidden'>
          <Image
            src={`https://dfoto.se/v1/image/${image._id}/thumbnail`}
            width='300'
            height='200'
            alt={image.filename}
            className='aspect-[3/2] object-cover transition-transform hover:scale-105'
          ></Image>
        </div>
      ))}
    </AutoGrid>
  );
}
