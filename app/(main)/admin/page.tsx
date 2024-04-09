import { ensureRole, getAuth } from '@/lib/logto/actions';
import { AlbumTable } from './album-table';
import { getAllAlbums } from '@/lib/data/albums';

export default async function Admin() {
  const context = await getAuth({
    getAccessToken: true,
    resource: 'https://dfoto.se',
  });

  ensureRole(context, 'read:album');

  const albums = await getAllAlbums();
  return (
    <div className='container mt-8 flex flex-col gap-4'>
      <h1 className='text-3xl font-extrabold tracking-tight'>Album</h1>
      <AlbumTable data={albums}></AlbumTable>
    </div>
  );
}
