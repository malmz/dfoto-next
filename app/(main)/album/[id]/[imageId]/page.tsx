import Debug from '@/components/debug';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getImage } from '@/lib/data/albums';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';
import Image from 'next/image';

export default async function Page({
  params,
}: {
  params: { id: string; imageId: string };
}) {
  const imageId = Number(params.imageId);
  const image = await getImage(imageId);

  return (
    <div className='mx-auto flex w-full max-w-screen-xl grow gap-4 p-8'>
      <div className='basis-2/3'>
        <div className='relative h-full'>
          <Image
            src={`/api/image/${imageId}`}
            fill
            alt='fotografi'
            className='object-contain object-top'
          />
        </div>
      </div>
      <Card className='basis-1/3'>
        <CardHeader>
          <CardTitle>Info</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-2 gap-2 text-sm'>
            <span>Fotograf</span>
            <span>{image.taken_by_name}</span>
            <span>Tagen vid</span>
            <span>{format(image.taken_at, 'PPP, pp', { locale: sv })}</span>
            <span>Format</span>
            <span>{image.mimetype}</span>
            <span>Märke</span>
            <span>{image.exif_data?.Image?.Make}</span>
            <span>Model</span>
            <span>{image.exif_data?.Image?.Model}</span>
            <span>Lins</span>
            <span>{image.exif_data?.Photo?.LensModel}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
