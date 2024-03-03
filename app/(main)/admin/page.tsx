import { AlbumTable } from './album-table';
import { getAllAlbums } from '@/lib/data/albums';

export default async function Admin() {
  const albums = await getAllAlbums();
  return (
    <div className='container mt-8 flex flex-col gap-4'>
      <h1 className='text-3xl font-extrabold tracking-tight'>Album</h1>
      <AlbumTable data={albums}></AlbumTable>
    </div>
  );
}
