'use client';

import { DataTable } from '@/components/data-table';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { columns } from './columns';
import type { Album } from '@/server/schema';

import { AlbumFormDialog } from './album-form-dialog';

type Props = {
  data: Album[];
};
export function AlbumTable({ data }: Props) {
  const [filter, setFilter] = useState('');

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
        <AlbumFormDialog></AlbumFormDialog>
      </div>
      <DataTable
        filter={filter}
        onFilterChange={setFilter}
        columns={columns}
        data={data}
        sortBy='start_at'
        sortDesc={true}
      ></DataTable>
    </div>
  );
}
