import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getAlbumInfo } from '@/lib/data/albums';
import { format } from 'date-fns';
import { PublishButton } from './publish-button';

export default async function Admin({ params }: { params: { id: string } }) {
  const album = await getAlbumInfo(params.id);
  return (
    <div className='container mt-8 flex max-w-prose flex-col gap-4'>
      <h1 className='text-3xl font-extrabold tracking-tight'>{album.name}</h1>
      <form
        id='editForm'
        action={async () => {
          'use server';
          console.log('save');
        }}
        className='space-y-4'
      >
        <div className='space-y-2'>
          <Label htmlFor='name'>Namn</Label>
          <Input
            name='name'
            id='name'
            type='text'
            defaultValue={album.name}
          ></Input>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='description'>Beskrivning</Label>
          <Input
            name='description'
            id='description'
            type='text'
            defaultValue={album.description}
          ></Input>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='date'>Status</Label>
          <Input
            name='date'
            id='date'
            type='date'
            defaultValue={format(album.shootDate, 'yyyy-MM-dd')}
          ></Input>
        </div>
        <div className='flex justify-between'>
          <Button type='submit'>Spara</Button>
          <PublishButton album={album}></PublishButton>
        </div>
      </form>
    </div>
  );
}
