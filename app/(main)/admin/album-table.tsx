'use client';

import { DataTable } from '@/components/data-table';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Album } from '@/lib/data/albums';
import { columns } from './columns';
import { useRouter } from 'next/navigation';

type Props = {
  data: Album[];
};
export function AlbumTable({ data }: Props) {
  const [filter, setFilter] = useState('');
  const router = useRouter();

  return (
    <div>
      <div className='flex items-center justify-between gap-4 py-4'>
        <Input
          type='search'
          placeholder='Sök'
          value={filter ?? ''}
          onChange={(event) => setFilter(event.target.value)}
          className='max-w-sm'
        ></Input>
        <Button variant='outline' size='sm'>
          Skapa nytt album
        </Button>
      </div>
      <DataTable
        filter={filter}
        onFilterChange={setFilter}
        columns={columns}
        data={data}
        sortBy='shootDate'
        sortDesc={true}
      ></DataTable>
    </div>
  );
}
