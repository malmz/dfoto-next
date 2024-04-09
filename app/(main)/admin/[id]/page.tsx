import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getAlbum } from '@/lib/data/albums';
import { PublishButton } from './publish-button';
import { Textarea } from '@/components/ui/textarea';
import { DateInput } from './date-input';
import { AutoGrid } from '@/components/autogrid';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { UploadButtom } from './upload-buttom';
import { Separator } from '@/components/ui/separator';
import { ImageTable } from './image-table';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';

export default async function Admin({ params }: { params: { id: string } }) {
  const album = await getAlbum(Number(params.id));
  if (!album) {
    throw new Error('Album not found');
  }
  return (
    <>
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
            <Textarea
              name='description'
              id='description'
              defaultValue={album.description ?? ''}
            ></Textarea>
          </div>
          <div className='space-y-2'>
            <Label htmlFor='date'>Datum</Label>
            <DateInput
              name='date'
              id='date'
              defaultValue={album.start_at}
            ></DateInput>
          </div>
          <div className='flex justify-between'>
            <Button type='submit'>Spara</Button>
            <PublishButton album={album}></PublishButton>
          </div>
        </form>
      </div>
      <Separator className='mx-auto mt-12 max-w-prose'></Separator>
      <div className='container mt-8 flex flex-col gap-4'>
        <div className='flex justify-between gap-4'>
          <h2 className='text-3xl font-extrabold tracking-tight'>Bilder</h2>
          <UploadButtom>Lägg till</UploadButtom>
        </div>
        <ImageTable data={album.images}></ImageTable>
      </div>
    </>
  );
}
